import { IPaginationCatalogJourneyParams } from "@/types/pagination";
import { buildQueryParams, getToken, handleFetchError } from "@/utils/common";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICatalogJourney } from "@/types/model";
import { ICatalogJourneyPaginatedResponse } from "@/types/pagination";
import { ImportResult } from "@/types/model";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API base URL is not defined");
}

const fetchAllCatalogJourneys = async ({
  query,
}: {
  query: {
    catalog_id: string;
    include_deleted: boolean;
  };
}): Promise<ICatalogJourney[]> => {
  const token = getToken();

  const qs = buildQueryParams(query);
  const url = `${API_BASE_URL}/catalog-journeys${qs ? `?${qs}` : ""}`;
  const response = await fetch(url, {
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

const fetchCatalogJourneyById = async (
  id: string,
): Promise<ICatalogJourney> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/catalog-journeys/${id}`, {
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

const fetchCatalogJourneyPaginated = async (
  query: IPaginationCatalogJourneyParams,
): Promise<ICatalogJourneyPaginatedResponse> => {
  const token = getToken();

  const qs = buildQueryParams(query);
  const url = `${API_BASE_URL}/catalog-journeys/paginated${qs ? `?${qs}` : ""}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    await handleFetchError(response);
  }

  const data = await response.json();
  if (!data || !data.data) {
    throw new Error("Invalid response structure");
  }

  return data.data;
};

const createCatalogJourney = async (
  journey: Omit<ICatalogJourney, "id">,
): Promise<ICatalogJourney> => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/catalog-journeys`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(journey),
  });

  if (!response.ok) await handleFetchError(response);

  const data = await response.json();
  if (!data?.data) throw new Error("Invalid response structure");

  return data.data;
};

const updateCatalogJourney = async (
  journey: ICatalogJourney,
): Promise<ICatalogJourney> => {
  const token = getToken();

  const response = await fetch(
    `${API_BASE_URL}/catalog-journeys/${journey.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(journey),
    },
  );

  if (!response.ok) await handleFetchError(response);

  const data = await response.json();
  if (!data?.data) throw new Error("Invalid response structure");

  return data.data;
};

const softDeleteCatalogJourneys = async (ids: string[]): Promise<void> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/catalog-journeys/soft-delete`, {
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

const restoreCatalogJourneys = async (ids: string[]): Promise<void> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/catalog-journeys/restore`, {
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

const forceDeleteCatalogJourneys = async (ids: string[]): Promise<void> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/catalog-journeys/hard-delete`, {
    method: "DELETE",
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

export const useAllCatalogJourneys = ({
  params,
  enabled,
}: {
  params: {
    catalog_id: string;
    include_deleted: boolean;
  };
  enabled: boolean;
}) => {
  return useQuery<ICatalogJourney[], Error>({
    queryKey: ["catalog-journeys", params],
    queryFn: () => fetchAllCatalogJourneys({ query: params }),
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && enabled,
  });
};

export const useCatalogJourneyById = ({
  id,
  enabled,
}: {
  id: string;
  enabled?: boolean;
}) => {
  return useQuery<ICatalogJourney, Error>({
    queryKey: ["catalog-journey", id],
    queryFn: () => fetchCatalogJourneyById(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && enabled,
  });
};

export const usePaginatedCatalogJourneys = ({
  params,
  enabled,
}: {
  params: IPaginationCatalogJourneyParams;
  enabled: boolean;
}) => {
  return useQuery<ICatalogJourneyPaginatedResponse, Error>({
    queryKey: ["catalog-journeys", params],
    queryFn: ({ queryKey }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_key, queryParams] = queryKey as [
        string,
        IPaginationCatalogJourneyParams,
      ];
      return fetchCatalogJourneyPaginated(queryParams);
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && enabled,
  });
};

export const useCreateCatalogJourney = () => {
  const queryCatalogJourney = useQueryClient();
  return useMutation<ICatalogJourney, Error, ICatalogJourney>({
    mutationFn: createCatalogJourney,
    onSuccess: () => {
      queryCatalogJourney.invalidateQueries({ queryKey: ["catalog-journeys"] });
      showSuccessToast("Catalog journey created successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to create catalog journey");
    },
  });
};

export const useUpdateCatalogJourney = () => {
  const queryClient = useQueryClient();

  return useMutation<ICatalogJourney, Error, ICatalogJourney>({
    mutationFn: updateCatalogJourney,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["catalog-journeys"] });
      queryClient.invalidateQueries({
        queryKey: ["catalog-journey", variables.id],
      });
      showSuccessToast("Catalog journey updated successfully");
    },

    onError: (error) => {
      showErrorToast(error.message || "Failed to update catalog journey");
    },
  });
};

export const useSoftDeleteCatalogJourneys = () => {
  const queryCatalogJourney = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: softDeleteCatalogJourneys,
    onSuccess: () => {
      queryCatalogJourney.invalidateQueries({ queryKey: ["catalog-journeys"] });
      showSuccessToast("Catalog journeys deleted successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to delete catalogJourneys");
    },
  });
};

export const useRestoreCatalogJourneys = () => {
  const queryCatalogJourney = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: restoreCatalogJourneys,
    onSuccess: () => {
      queryCatalogJourney.invalidateQueries({ queryKey: ["catalog-journeys"] });
      showSuccessToast("Catalog journeys restored successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to restore catalogJourneys");
    },
  });
};

export const useForceDeleteCatalogJourneys = () => {
  const queryCatalogJourney = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: forceDeleteCatalogJourneys,
    onSuccess: () => {
      queryCatalogJourney.invalidateQueries({ queryKey: ["catalog-journeys"] });
      showSuccessToast("Catalog journeys permanently deleted");
    },
    onError: (error) => {
      showErrorToast(
        error.message || "Failed to permanently delete catalogJourneys",
      );
    },
  });
};

// Export or Import
export const exportCatalogJourneysToExcel = async (
  startDate: Date,
  endDate: Date,
): Promise<Blob> => {
  const token = getToken();
  const response = await fetch(
    `${API_BASE_URL}/catalog-journeys/export/excel`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
      }),
    },
  );

  if (!response.ok) {
    await handleFetchError(response);
  }

  return await response.blob();
};

export const exportCatalogJourneysToPDF = async (
  catalogJourneyIds: string[],
): Promise<Response> => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/catalog-journeys/export/pdf`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      catalogJourney_ids: catalogJourneyIds,
    }),
  });

  if (!response.ok) {
    await handleFetchError(response);
  }

  return response;
};

