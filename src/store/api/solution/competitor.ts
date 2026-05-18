import { buildQueryParams, getToken, handleFetchError } from "@/utils/common";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { ISolutionCompetitor } from "@/types/model";
import {
  IPaginationSolutionCompetitorParams,
  ISolutionCompetitorPaginatedResponse,
} from "@/types/pagination";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API base URL is not defined");
}

const fetchAllSolutionCompetitors = async (query: {
  include_deleted: boolean;
  solution_id?: string;
}): Promise<ISolutionCompetitor[]> => {
  const token = getToken();
  const qs = buildQueryParams(query);
  const url = `${API_BASE_URL}/solution-competitors${qs ? `?${qs}` : ""}`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) await handleFetchError(response);
  const data = await response.json();
  if (!data?.data) throw new Error("Invalid response structure");
  return data.data;
};

const fetchSolutionCompetitorById = async (
  id: string,
): Promise<ISolutionCompetitor> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/solution-competitors/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) await handleFetchError(response);
  const data = await response.json();
  if (!data?.data) throw new Error("Invalid response structure");
  return data.data;
};

const fetchSolutionCompetitorPaginated = async (
  query: IPaginationSolutionCompetitorParams,
): Promise<ISolutionCompetitorPaginatedResponse> => {
  const token = getToken();
  const qs = buildQueryParams(query);
  const url = `${API_BASE_URL}/solution-competitors/paginated${qs ? `?${qs}` : ""}`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) await handleFetchError(response);
  const data = await response.json();
  if (!data?.data) throw new Error("Invalid response structure");
  return data.data;
};

type CompetitorPayload = Omit<
  ISolutionCompetitor,
  | "id"
  | "created_at"
  | "updated_at"
  | "deleted_at"
  | "created_by"
  | "updated_by"
  | "deleted_by"
  | "solution"
  | "image"
>;

const createSolutionCompetitor = async (
  payload: CompetitorPayload,
  image?: File,
): Promise<ISolutionCompetitor> => {
  const token = getToken();
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });
  if (image) formData.append("image", image);

  const response = await fetch(`${API_BASE_URL}/solution-competitors`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!response.ok) await handleFetchError(response);
  const data = await response.json();
  if (!data?.data) throw new Error("Invalid response structure");
  return data.data;
};

const updateSolutionCompetitor = async (
  id: string,
  payload: Partial<CompetitorPayload>,
  image?: File,
): Promise<ISolutionCompetitor> => {
  const token = getToken();
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });
  if (image) formData.append("image", image);

  const response = await fetch(`${API_BASE_URL}/solution-competitors/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!response.ok) await handleFetchError(response);
  const data = await response.json();
  if (!data?.data) throw new Error("Invalid response structure");
  return data.data;
};

const softDeleteSolutionCompetitors = async (ids: string[]): Promise<void> => {
  const token = getToken();
  const response = await fetch(
    `${API_BASE_URL}/solution-competitors/soft-delete`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ids }),
    },
  );
  if (!response.ok) await handleFetchError(response);
};

const restoreSolutionCompetitors = async (ids: string[]): Promise<void> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/solution-competitors/restore`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ids }),
  });
  if (!response.ok) await handleFetchError(response);
};

const forceDeleteSolutionCompetitors = async (ids: string[]): Promise<void> => {
  const token = getToken();
  const response = await fetch(
    `${API_BASE_URL}/solution-competitors/hard-delete`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ids }),
    },
  );
  if (!response.ok) await handleFetchError(response);
};

// ============================================================
// HOOKS
// ============================================================

export const useAllSolutionCompetitors = ({
  params,
  enabled,
}: {
  params: { include_deleted: boolean; solution_id?: string };
  enabled: boolean;
}) => {
  return useQuery<ISolutionCompetitor[], Error>({
    queryKey: ["solution-competitors", params],
    queryFn: () => fetchAllSolutionCompetitors(params),
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && enabled,
  });
};

