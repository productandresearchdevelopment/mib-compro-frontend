import { getToken, handleFetchError } from "@/utils/common";
import { useQuery } from "@tanstack/react-query";

export interface ITrendInfo {
  delta: number;
  label: string;
  is_up: boolean;
}

export interface IDashboardOverview {
  catalogs: number;
  solutions: number;
  products: number;
  catalog_trend: ITrendInfo;
  solution_trend: ITrendInfo;
  product_trend: ITrendInfo;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API base URL is not defined");
}

const fetchDashboardOverview = async (): Promise<IDashboardOverview> => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/dashboard/overview`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
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

export const useDashboardOverview = ({ enabled }: { enabled: boolean }) => {
  return useQuery<IDashboardOverview, Error>({
    queryKey: ["dashboard-overview"],
    queryFn: fetchDashboardOverview,
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && enabled,
  });
};
