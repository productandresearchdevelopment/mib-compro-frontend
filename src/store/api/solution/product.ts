import { buildQueryParams, getToken, handleFetchError } from "@/utils/common";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { ISolutionProduct } from "@/types/model";
import {
  IPaginationSolutionProductParams,
  ISolutionProductPaginatedResponse,
} from "@/types/pagination";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API base URL is not defined");
}

const fetchAllSolutionProducts = async (query: {
  include_deleted: boolean;
  solution_id?: string;
}): Promise<ISolutionProduct[]> => {
  const token = getToken();
  const qs = buildQueryParams(query);
  const url = `${API_BASE_URL}/solution-products${qs ? `?${qs}` : ""}`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) await handleFetchError(response);
  const data = await response.json();
  if (!data?.data) throw new Error("Invalid response structure");
  return data.data;
};

const fetchSolutionProductById = async (
  id: string,
): Promise<ISolutionProduct> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/solution-products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) await handleFetchError(response);
  const data = await response.json();
  if (!data?.data) throw new Error("Invalid response structure");
  return data.data;
};

const fetchSolutionProductPaginated = async (
  query: IPaginationSolutionProductParams,
): Promise<ISolutionProductPaginatedResponse> => {
  const token = getToken();
  const qs = buildQueryParams(query);
  const url = `${API_BASE_URL}/solution-products/paginated${qs ? `?${qs}` : ""}`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) await handleFetchError(response);
  const data = await response.json();
  if (!data?.data) throw new Error("Invalid response structure");
  return data.data;
};

const createSolutionProduct = async (payload: {
  solution_id: string;
  product_id: string;
}): Promise<ISolutionProduct> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/solution-products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) await handleFetchError(response);
  const data = await response.json();
  if (!data?.data) throw new Error("Invalid response structure");
  return data.data;
};

const softDeleteSolutionProducts = async (ids: string[]): Promise<void> => {
  const token = getToken();
  const response = await fetch(
    `${API_BASE_URL}/solution-products/soft-delete`,
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

const restoreSolutionProducts = async (ids: string[]): Promise<void> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/solution-products/restore`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ids }),
  });
  if (!response.ok) await handleFetchError(response);
};

const forceDeleteSolutionProducts = async (ids: string[]): Promise<void> => {
  const token = getToken();
  const response = await fetch(
    `${API_BASE_URL}/solution-products/hard-delete`,
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

export const useAllSolutionProducts = ({
  params,
  enabled,
}: {
  params: { include_deleted: boolean; solution_id?: string };
  enabled: boolean;
}) => {
  return useQuery<ISolutionProduct[], Error>({
    queryKey: ["solution-products", params],
    queryFn: () => fetchAllSolutionProducts(params),
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && enabled,
  });
};

export const useSolutionProductById = ({
  id,
  enabled,
}: {
  id: string;
  enabled?: boolean;
}) => {
  return useQuery<ISolutionProduct, Error>({
    queryKey: ["solution-product", id],
    queryFn: () => fetchSolutionProductById(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && !!id && (enabled ?? true),
  });
};

export const usePaginatedSolutionProducts = ({
  params,
  enabled,
}: {
  params: IPaginationSolutionProductParams;
  enabled: boolean;
}) => {
  return useQuery<ISolutionProductPaginatedResponse, Error>({
    queryKey: ["solution-products", params],
    queryFn: ({ queryKey }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_key, queryParams] = queryKey as [string, typeof params];
      return fetchSolutionProductPaginated(queryParams);
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && enabled,
  });
};

export const useInfiniteSolutionProducts = ({
  params,
  enabled,
  pageSize = 6,
}: {
  params: { solution_id: string; search?: string; include_deleted?: boolean };
  enabled: boolean;
  pageSize?: number;
}) => {
  return useInfiniteQuery<ISolutionProductPaginatedResponse, Error>({
    queryKey: ["solution-products-infinite", params, pageSize],
    queryFn: ({ pageParam }) =>
      fetchSolutionProductPaginated({
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

export const useCreateSolutionProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ISolutionProduct,
    Error,
    { solution_id: string; product_id: string }
  >({
    mutationFn: (payload) => createSolutionProduct(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["solution-products"] });
      queryClient.invalidateQueries({
        queryKey: ["solution-products-infinite"],
      });
      queryClient.invalidateQueries({ queryKey: ["solutions"] });
      queryClient.invalidateQueries({ queryKey: ["solution"] });
      showSuccessToast("Product added to solution successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to add product to solution");
    },
  });
};

export const useSoftDeleteSolutionProducts = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: softDeleteSolutionProducts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["solution-products"] });
      queryClient.invalidateQueries({
        queryKey: ["solution-products-infinite"],
      });
      queryClient.invalidateQueries({ queryKey: ["solutions"] });
      queryClient.invalidateQueries({ queryKey: ["solution"] });
      showSuccessToast("Product removed from solution successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to remove product from solution");
    },
  });
};

export const useRestoreSolutionProducts = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: restoreSolutionProducts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["solution-products"] });
      queryClient.invalidateQueries({
        queryKey: ["solution-products-infinite"],
      });
      queryClient.invalidateQueries({ queryKey: ["solutions"] });
      queryClient.invalidateQueries({ queryKey: ["solution"] });
      showSuccessToast("Solution product restored successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to restore solution product");
    },
  });
};

export const useForceDeleteSolutionProducts = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: forceDeleteSolutionProducts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["solution-products"] });
      queryClient.invalidateQueries({
        queryKey: ["solution-products-infinite"],
      });
      queryClient.invalidateQueries({ queryKey: ["solutions"] });
      queryClient.invalidateQueries({ queryKey: ["solution"] });
      showSuccessToast("Solution product permanently deleted");
    },
    onError: (error) => {
      showErrorToast(
        error.message || "Failed to permanently delete solution product",
      );
    },
  });
};
