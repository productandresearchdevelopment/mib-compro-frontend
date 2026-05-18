import { buildQueryParams, getToken, handleFetchError } from "@/utils/common";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  IChangeRequest,
  IChangeRequestTimeline,
  IChangeRequestComment,
} from "@/types/model";
import {
  IPaginationParams,
  IChangeRequestPaginatedResponse,
} from "@/types/pagination";
import { useState } from "react";

export interface SignatureVerificationResult {
  success: boolean;
  valid: boolean;
  message: string;
  signature?: {
    document_type: string;
    document_id: string;
    document_ref: string;
    signer_name: string;
    signer_role: string;
    signed_at: string;
    valid_until: string;
    app_name: string;
  };
  document?: {
    id: string;
    title: string;
    status: string;
    department: string;
    priority: string;
  };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) throw new Error("API base URL is not defined");

const fetchAllChangeRequests = async (query: {
  include_deleted: boolean;
}): Promise<IChangeRequest[]> => {
  const token = getToken();
  const qs = buildQueryParams(query);
  const res = await fetch(
    `${API_BASE_URL}/change-requests${qs ? `?${qs}` : ""}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (!res.ok) await handleFetchError(res);
  const data = await res.json();
  if (!data?.data) throw new Error("Invalid response structure");
  return data.data;
};

const fetchChangeRequestById = async (id: string): Promise<IChangeRequest> => {
  const token = getToken();
  const res = await fetch(`${API_BASE_URL}/change-requests/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) await handleFetchError(res);
  const data = await res.json();
  if (!data?.data) throw new Error("Invalid response structure");
  return data.data;
};