export const downloadImportTemplate = async (): Promise<Blob> => {
  const token = getToken();
  const response = await fetch(
    `${API_BASE_URL}/catalog-journeys/import/template`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    await handleFetchError(response);
  }

  return await response.blob();
};

export const importCatalogJourneysFromExcel = async (
  file: File,
): Promise<ImportResult> => {
  const token = getToken();
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `${API_BASE_URL}/catalog-journeys/import/excel`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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

export const triggerFileDownload = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const useExportExcel = () => {
  const handleExport = async (startDate: Date, endDate: Date) => {
    try {
      const blob = await exportCatalogJourneysToExcel(startDate, endDate);
      const filename = `catalog_journeys_export_${startDate.toISOString().split("T")[0]}_to_${endDate.toISOString().split("T")[0]}.xlsx`;
      triggerFileDownload(blob, filename);
      showSuccessToast("Export completed successfully");
    } catch (err) {
      const error = err as Error;
      showErrorToast(error.message || "Export failed");
      throw error;
    }
  };

  return { handleExport };
};

export const useExportPDF = () => {
  const handleExport = async (catalogJourneyIds: string[]) => {
    try {
      const response = await exportCatalogJourneysToPDF(catalogJourneyIds);

      const contentType = response.headers.get("Content-Type") || "";
      const disposition = response.headers.get("Content-Disposition") || "";

      const blob = await response.blob();

      let filename = "";
      const match = disposition.match(
        /filename[^;=\n]*=\s*["']?([^"';\n]+)["']?/i,
      );

      if (match && match[1]) {
        filename = match[1].trim();
      } else {
        const now = new Date();
        const timestamp = now
          .toISOString()
          .replace(/[-:]/g, "")
          .split(".")[0]
          .replace("T", "_");

        if (contentType.includes("zip")) {
          filename = `catalog_journeys_export_${timestamp}.zip`;
        } else {
          filename = `catalog_journey_export_${timestamp}.pdf`;
        }
      }

      triggerFileDownload(blob, filename);
      showSuccessToast("Export completed successfully");
    } catch (err) {
      const error = err as Error;
      showErrorToast(error.message || "PDF export failed");
      throw error;
    }
  };

  return { handleExport };
};

export const useDownloadTemplate = () => {
  const handleDownload = async () => {
    try {
      const blob = await downloadImportTemplate();
      const filename = `catalog_journey_import_template_${new Date().toISOString().split("T")[0]}.xlsx`;
      triggerFileDownload(blob, filename);
      showSuccessToast("Template downloaded successfully");
    } catch (err) {
      const error = err as Error;
      showErrorToast(error.message || "Failed to download template");
      throw error;
    }
  };

  return { handleDownload };
};

export const useImportExcel = () => {
  const queryCatalogJourney = useQueryClient();

  const handleImport = async (file: File): Promise<ImportResult> => {
    try {
      const result = await importCatalogJourneysFromExcel(file);
      queryCatalogJourney.invalidateQueries({ queryKey: ["catalog-journeys"] });

      if (result.error_count === 0) {
        showSuccessToast(
          `Successfully imported ${result.success_count} catalogJourneys`,
        );
      } else if (result.success_count > 0) {
        showSuccessToast(
          `Partially imported: ${result.success_count} succeeded, ${result.error_count} failed`,
        );
      } else {
        showErrorToast("Import failed. Please check the logs for details.");
      }

      return result;
    } catch (err) {
      const error = err as Error;
      showErrorToast(error.message || "Import failed");
      throw error;
    }
  };

  return { handleImport };
};
