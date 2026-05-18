import { buildQueryParams, getToken, handleFetchError } from "@/utils/common";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  INotificationListResponse,
  IUnreadSummary,
} from "@/types/notification";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API base URL is not defined");
}

const fetchUserNotifications = async (params: {
  limit?: number;
  offset?: number;
}): Promise<INotificationListResponse> => {
  const token = getToken();
  const qs = buildQueryParams(params);

  const response = await fetch(`${API_BASE_URL}/notifications?${qs}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    await handleFetchError(response);
  }

  const json = await response.json();
  return json.data as INotificationListResponse;
};

const fetchUnreadSummary = async (): Promise<IUnreadSummary> => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/notifications/unread-summary`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    await handleFetchError(response);
  }

  const json = await response.json();
  return json.data as IUnreadSummary;
};

const markAsRead = async (id: string, userId: string): Promise<void> => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/notifications/${id}/read`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ user_id: userId }),
  });

  if (!response.ok) {
    await handleFetchError(response);
  }
};

// ── markAllAsRead ─────────────────────────────────────────────────────────────

const markAllAsRead = async (userId: string): Promise<void> => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/notifications/read-all`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ user_id: userId }),
  });

  if (!response.ok) {
    await handleFetchError(response);
  }
};

export const notificationKeys = {
  all: ["notifications"] as const,
  list: (params: { limit?: number; offset?: number }) =>
    [...notificationKeys.all, "list", params] as const,
  unreadSummary: () => [...notificationKeys.all, "unread-summary"] as const,
};

export const useUserNotifications = (
  params: {
    limit?: number;
    offset?: number;
  } = {},
) => {
  return useQuery({
    queryKey: notificationKeys.list(params),
    queryFn: () => fetchUserNotifications(params),
    staleTime: 1000 * 30,
    enabled: !!getToken(),
    refetchInterval: 1000 * 60,
  });
};

export const useUnreadSummary = () => {
  return useQuery({
    queryKey: notificationKeys.unreadSummary(),
    queryFn: fetchUnreadSummary,
    staleTime: 1000 * 30,
    enabled: !!getToken(),
    refetchInterval: 1000 * 60,
  });
};

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, userId }: { id: string; userId: string }) =>
      markAsRead(id, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
};

export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => markAllAsRead(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
};

export const useNotificationsInfinite = ({
  limit = 20,
}: { limit?: number } = {}) => {
  return useInfiniteQuery({
    queryKey: [...notificationKeys.all, "infinite", { limit }] as const,

    queryFn: ({ pageParam = 0 }) =>
      fetchUserNotifications({ limit, offset: pageParam as number }),

    getNextPageParam: (lastPage, allPages) => {
      const fetched = allPages.flatMap((p) => p.notifications).length;
      if (lastPage.notifications.length < limit) return undefined;
      return fetched;
    },

    initialPageParam: 0,
    staleTime: 1000 * 30,
    enabled: !!getToken(),
    refetchInterval: 1000 * 60,
  });
};