const fetchChangeRequestsPaginated = async (
  query: IPaginationParams & {
    change_request_status?: string;
    department?: string;
    priority?: string;
  },
): Promise<IChangeRequestPaginatedResponse> => {
  const token = getToken();
  const qs = buildQueryParams(query);
  const res = await fetch(
    `${API_BASE_URL}/change-requests/paginated${qs ? `?${qs}` : ""}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (!res.ok) await handleFetchError(res);
  const data = await res.json();
  if (!data?.data) throw new Error("Invalid response structure");
  return data.data;
};

const fetchChangeRequestTimelines = async (
  id: string,
): Promise<IChangeRequestTimeline[]> => {
  const token = getToken();
  const res = await fetch(`${API_BASE_URL}/change-requests/${id}/timelines`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) await handleFetchError(res);
  const data = await res.json();
  if (!data?.data) throw new Error("Invalid response structure");
  return data.data;
};

const fetchChangeRequestComments = async (
  id: string,
): Promise<IChangeRequestComment[]> => {
  const token = getToken();
  const res = await fetch(`${API_BASE_URL}/change-requests/${id}/comments`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) await handleFetchError(res);
  const data = await res.json();
  if (!data?.data) throw new Error("Invalid response structure");
  return data.data;
};

const exportChangeRequestToPDF = async (id: string): Promise<Response> => {
  const token = getToken();
  const response = await fetch(
    `${API_BASE_URL}/change-requests/${id}/export/pdf`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    await handleFetchError(response);
  }
  return response;
};

const verifyChangeRequestSignature = async (
  token: string,
): Promise<SignatureVerificationResult> => {
  const response = await fetch(
    `${API_BASE_URL}/change-requests/verify/${token}`,
    {
      method: "GET",
    },
  );
  const data = await response.json();
  return data;
};

const triggerFileDownload = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const useAllChangeRequests = ({
  params,
  enabled,
}: {
  params: { include_deleted: boolean };
  enabled: boolean;
}) =>
  useQuery<IChangeRequest[], Error>({
    queryKey: ["change-requests", params],
    queryFn: () => fetchAllChangeRequests(params),
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && enabled,
  });

export const useChangeRequestById = ({
  id,
  enabled,
}: {
  id: string;
  enabled?: boolean;
}) =>
  useQuery<IChangeRequest, Error>({
    queryKey: ["change-request", id],
    queryFn: () => fetchChangeRequestById(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && !!id && (enabled ?? true),
  });

export const useInfiniteChangeRequests = ({
  params,
  enabled,
  pageSize = 10,
}: {
  params: {
    search?: string;
    department?: string;
    priority?: string;
    change_request_status?: string;
  };
  enabled: boolean;
  pageSize?: number;
}) =>
  useInfiniteQuery<IChangeRequestPaginatedResponse, Error>({
    queryKey: ["change-requests-infinite", params, pageSize],
    queryFn: ({ pageParam }) =>
      fetchChangeRequestsPaginated({
        page: pageParam as number,
        limit: pageSize,
        search: params.search,
        department: params.department,
        priority: params.priority,
        change_request_status: params.change_request_status,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.has_next
        ? (lastPage.pagination.current_page ?? 1) + 1
        : undefined,
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && enabled,
  });

export const useChangeRequestTimelines = ({
  id,
  enabled,
}: {
  id: string;
  enabled?: boolean;
}) =>
  useQuery<IChangeRequestTimeline[], Error>({
    queryKey: ["change-request-timelines", id],
    queryFn: () => fetchChangeRequestTimelines(id),
    staleTime: 1000 * 60 * 2,
    enabled: !!getToken() && !!id && (enabled ?? true),
  });

export const useChangeRequestComments = ({
  id,
  enabled,
}: {
  id: string;
  enabled?: boolean;
}) =>
  useQuery<IChangeRequestComment[], Error>({
    queryKey: ["change-request-comments", id],
    queryFn: () => fetchChangeRequestComments(id),
    staleTime: 1000 * 60 * 2,
    enabled: !!getToken() && !!id && (enabled ?? true),
  });

type CreateChangeRequestPayload = {
  title: string;
  description?: string;
  department?: string;
  priority?: string;
  assignee?: string;
  due_date?: string;
};

type UpdateChangeRequestPayload = Partial<
  CreateChangeRequestPayload & { status: string; notes?: string }
>;

const invalidateAll = (qc: ReturnType<typeof useQueryClient>) => {
  qc.invalidateQueries({ queryKey: ["change-requests"] });
  qc.invalidateQueries({ queryKey: ["change-requests-infinite"] });
  qc.invalidateQueries({ queryKey: ["change-request"] });
};

export const useCreateChangeRequest = () => {
  const qc = useQueryClient();
  return useMutation<IChangeRequest, Error, CreateChangeRequestPayload>({
    mutationFn: async (payload) => {
      const token = getToken();
      const res = await fetch(`${API_BASE_URL}/change-requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) await handleFetchError(res);
      const data = await res.json();
      return data.data;
    },
    onSuccess: () => {
      invalidateAll(qc);
      showSuccessToast("Change request created successfully");
    },
    onError: (e) =>
      showErrorToast(e.message || "Failed to create change request"),
  });
};

