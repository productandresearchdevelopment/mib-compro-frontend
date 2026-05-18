"use client";

import { useEffect, useRef, useCallback } from "react";
import { useNotificationStore } from "@/store/notificationStore";
import { useCookies } from "@/hooks/useCookies";
import { useAuthUser } from "@/hooks/useAuthUser";
import { IRealtimeNotification } from "@/types/notification";

const BASE_DELAY_MS = 1000;
const MAX_DELAY_MS = 30000;
const BACKOFF_FACTOR = 2;

function computeBackoff(attempt: number): number {
  const delay = BASE_DELAY_MS * Math.pow(BACKOFF_FACTOR, attempt);
  return Math.min(delay, MAX_DELAY_MS);
}

export function useRealtimeNotification(): void {
  const wsRef = useRef<WebSocket | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const attemptRef = useRef(0);
  const activeRef = useRef(false);

  const { get } = useCookies();
  // const queryClient = useQueryClient();
  const { isPrivileged } = useAuthUser();

  const pushNotification = useNotificationStore((s) => s.pushNotification);
  const pushNotificationSilent = useNotificationStore(
    (s) => s.pushNotificationSilent,
  );
  const setConnected = useNotificationStore((s) => s.setConnected);

  const isPrivilegedRef = useRef(isPrivileged);
  useEffect(() => {
    isPrivilegedRef.current = isPrivileged;
  }, [isPrivileged]);

  const connect = useCallback(() => {
    if (!activeRef.current) return;

    const token = get("token");
    if (!token) return;

    const wsBaseUrl = process.env.NEXT_PUBLIC_WS_URL;
    if (!wsBaseUrl) {
      console.warn("[WS] NEXT_PUBLIC_WS_URL is not defined");
      return;
    }

    const url = `${wsBaseUrl}?token=${token}`;

    try {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        if (!activeRef.current) {
          ws.close();
          return;
        }
        console.log("[WS] Connected ✓");
        attemptRef.current = 0;
        setConnected(true);
      };

      ws.onmessage = (event: MessageEvent<string>) => {
        if (!activeRef.current) return;
        try {
          const payload = JSON.parse(event.data) as IRealtimeNotification;

          if (!payload?.id || !payload?.title) {
            console.warn("[WS] Malformed notification payload", payload);
            return;
          }

          if (isPrivilegedRef.current) {
            pushNotificationSilent(payload);
          } else {
            pushNotification(payload);
          }

          // queryClient.invalidateQueries({
          //   queryKey: notificationKeys.all,
          // });
        } catch {
          console.error("[WS] Failed to parse message:", event.data);
        }
      };

      ws.onerror = () => {
        // onerror selalu diikuti onclose, handle reconnect di sana
      };

      ws.onclose = (ev) => {
        if (!activeRef.current) return;

        setConnected(false);
        const delay = computeBackoff(attemptRef.current);
        console.log(
          `[WS] Closed (code=${ev.code}). Reconnecting in ${delay}ms (attempt ${attemptRef.current + 1})`,
        );
        attemptRef.current += 1;

        timerRef.current = setTimeout(() => {
          if (activeRef.current) connect();
        }, delay);
      };
    } catch (err) {
      console.error("[WS] Failed to create WebSocket:", err);
    }
  }, [
    get,
    pushNotification,
    pushNotificationSilent,
    setConnected,
    // queryClient,
  ]);

  useEffect(() => {
    activeRef.current = true;
    connect();

    return () => {
      activeRef.current = false;
      setConnected(false);

      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      if (wsRef.current) {
        wsRef.current.onclose = null;
        wsRef.current.close();
        wsRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
