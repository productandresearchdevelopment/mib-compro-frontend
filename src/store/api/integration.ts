import { buildQueryParams, getToken, handleFetchError } from "@/utils/common";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  IProviderMetadata,
  IIntegration,
  ConnectProviderPayload,
  ConnectProviderResponse,
  DisconnectProviderPayload,
  TestChatPayload,
  TelegramChat,
  WhatsAppQRData,
  WhatsAppChat,
} from "@/types/integration";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API base URL is not defined");
}

const fetchProviders = async (): Promise<IProviderMetadata[]> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/integrations/providers`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    await handleFetchError(response);
  }

  const data = await response.json();
  if (!data?.data) {
    throw new Error("Invalid response structure");
  }

  return data.data;
};

const fetchIntegrations = async (): Promise<IIntegration[]> => {
  const token = getToken();
  const qs = buildQueryParams({});

  const response = await fetch(
    `${API_BASE_URL}/integrations${qs ? `?${qs}` : ""}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (!response.ok) {
    await handleFetchError(response);
  }

  const data = await response.json();
  if (!data?.data) {
    throw new Error("Invalid response structure");
  }

  return data.data;
};

const connectProvider = async (
  payload: ConnectProviderPayload,
): Promise<ConnectProviderResponse> => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/integrations/connect`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    await handleFetchError(response);
  }

  const data = await response.json();
  if (!data?.data) {
    throw new Error("Invalid response structure");
  }

  return data.data;
};

const disconnectProvider = async (
  payload: DisconnectProviderPayload,
): Promise<void> => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/integrations/disconnect`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    await handleFetchError(response);
  }
};

const testChatConnection = async (payload: TestChatPayload): Promise<void> => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/integrations/test-chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    await handleFetchError(response);
  }
};

const fetchTelegramChats = async (
  botToken: string,
): Promise<TelegramChat[]> => {
  const token = getToken();
  const response = await fetch(
    `${API_BASE_URL}/integrations/telegram/chats?bot_token=${botToken}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch chats");
  }

  const data = await response.json();
  return data.data;
};

const fetchWhatsAppQR = async (): Promise<WhatsAppQRData> => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/integrations/whatsapp/qr`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch QR code");
  }

  const data = await response.json();
  return data.data;
};

const fetchWhatsAppChats = async (): Promise<WhatsAppChat[]> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/integrations/whatsapp/chats`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch chats");
  }

  const data = await response.json();
  return data.data;
};

export const useProviders = () => {
  return useQuery<IProviderMetadata[], Error>({
    queryKey: ["integration-providers"],
    queryFn: fetchProviders,
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken(),
  });
};

export const useIntegrations = ({ enabled }: { enabled: boolean }) => {
  return useQuery<IIntegration[], Error>({
    queryKey: ["integrations"],
    queryFn: fetchIntegrations,
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && enabled,
  });
};

export const useTelegramChats = (botToken: string, enabled: boolean) => {
  return useQuery<TelegramChat[], Error>({
    queryKey: ["telegram-chats", botToken],
    queryFn: () => fetchTelegramChats(botToken),
    enabled: !!getToken() && !!botToken && enabled,
    retry: false,
  });
};

export const useWhatsAppQR = (enabled: boolean) => {
  return useQuery<WhatsAppQRData, Error>({
    queryKey: ["whatsapp-qr"],
    queryFn: fetchWhatsAppQR,
    enabled: !!getToken() && enabled,
    refetchInterval: (query) => {
      if (query.state.data?.status === "connected") return false;
      return 30000;
    },
    refetchOnWindowFocus: false,
  });
};

export const useWhatsAppChats = (enabled: boolean) => {
  return useQuery<WhatsAppChat[], Error>({
    queryKey: ["whatsapp-chats"],
    queryFn: fetchWhatsAppChats,
    enabled: !!getToken() && enabled,
    retry: false,
  });
};

export const useConnectProvider = () => {
  const queryClient = useQueryClient();

  return useMutation<ConnectProviderResponse, Error, ConnectProviderPayload>({
    mutationFn: connectProvider,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["integrations"] });
      queryClient.invalidateQueries({ queryKey: ["whatsapp-qr"] });
      queryClient.invalidateQueries({ queryKey: ["whatsapp-chats"] });
      showSuccessToast("Provider connected successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to connect provider");
    },
  });
};

export const useDisconnectProvider = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DisconnectProviderPayload>({
    mutationFn: disconnectProvider,
    onSuccess: (_data, variables) => {
      queryClient.removeQueries({ queryKey: ["integrations"] });

      if (variables.provider_key === "whatsapp") {
        queryClient.removeQueries({ queryKey: ["whatsapp-qr"] });
        queryClient.removeQueries({ queryKey: ["whatsapp-chats"] });
      }

      if (variables.provider_key === "telegram") {
        queryClient.removeQueries({ queryKey: ["telegram-chats"] });
      }

      queryClient.invalidateQueries({ queryKey: ["integrations"] });

      showSuccessToast("Provider disconnected successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to disconnect provider");
    },
  });
};

export const useTestChatConnection = () => {
  return useMutation<void, Error, TestChatPayload>({
    mutationFn: testChatConnection,
    onSuccess: () => {
      showSuccessToast("Chat connection test successful");
    },
    onError: (error) => {
      showErrorToast(error.message || "Chat connection test failed");
    },
  });
};