export const useUpdateChangeRequest = () => {
  const qc = useQueryClient();
  return useMutation<
    IChangeRequest,
    Error,
    { id: string; data: UpdateChangeRequestPayload }
  >({
    mutationFn: async ({ id, data }) => {
      const token = getToken();
      const res = await fetch(`${API_BASE_URL}/change-requests/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) await handleFetchError(res);
      const resp = await res.json();
      return resp.data;
    },
    onSuccess: (_, { id }) => {
      invalidateAll(qc);
      qc.invalidateQueries({ queryKey: ["change-request-timelines", id] });
      showSuccessToast("Change request updated successfully");
    },
    onError: (e) =>
      showErrorToast(e.message || "Failed to update change request"),
  });
};

export const useSoftDeleteChangeRequests = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: async (ids) => {
      const token = getToken();
      const res = await fetch(`${API_BASE_URL}/change-requests/soft-delete`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ids }),
      });
      if (!res.ok) await handleFetchError(res);
    },
    onSuccess: () => {
      invalidateAll(qc);
      showSuccessToast("Change request deleted successfully");
    },
    onError: (e) =>
      showErrorToast(e.message || "Failed to delete change request"),
  });
};

export const useRestoreChangeRequests = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: async (ids) => {
      const token = getToken();
      const res = await fetch(`${API_BASE_URL}/change-requests/restore`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ids }),
      });
      if (!res.ok) await handleFetchError(res);
    },
    onSuccess: () => {
      invalidateAll(qc);
      showSuccessToast("Change request restored successfully");
    },
    onError: (e) =>
      showErrorToast(e.message || "Failed to restore change request"),
  });
};

export const useForceDeleteChangeRequests = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: async (ids) => {
      const token = getToken();
      const res = await fetch(`${API_BASE_URL}/change-requests/hard-delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ids }),
      });
      if (!res.ok) await handleFetchError(res);
    },
    onSuccess: () => {
      invalidateAll(qc);
      showSuccessToast("Change request permanently deleted");
    },
    onError: (e) =>
      showErrorToast(
        e.message || "Failed to permanently delete change request",
      ),
  });
};

export const useAddChangeRequestComment = () => {
  const qc = useQueryClient();
  return useMutation<
    IChangeRequestComment,
    Error,
    { changeRequestId: string; author_name: string; content: string }
  >({
    mutationFn: async ({ changeRequestId, ...body }) => {
      const token = getToken();
      const res = await fetch(
        `${API_BASE_URL}/change-requests/${changeRequestId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        },
      );
      if (!res.ok) await handleFetchError(res);
      const data = await res.json();
      return data.data;
    },
    onSuccess: (_, { changeRequestId }) => {
      qc.invalidateQueries({
        queryKey: ["change-request-comments", changeRequestId],
      });
    },
    onError: (e) => showErrorToast(e.message || "Failed to add comment"),
  });
};

export const useDeleteChangeRequestComment = () => {
  const qc = useQueryClient();
  return useMutation<
    void,
    Error,
    { commentId: string; changeRequestId: string }
  >({
    mutationFn: async ({ commentId }) => {
      const token = getToken();
      const res = await fetch(
        `${API_BASE_URL}/change-requests/comments/${commentId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (!res.ok) await handleFetchError(res);
    },
    onSuccess: (_, { changeRequestId }) => {
      qc.invalidateQueries({
        queryKey: ["change-request-comments", changeRequestId],
      });
    },
    onError: (e) => showErrorToast(e.message || "Failed to delete comment"),
  });
};

export const useExportChangeRequestPDF = () => {
  const handleExport = async (id: string) => {
    try {
      const response = await exportChangeRequestToPDF(id);

      const disposition = response.headers.get("Content-Disposition") || "";
      const blob = await response.blob();

      let filename = "";
      const match = disposition.match(
        /filename[^;=\n]*=\s*["']?([^"';\n]+)["']?/i,
      );
      if (match?.[1]) {
        filename = match[1].trim();
      } else {
        const timestamp = new Date()
          .toISOString()
          .replace(/[-:]/g, "")
          .split(".")[0]
          .replace("T", "_");
        filename = `change_request_${timestamp}.pdf`;
      }

      triggerFileDownload(blob, filename);
      showSuccessToast("The PDF was successfully exported");
    } catch (err) {
      const error = err as Error;
      showErrorToast(error.message || "Failed to export PDF");
      throw error;
    }
  };

  return { handleExport };
};

export const useVerifySignature = () => {
  const [result, setResult] = useState<SignatureVerificationResult | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verify = async (token: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await verifyChangeRequestSignature(token);
      setResult(data);
    } catch (err) {
      const e = err as Error;
      setError(e.message || "Verifikasi gagal");
    } finally {
      setIsLoading(false);
    }
  };

  return { verify, result, isLoading, error };
};
