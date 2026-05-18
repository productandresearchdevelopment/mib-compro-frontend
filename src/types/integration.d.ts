export type ProviderType = "CONFIG" | "QR";
export type IntegrationStatus = "connected" | "disconnected" | "error";
export type DisplayStatus =
  | "CONNECTED"
  | "DISCONNECTED"
  | "ERROR"
  | "NOT_SETUP";
export type ChatType = "group" | "supergroup" | "private" | "channel";

export interface IProviderConfigField {
  key: string;
  label: string;
  type: "text" | "password" | "url" | "number";
  required: boolean;
  placeholder?: string;
  description?: string;
}

export interface IProviderMetadata {
  provider_key: string;
  display_name: string;
  description: string;
  icon: string;
  category: string;
  type: ProviderType;
  config_fields: IProviderConfigField[];
}

export interface IIntegration {
  id: string;
  provider_key: string;
  config: IntegrationConfig;
  status: IntegrationStatus;
  is_active: boolean;
  last_tested_at?: string;
  last_error?: string;
  config_version: number;
  created_at: string;
  updated_at: string;
}

export interface IProviderWithStatus extends IProviderMetadata {
  integration?: ICompanyIntegration;
  displayStatus: DisplayStatus;
}

export interface IntegrationConfig {
  bot_token?: string;
  chat_id?: string;
  chat_ids?: string[];
  group_id?: string;
  group_ids?: string[];
  chats?: StoredChat[];
  [key: string]: string | string[] | StoredChat[] | undefined;
}

export interface StoredChat {
  id: string;
  name: string;
  type: "group" | "private" | "channel";
}

export interface ConnectProviderPayload {
  provider_key: string;
  config: IntegrationConfig;
}

export interface ConnectProviderResponse {
  integration: IIntegration;
  data?: WhatsAppQRData | null;
}

export interface DisconnectProviderPayload {
  provider_key: string;
}

export interface TestChatPayload {
  provider_key: string;
  chat_id: string;
}

export interface WhatsAppQRData {
  qr_code?: string;
  status: "connected" | "scan_needed";
  expires_in_ms?: number;
  generated_at?: number;
}

export interface WhatsAppChat {
  id: string;
  title: string;
  type: "group" | "private";
}

export interface TelegramChat {
  id: string;
  type: ChatType;
  title: string;
  username?: string;
  first_name?: string;
  last_name?: string;
}
