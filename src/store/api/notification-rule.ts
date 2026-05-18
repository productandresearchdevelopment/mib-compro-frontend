import { buildQueryParams, getToken, handleFetchError } from "@/utils/common";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  INotificationEvent,
  INotificationRule,
  ICreateNotificationRulePayload,
  IUpdateNotificationRulePayload,
  IChannelWarning,
} from "@/types/notification";
import { IPaginationParams } from "@/types/pagination";
import { INotificationRulePaginatedResponse } from "@/types/pagination";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API base URL is not defined");
}

const fetchNotificationEvents = async (): Promise<INotificationEvent[]> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/notifications/events`, {
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

const fetchNotificationRules = async (): Promise<INotificationRule[]> => {
  const token = getToken();
  const qs = buildQueryParams({});

  const response = await fetch(
    `${API_BASE_URL}/notifications/rules${qs ? `?${qs}` : ""}`,
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

const fetchNotificationRulesPaginated = async (
  query: IPaginationParams,
): Promise<INotificationRulePaginatedResponse> => {
  const token = getToken();
  const qs = buildQueryParams(query);
  const url = `${API_BASE_URL}/notifications/rules/paginated${qs ? `?${qs}` : ""}`;

  const response = await fetch(url, {
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

const createNotificationRule = async (
  payload: ICreateNotificationRulePayload,
): Promise<{ rule: INotificationRule; warnings: IChannelWarning[] }> => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/notifications/rules`, {
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
  return data.data;
};

const updateNotificationRule = async (
  payload: IUpdateNotificationRulePayload,
): Promise<{ rule: INotificationRule; warnings: IChannelWarning[] }> => {
  const token = getToken();

  const response = await fetch(
    `${API_BASE_URL}/notifications/rules/${payload.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    await handleFetchError(response);
  }

  const data = await response.json();
  return data.data;
};

const softDeleteNotificationRules = async (ids: string[]): Promise<void> => {
  const token = getToken();

  const response = await fetch(
    `${API_BASE_URL}/notifications/rules/soft-delete`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ids }),
    },
  );

  if (!response.ok) {
    await handleFetchError(response);
  }
};

const restoreNotificationRules = async (ids: string[]): Promise<void> => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/notifications/rules/restore`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ids }),
  });

  if (!response.ok) {
    await handleFetchError(response);
  }
};

const forceDeleteNotificationRules = async (ids: string[]): Promise<void> => {
  const token = getToken();

  const response = await fetch(
    `${API_BASE_URL}/notifications/rules/hard-delete`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ids }),
    },
  );

  if (!response.ok) {
    await handleFetchError(response);
  }
};

export const useNotificationEvents = () => {
  return useQuery<INotificationEvent[], Error>({
    queryKey: ["notification-events"],
    queryFn: fetchNotificationEvents,
    staleTime: 1000 * 60 * 60,
    enabled: !!getToken(),
  });
};

export const useNotificationRules = () => {
  return useQuery<INotificationRule[], Error>({
    queryKey: ["notification-rules"],
    queryFn: fetchNotificationRules,
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken(),
  });
};

export const useCreateNotificationRule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNotificationRule,
    onSuccess: ({ warnings }) => {
      queryClient.invalidateQueries({ queryKey: ["notification-rules"] });
      if (warnings && warnings.length > 0) {
        showWarningToast(
          `Rule created with ${warnings.length} warning(s). Check channel configuration.`,
        );
      } else {
        showSuccessToast("Notification rule created successfully");
      }
    },
    onError: (error: Error) => {
      showErrorToast(error.message || "Failed to create notification rule");
    },
  });
};

export const useUpdateNotificationRule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNotificationRule,
    onSuccess: ({ warnings }) => {
      queryClient.invalidateQueries({ queryKey: ["notification-rules"] });
      if (warnings && warnings.length > 0) {
        showWarningToast(
          `Rule updated with ${warnings.length} warning(s). Check channel configuration.`,
        );
      } else {
        showSuccessToast("Notification rule updated successfully");
      }
    },
    onError: (error: Error) => {
      showErrorToast(error.message || "Failed to update notification rule");
    },
  });
};

export const usePaginatedNotificationRules = ({
  params,
  enabled,
}: {
  params: IPaginationParams;
  enabled: boolean;
}) => {
  return useQuery<INotificationRulePaginatedResponse, Error>({
    queryKey: ["notification-rules", params],
    queryFn: ({ queryKey }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_key, queryParams] = queryKey as [string, IPaginationParams];
      return fetchNotificationRulesPaginated(queryParams);
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && enabled,
  });
};

export const useSoftDeleteNotificationRules = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string[]>({
    mutationFn: softDeleteNotificationRules,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notification-rules"] });
      showSuccessToast("Notification rules deleted successfully");
    },
    onError: (error: Error) => {
      showErrorToast(error.message || "Failed to delete notification rules");
    },
  });
};

export const useRestoreNotificationRules = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string[]>({
    mutationFn: restoreNotificationRules,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notification-rules"] });
      showSuccessToast("Notification rules restored successfully");
    },
    onError: (error: Error) => {
      showErrorToast(error.message || "Failed to restore notification rules");
    },
  });
};

export const useForceDeleteNotificationRules = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string[]>({
    mutationFn: forceDeleteNotificationRules,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notification-rules"] });
      showSuccessToast("Notification rules permanently deleted");
    },
    onError: (error: Error) => {
      showErrorToast(
        error.message || "Failed to permanently delete notification rules",
      );
    },
  });
};
