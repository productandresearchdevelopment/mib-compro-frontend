import { IPaginationParams } from "@/types/pagination";
import { buildQueryParams, getToken, handleFetchError } from "@/utils/common";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IModuleTypePaginatedResponse } from "@/types/pagination";
import { IModuleType, ImportResult } from "@/types/model";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API base URL is not defined");
}

const fetchAllModuleType = async (): Promise<IModuleType[]> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/module-types`, {
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

const fetchModuleTypeById = async (id: string): Promise<IModuleType> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/module-types/${id}`, {
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

const fetchModuleTypePaginated = async (
  query: IPaginationParams,
): Promise<IModuleTypePaginatedResponse> => {
  const token = getToken();

  const qs = buildQueryParams(query);
  const url = `${API_BASE_URL}/module-types/paginated${qs ? `?${qs}` : ""}`;

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

const createModuleType = async (
  moduleType: Omit<IModuleType, "id">,
): Promise<IModuleType> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/module-types`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(moduleType),
  });

  if (!response.ok) {
    await handleFetchError(response);
  }

  return response.json();
};

const updateModuleType = async (
  moduleType: IModuleType,
): Promise<IModuleType> => {
  const token = getToken();
  const response = await fetch(
    `${API_BASE_URL}/module-types/${moduleType.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(moduleType),
    },
  );

  if (!response.ok) {
    await handleFetchError(response);
  }

  return response.json();
};

const softDeleteModuleType = async (ids: string[]): Promise<void> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/module-types/soft-delete`, {
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

const restoreModuleType = async (ids: string[]): Promise<void> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/module-types/restore`, {
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

const forceDeleteModuleType = async (ids: string[]): Promise<void> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/module-types/hard-delete`, {
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

// ==================== EXPORT / IMPORT (EXACT PATTERN FROM QUOTATION) ====================

export const exportModuleTypesToExcel = async (
  startDate: Date,
  endDate: Date,
): Promise<Blob> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/module-types/export/excel`, {
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

export const exportModuleTypesToPDF = async (
  moduleTypeIds: string[],
): Promise<Response> => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/module-types/export/pdf`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      module_type_ids: moduleTypeIds,
    }),
  });

  if (!response.ok) {
    await handleFetchError(response);
  }

  return response;
};

export const downloadImportTemplate = async (): Promise<Blob> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/module-types/import/template`, {
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

export const importModuleTypesFromExcel = async (
  file: File,
): Promise<ImportResult> => {
  const token = getToken();
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/module-types/import/excel`, {
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

export const useAllModuleType = () => {
  return useQuery<IModuleType[], Error>({
    queryKey: ["module-type"],
    queryFn: fetchAllModuleType,
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken(),
  });
};

export const useModuleTypeById = (id: string) => {
  return useQuery<IModuleType, Error>({
    queryKey: ["module-type", id],
    queryFn: () => fetchModuleTypeById(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken(),
  });
};

export const usePaginatedModuleType = ({
  params,
  enabled,
}: {
  params: IPaginationParams;
  enabled: boolean;
}) => {
  return useQuery<IModuleTypePaginatedResponse, Error>({
    queryKey: ["module-type", params],
    queryFn: ({ queryKey }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_key, queryParams] = queryKey as [string, IPaginationParams];
      return fetchModuleTypePaginated(queryParams);
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && enabled,
  });
};

export const useCreateModuleType = () => {
  const queryModuleType = useQueryClient();
  return useMutation<IModuleType, Error, Omit<IModuleType, "id">>({
    mutationFn: createModuleType,
    onSuccess: () => {
      queryModuleType.invalidateQueries({ queryKey: ["module-type"] });
      showSuccessToast("ModuleType created successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to create target-sale");
    },
  });
};

export const useUpdateModuleType = () => {
  const queryModuleType = useQueryClient();
  return useMutation<IModuleType, Error, IModuleType>({
    mutationFn: updateModuleType,
    onSuccess: () => {
      queryModuleType.invalidateQueries({ queryKey: ["module-type"] });
      queryModuleType.invalidateQueries({ queryKey: ["module-type"] });
      showSuccessToast("ModuleType updated successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to update target-sale");
    },
  });
};

export const useSoftDeleteModuleType = () => {
  const queryModuleType = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: softDeleteModuleType,
    onSuccess: () => {
      queryModuleType.invalidateQueries({ queryKey: ["module-type"] });
      showSuccessToast("ModuleType deleted successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to delete module-type");
    },
  });
};

export const useRestoreModuleType = () => {
  const queryModuleType = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: restoreModuleType,
    onSuccess: () => {
      queryModuleType.invalidateQueries({ queryKey: ["module-type"] });
      showSuccessToast("ModuleType restored successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to restore module-type");
    },
  });
};

export const useForceDeleteModuleType = () => {
  const queryModuleType = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: forceDeleteModuleType,
    onSuccess: () => {
      queryModuleType.invalidateQueries({ queryKey: ["module-type"] });
      showSuccessToast("ModuleType permanently deleted");
    },
    onError: (error) => {
      showErrorToast(
        error.message || "Failed to permanently delete module-type",
      );
    },
  });
};

// ==================== CUSTOM HOOKS (EXACT PATTERN FROM QUOTATION) ====================

export const useExportExcel = () => {
  const handleExport = async (startDate: Date, endDate: Date) => {
    try {
      const blob = await exportModuleTypesToExcel(startDate, endDate);
      const filename = `module_types_export_${startDate.toISOString().split("T")[0]}_to_${endDate.toISOString().split("T")[0]}.xlsx`;
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
  const handleExport = async (moduleTypeIds: string[]) => {
    try {
      const response = await exportModuleTypesToPDF(moduleTypeIds);

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
          filename = `module_types_export_${timestamp}.zip`;
        } else {
          filename = `module_type_export_${timestamp}.pdf`;
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
      const filename = `module_type_import_template_${new Date().toISOString().split("T")[0]}.xlsx`;
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
  const queryClient = useQueryClient();

  const handleImport = async (file: File): Promise<ImportResult> => {
    try {
      const result = await importModuleTypesFromExcel(file);
      queryClient.invalidateQueries({ queryKey: ["module-type"] });

      if (result.error_count === 0) {
        showSuccessToast(
          `Successfully imported ${result.success_count} module types`,
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
