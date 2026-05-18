import { IUser } from "./model";

export interface INotificationEvent {
  id: string;
  event_code: string;
  description: string;
  is_active: boolean;
}

export type INotificationChannelType = "IN_APP" | "INTEGRATION";

export interface INotificationChannelConfig {
  type: INotificationChannelType;
  provider_key?: string;
  icon?: string;
  config?: Record<string, unknown>;
  is_active: boolean;
}

export interface INotificationRule {
  id: string;
  event_code: string;
  channels: INotificationChannelConfig[];
  is_active: boolean;
  event?: INotificationEvent;
  version: number;
  deleted_at?: string;
}

export interface IChannelWarning {
  channel_index: number;
  provider_key: string;
  warning: string;
}

export type ICreateNotificationRulePayload = {
  event_code: string;
  channels: INotificationChannelConfig[];
  is_active: boolean;
};

export type IUpdateNotificationRulePayload = {
  id: string;
  channels: INotificationChannelConfig[];
  is_active: boolean;
};

export interface INotification {
  id: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  created_at: string;
  read_at?: string;
  is_read: boolean;
  type: string;
}

export interface IRealtimeNotification {
  id: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  created_at: string;
  read_at?: string;
  is_read: boolean;
  type: string;
  event_code: string;
  url?: string;
  updated_at: string;
  recipients?: INotificationRecipient[];
}

export interface INotificationListItem extends INotification {
  event_code: string;
  url?: string;
  updated_at: string;
  recipients?: INotificationRecipient[];
}

export interface INotificationRecipient {
  id: string;
  notification_id: string;
  user_id: string;
  is_read: boolean;
  read_at?: string;

  user: IUser;
}

export interface IUnreadSummary {
  total_unread: number;
}

export interface INotificationListResponse {
  notifications: NotificationListItem[];
  total: number;
  limit: number;
  offset: number;
}