export const useSolutionCompetitorById = ({
  id,
  enabled,
}: {
  id: string;
  enabled?: boolean;
}) => {
  return useQuery<ISolutionCompetitor, Error>({
    queryKey: ["solution-competitor", id],
    queryFn: () => fetchSolutionCompetitorById(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && !!id && (enabled ?? true),
  });
};

export const usePaginatedSolutionCompetitors = ({
  params,
  enabled,
}: {
  params: IPaginationSolutionCompetitorParams;
  enabled: boolean;
}) => {
  return useQuery<ISolutionCompetitorPaginatedResponse, Error>({
    queryKey: ["solution-competitors", params],
    queryFn: ({ queryKey }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_key, queryParams] = queryKey as [string, typeof params];
      return fetchSolutionCompetitorPaginated(queryParams);
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && enabled,
  });
};

// Infinite scroll hook — used in CompetitorTab
export const useInfiniteSolutionCompetitors = ({
  params,
  enabled,
  pageSize = 6,
}: {
  params: { solution_id: string; search?: string; include_deleted?: boolean };
  enabled: boolean;
  pageSize?: number;
}) => {
  return useInfiniteQuery<ISolutionCompetitorPaginatedResponse, Error>({
    queryKey: ["solution-competitors-infinite", params, pageSize],
    queryFn: ({ pageParam }) =>
      fetchSolutionCompetitorPaginated({
        page: pageParam as number,
        limit: pageSize,
        search: params.search,
        solution_id: params.solution_id,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.has_next
        ? (lastPage.pagination.current_page ?? 1) + 1
        : undefined,
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && enabled,
  });
};

export const useCreateSolutionCompetitor = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ISolutionCompetitor,
    Error,
    { competitor: CompetitorPayload; image?: File }
  >({
    mutationFn: ({ competitor, image }) =>
      createSolutionCompetitor(competitor, image),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["solution-competitors"] });
      queryClient.invalidateQueries({
        queryKey: ["solution-competitors-infinite"],
      });
      queryClient.invalidateQueries({ queryKey: ["solutions"] });
      queryClient.invalidateQueries({ queryKey: ["solution"] });
      showSuccessToast("Competitor created successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to create competitor");
    },
  });
};

export const useUpdateSolutionCompetitor = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ISolutionCompetitor,
    Error,
    { id: string; competitor: Partial<CompetitorPayload>; image?: File }
  >({
    mutationFn: ({ id, competitor, image }) =>
      updateSolutionCompetitor(id, competitor, image),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["solution-competitors"] });
      queryClient.invalidateQueries({
        queryKey: ["solution-competitors-infinite"],
      });
      queryClient.invalidateQueries({ queryKey: ["solution-competitor"] });
      queryClient.invalidateQueries({ queryKey: ["solutions"] });
      queryClient.invalidateQueries({ queryKey: ["solution"] });
      showSuccessToast("Competitor updated successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to update competitor");
    },
  });
};

export const useSoftDeleteSolutionCompetitors = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: softDeleteSolutionCompetitors,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["solution-competitors"] });
      queryClient.invalidateQueries({
        queryKey: ["solution-competitors-infinite"],
      });
      queryClient.invalidateQueries({ queryKey: ["solutions"] });
      queryClient.invalidateQueries({ queryKey: ["solution"] });
      showSuccessToast("Competitor deleted successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to delete competitor");
    },
  });
};

export const useRestoreSolutionCompetitors = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: restoreSolutionCompetitors,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["solution-competitors"] });
      queryClient.invalidateQueries({
        queryKey: ["solution-competitors-infinite"],
      });
      queryClient.invalidateQueries({ queryKey: ["solutions"] });
      queryClient.invalidateQueries({ queryKey: ["solution"] });
      showSuccessToast("Competitor restored successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to restore competitor");
    },
  });
};

export const useForceDeleteSolutionCompetitors = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: forceDeleteSolutionCompetitors,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["solution-competitors"] });
      queryClient.invalidateQueries({
        queryKey: ["solution-competitors-infinite"],
      });
      queryClient.invalidateQueries({ queryKey: ["solutions"] });
      queryClient.invalidateQueries({ queryKey: ["solution"] });
      showSuccessToast("Competitor permanently deleted");
    },
    onError: (error) => {
      showErrorToast(
        error.message || "Failed to permanently delete competitor",
      );
    },
  });
};
