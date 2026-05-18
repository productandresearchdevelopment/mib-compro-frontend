import { IRealtimeNotification, IUnreadSummary } from "@/types/notification";
import { create } from "zustand";

interface NotificationState {
  realtimeQueue: IRealtimeNotification[];
  unreadTotal: number;
  isConnected: boolean;

  pushNotification: (notification: IRealtimeNotification) => void;
  pushNotificationSilent: (notification: IRealtimeNotification) => void;
  setUnreadSummary: (summary: IUnreadSummary) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  setConnected: (connected: boolean) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  realtimeQueue: [],
  unreadTotal: 0,
  isConnected: false,

  pushNotification: (notification) =>
    set((state) => ({
      realtimeQueue: [notification, ...state.realtimeQueue].slice(0, 50),
      unreadTotal: state.unreadTotal + 1,
    })),

  pushNotificationSilent: (notification) =>
    set((state) => ({
      realtimeQueue: [notification, ...state.realtimeQueue].slice(0, 50),
    })),

  setUnreadSummary: (summary) =>
    set({
      unreadTotal: summary.total_unread,
    }),

  markAsRead: () =>
    set((state) => ({
      unreadTotal: Math.max(0, state.unreadTotal - 1),
    })),

  markAllAsRead: () =>
    set({
      unreadTotal: 0,
    }),

  setConnected: (connected) => set({ isConnected: connected }),
}));
