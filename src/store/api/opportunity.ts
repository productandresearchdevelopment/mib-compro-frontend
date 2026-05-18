import { buildQueryParams, getToken, handleFetchError } from "@/utils/common";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  IOpportunity,
  IOpportunityTimeline,
  IOpportunityComment,
} from "@/types/model";
import {
  IPaginationParams,
  IOpportunityPaginatedResponse,
} from "@/types/pagination";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) throw new Error("API base URL is not defined");

const fetchAllOpportunities = async (query: {
  include_deleted: boolean;
}): Promise<IOpportunity[]> => {
  const token = getToken();
  const qs = buildQueryParams(query);
  const res = await fetch(
    `${API_BASE_URL}/opportunities${qs ? `?${qs}` : ""}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (!res.ok) await handleFetchError(res);
  const data = await res.json();
  if (!data?.data) throw new Error("Invalid response structure");
  return data.data;
};

const fetchOpportunityById = async (id: string): Promise<IOpportunity> => {
  const token = getToken();
  const res = await fetch(`${API_BASE_URL}/opportunities/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) await handleFetchError(res);
  const data = await res.json();
  if (!data?.data) throw new Error("Invalid response structure");
  return data.data;
};

const fetchOpportunitiesPaginated = async (
  query: IPaginationParams & {
    opportunity_status?: string;
    department?: string;
    impact?: string;
  },
): Promise<IOpportunityPaginatedResponse> => {
  const token = getToken();
  const qs = buildQueryParams(query);
  const res = await fetch(
    `${API_BASE_URL}/opportunities/paginated${qs ? `?${qs}` : ""}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (!res.ok) await handleFetchError(res);
  const data = await res.json();
  if (!data?.data) throw new Error("Invalid response structure");
  return data.data;
};

const fetchOpportunityTimelines = async (
  id: string,
): Promise<IOpportunityTimeline[]> => {
  const token = getToken();
  const res = await fetch(`${API_BASE_URL}/opportunities/${id}/timelines`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) await handleFetchError(res);
  const data = await res.json();
  if (!data?.data) throw new Error("Invalid response structure");
  return data.data;
};

const fetchOpportunityComments = async (
  id: string,
): Promise<IOpportunityComment[]> => {
  const token = getToken();
  const res = await fetch(`${API_BASE_URL}/opportunities/${id}/comments`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) await handleFetchError(res);
  const data = await res.json();
  if (!data?.data) throw new Error("Invalid response structure");
  return data.data;
};

export const useAllOpportunities = ({
  params,
  enabled,
}: {
  params: { include_deleted: boolean };
  enabled: boolean;
}) =>
  useQuery<IOpportunity[], Error>({
    queryKey: ["opportunities", params],
    queryFn: () => fetchAllOpportunities(params),
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && enabled,
  });

export const useOpportunityById = ({
  id,
  enabled,
}: {
  id: string;
  enabled?: boolean;
}) =>
  useQuery<IOpportunity, Error>({
    queryKey: ["opportunity", id],
    queryFn: () => fetchOpportunityById(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && !!id && (enabled ?? true),
  });

export const useInfiniteOpportunities = ({
  params,
  enabled,
  pageSize = 10,
}: {
  params: {
    search?: string;
    department?: string;
    impact?: string;
    opportunity_status?: string;
  };
  enabled: boolean;
  pageSize?: number;
}) =>
  useInfiniteQuery<IOpportunityPaginatedResponse, Error>({
    queryKey: ["opportunities-infinite", params, pageSize],
    queryFn: ({ pageParam }) =>
      fetchOpportunitiesPaginated({
        page: pageParam as number,
        limit: pageSize,
        search: params.search,
        department: params.department,
        impact: params.impact,
        opportunity_status: params.opportunity_status,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.has_next
        ? (lastPage.pagination.current_page ?? 1) + 1
        : undefined,
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && enabled,
  });

export const useOpportunityTimelines = ({
  id,
  enabled,
}: {
  id: string;
  enabled?: boolean;
}) =>
  useQuery<IOpportunityTimeline[], Error>({
    queryKey: ["timelines", id],
    queryFn: () => fetchOpportunityTimelines(id),
    staleTime: 1000 * 60 * 2,
    enabled: !!getToken() && !!id && (enabled ?? true),
  });

export const useOpportunityComments = ({
  id,
  enabled,
}: {
  id: string;
  enabled?: boolean;
}) =>
  useQuery<IOpportunityComment[], Error>({
    queryKey: ["comments", id],
    queryFn: () => fetchOpportunityComments(id),
    staleTime: 1000 * 60 * 2,
    enabled: !!getToken() && !!id && (enabled ?? true),
  });

type CreateOpportunityPayload = {
  title: string;
  description?: string;
  department?: string;
  impact?: string;
  timeline?: string;
  assignee?: string;
  resources?: string;
};

type UpdateOpportunityPayload = Partial<
  CreateOpportunityPayload & { status: string; notes?: string }
>;

const invalidateAll = (qc: ReturnType<typeof useQueryClient>) => {
  qc.invalidateQueries({ queryKey: ["opportunities"] });
  qc.invalidateQueries({ queryKey: ["opportunities-infinite"] });
  qc.invalidateQueries({ queryKey: ["opportunity"] });
};

export const useCreateOpportunity = () => {
  const qc = useQueryClient();
  return useMutation<IOpportunity, Error, CreateOpportunityPayload>({
    mutationFn: async (payload) => {
      const token = getToken();
      const res = await fetch(`${API_BASE_URL}/opportunities`, {
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
      showSuccessToast("Opportunity created successfully");
    },
    onError: (e) => showErrorToast(e.message || "Failed to create opportunity"),
  });
};

export const useUpdateOpportunity = () => {
  const qc = useQueryClient();
  return useMutation<
    IOpportunity,
    Error,
    { id: string; data: UpdateOpportunityPayload }
  >({
    mutationFn: async ({ id, data }) => {
      const token = getToken();
      const res = await fetch(`${API_BASE_URL}/opportunities/${id}`, {
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
      qc.invalidateQueries({ queryKey: ["timelines", id] });
      showSuccessToast("Opportunity updated successfully");
    },
    onError: (e) => showErrorToast(e.message || "Failed to update opportunity"),
  });
};

export const useSoftDeleteOpportunities = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: async (ids) => {
      const token = getToken();
      const res = await fetch(`${API_BASE_URL}/opportunities/soft-delete`, {
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
      showSuccessToast("Opportunity deleted successfully");
    },
    onError: (e) => showErrorToast(e.message || "Failed to delete opportunity"),
  });
};

export const useRestoreOpportunities = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: async (ids) => {
      const token = getToken();
      const res = await fetch(`${API_BASE_URL}/opportunities/restore`, {
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
      showSuccessToast("Opportunity restored successfully");
    },
    onError: (e) =>
      showErrorToast(e.message || "Failed to restore opportunity"),
  });
};

export const useForceDeleteOpportunities = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: async (ids) => {
      const token = getToken();
      const res = await fetch(`${API_BASE_URL}/opportunities/hard-delete`, {
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
      showSuccessToast("Opportunity permanently deleted");
    },
    onError: (e) =>
      showErrorToast(e.message || "Failed to permanently delete opportunity"),
  });
};

export const useAddOpportunityComment = () => {
  const qc = useQueryClient();
  return useMutation<
    IOpportunityComment,
    Error,
    { opportunityId: string; author_name: string; content: string }
  >({
    mutationFn: async ({ opportunityId, ...body }) => {
      const token = getToken();
      const res = await fetch(
        `${API_BASE_URL}/opportunities/${opportunityId}/comments`,
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
    onSuccess: (_, { opportunityId }) => {
      qc.invalidateQueries({
        queryKey: ["comments", opportunityId],
      });
    },
    onError: (e) => showErrorToast(e.message || "Failed to add comment"),
  });
};

export const useDeleteOpportunityComment = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, { commentId: string; opportunityId: string }>(
    {
      mutationFn: async ({ commentId }) => {
        const token = getToken();
        const res = await fetch(
          `${API_BASE_URL}/opportunities/comments/${commentId}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (!res.ok) await handleFetchError(res);
      },
      onSuccess: (_, { opportunityId }) => {
        qc.invalidateQueries({
          queryKey: ["comments", opportunityId],
        });
      },
      onError: (e) => showErrorToast(e.message || "Failed to delete comment"),
    },
  );
};
