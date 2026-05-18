import { IPaginationCatalogPrams } from "@/types/pagination";
import { buildQueryParams, getToken, handleFetchError } from "@/utils/common";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICatalog } from "@/types/model";
import { ICatalogPaginatedResponse } from "@/types/pagination";
import { ImportResult } from "@/types/model";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API base URL is not defined");
}

const fetchAllCatalogs = async ({
  query,
}: {
  query: {
    include_deleted: boolean;
  };
}): Promise<ICatalog[]> => {
  const token = getToken();

  const qs = buildQueryParams(query);
  const url = `${API_BASE_URL}/catalogs${qs ? `?${qs}` : ""}`;
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

const fetchCatalogById = async (id: string): Promise<ICatalog> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/catalogs/${id}`, {
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

const fetchCatalogPaginated = async (
  query: IPaginationCatalogPrams,
): Promise<ICatalogPaginatedResponse> => {
  const token = getToken();

  const qs = buildQueryParams(query);
  const url = `${API_BASE_URL}/catalogs/paginated${qs ? `?${qs}` : ""}`;

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

const createCatalog = async (
  catalog: Omit<ICatalog, "id">,
  logo?: File,
): Promise<ICatalog> => {
  const token = getToken();
  const formData = new FormData();

  Object.entries(catalog).forEach(([key, value]) => {
    if (key === "npwp") {
      formData.append(key, JSON.stringify(value));
    } else if (value !== undefined && value !== null) {
      formData.append(key, value as string);
    }
  });

  if (logo) {
    formData.append("logo", logo);
  }

  const response = await fetch(`${API_BASE_URL}/catalogs`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
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

const updateCatalog = async (
  catalog: ICatalog,
  logo?: File,
): Promise<ICatalog> => {
  const token = getToken();
  const formData = new FormData();

  Object.entries(catalog).forEach(([key, value]) => {
    if (key === "npwp") {
      formData.append(key, JSON.stringify(value));
    } else if (value !== undefined && value !== null) {
      formData.append(key, value as string);
    }
  });

  if (logo) {
    formData.append("logo", logo);
  }

  const response = await fetch(`${API_BASE_URL}/catalogs/${catalog.id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
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

const softDeleteCatalogs = async (ids: string[]): Promise<void> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/catalogs/soft-delete`, {
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

const restoreCatalogs = async (ids: string[]): Promise<void> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/catalogs/restore`, {
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

const forceDeleteCatalogs = async (ids: string[]): Promise<void> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/catalogs/hard-delete`, {
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

export const useAllCatalogs = ({
  params,
  enabled,
}: {
  params: {
    include_deleted: boolean;
  };
  enabled: boolean;
}) => {
  return useQuery<ICatalog[], Error>({
    queryKey: ["catalogs", params],
    queryFn: () => fetchAllCatalogs({ query: params }),
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && enabled,
  });
};

export const useCatalogById = ({
  id,
  enabled,
}: {
  id: string;
  enabled?: boolean;
}) => {
  return useQuery<ICatalog, Error>({
    queryKey: ["catalog", id],
    queryFn: () => fetchCatalogById(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && enabled,
  });
};

export const usePaginatedCatalogs = ({
  params,
  enabled,
}: {
  params: IPaginationCatalogPrams;
  enabled: boolean;
}) => {
  return useQuery<ICatalogPaginatedResponse, Error>({
    queryKey: ["catalogs", params],
    queryFn: ({ queryKey }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_key, queryParams] = queryKey as [string, IPaginationCatalogPrams];
      return fetchCatalogPaginated(queryParams);
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && enabled,
  });
};

export const useCreateCatalog = () => {
  const queryCatalog = useQueryClient();
  return useMutation<
    ICatalog,
    Error,
    { catalog: Omit<ICatalog, "id">; logo?: File }
  >({
    mutationFn: ({ catalog, logo }) => createCatalog(catalog, logo),
    onSuccess: () => {
      queryCatalog.invalidateQueries({ queryKey: ["catalogs"] });
      showSuccessToast("Catalog created successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to create catalog");
    },
  });
};

export const useUpdateCatalog = () => {
  const queryCatalog = useQueryClient();
  return useMutation<ICatalog, Error, { catalog: ICatalog; logo?: File }>({
    mutationFn: ({ catalog, logo }) => updateCatalog(catalog, logo),
    onSuccess: () => {
      queryCatalog.invalidateQueries({ queryKey: ["catalogs"] });
      queryCatalog.invalidateQueries({ queryKey: ["catalog"] });
      showSuccessToast("Catalog updated successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to update catalog");
    },
  });
};

export const useSoftDeleteCatalogs = () => {
  const queryCatalog = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: softDeleteCatalogs,
    onSuccess: () => {
      queryCatalog.invalidateQueries({ queryKey: ["catalogs"] });
      showSuccessToast("Catalogs deleted successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to delete catalogs");
    },
  });
};

export const useRestoreCatalogs = () => {
  const queryCatalog = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: restoreCatalogs,
    onSuccess: () => {
      queryCatalog.invalidateQueries({ queryKey: ["catalogs"] });
      showSuccessToast("Catalogs restored successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to restore catalogs");
    },
  });
};

export const useForceDeleteCatalogs = () => {
  const queryCatalog = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: forceDeleteCatalogs,
    onSuccess: () => {
      queryCatalog.invalidateQueries({ queryKey: ["catalogs"] });
      showSuccessToast("Catalogs permanently deleted");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to permanently delete catalogs");
    },
  });
};

// Export or Import
export const exportCatalogsToExcel = async (
  startDate: Date,
  endDate: Date,
): Promise<Blob> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/catalogs/export/excel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
    }),
  });

  if (!response.ok) {
    await handleFetchError(response);
  }

  return await response.blob();
};

export const exportCatalogsToPDF = async (
  catalogIds: string[],
): Promise<Response> => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/catalogs/export/pdf`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      catalog_ids: catalogIds,
    }),
  });

  if (!response.ok) {
    await handleFetchError(response);
  }

  return response;
};

export const downloadImportTemplate = async (): Promise<Blob> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/catalogs/import/template`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    await handleFetchError(response);
  }

  return await response.blob();
};

export const importCatalogsFromExcel = async (
  file: File,
): Promise<ImportResult> => {
  const token = getToken();
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/catalogs/import/excel`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
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
      const blob = await exportCatalogsToExcel(startDate, endDate);
      const filename = `catalogs_export_${startDate.toISOString().split("T")[0]}_to_${endDate.toISOString().split("T")[0]}.xlsx`;
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
  const handleExport = async (catalogIds: string[]) => {
    try {
      const response = await exportCatalogsToPDF(catalogIds);

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
          filename = `catalogs_export_${timestamp}.zip`;
        } else {
          filename = `catalog_export_${timestamp}.pdf`;
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
      const filename = `catalog_import_template_${new Date().toISOString().split("T")[0]}.xlsx`;
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
  const queryCatalog = useQueryClient();

  const handleImport = async (file: File): Promise<ImportResult> => {
    try {
      const result = await importCatalogsFromExcel(file);
      queryCatalog.invalidateQueries({ queryKey: ["catalogs"] });

      if (result.error_count === 0) {
        showSuccessToast(
          `Successfully imported ${result.success_count} catalogs`,
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
