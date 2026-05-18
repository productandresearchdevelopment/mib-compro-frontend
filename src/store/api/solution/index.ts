import { buildQueryParams, getToken, handleFetchError } from "@/utils/common";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ISolution } from "@/types/model";
import {
  IPaginationParams,
  ISolutionPaginatedResponse,
} from "@/types/pagination";
import { ImportResult } from "@/types/model";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API base URL is not defined");
}

const fetchAllSolutions = async ({
  query,
}: {
  query: {
    include_deleted: boolean;
  };
}): Promise<ISolution[]> => {
  const token = getToken();

  const qs = buildQueryParams(query);
  const url = `${API_BASE_URL}/solutions${qs ? `?${qs}` : ""}`;
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

const fetchSolutionById = async (id: string): Promise<ISolution> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/solutions/${id}`, {
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

const fetchSolutionPaginated = async (
  query: IPaginationParams,
): Promise<ISolutionPaginatedResponse> => {
  const token = getToken();

  const qs = buildQueryParams(query);
  const url = `${API_BASE_URL}/solutions/paginated${qs ? `?${qs}` : ""}`;

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

const createSolution = async (
  solution: Omit<ISolution, "id">,
): Promise<ISolution> => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/solutions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(solution),
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

const updateSolution = async (solution: ISolution): Promise<ISolution> => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/solutions/${solution.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(solution),
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

const softDeleteSolutions = async (ids: string[]): Promise<void> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/solutions/soft-delete`, {
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

const restoreSolutions = async (ids: string[]): Promise<void> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/solutions/restore`, {
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

const forceDeleteSolutions = async (ids: string[]): Promise<void> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/solutions/hard-delete`, {
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

export const useAllSolutions = ({
  params,
  enabled,
}: {
  params: {
    include_deleted: boolean;
  };
  enabled: boolean;
}) => {
  return useQuery<ISolution[], Error>({
    queryKey: ["solutions", params],
    queryFn: () => fetchAllSolutions({ query: params }),
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && enabled,
  });
};

export const useSolutionById = ({
  id,
  enabled,
}: {
  id: string;
  enabled?: boolean;
}) => {
  return useQuery<ISolution, Error>({
    queryKey: ["solution", id],
    queryFn: () => fetchSolutionById(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && enabled,
  });
};

export const usePaginatedSolutions = ({
  params,
  enabled,
}: {
  params: IPaginationParams;
  enabled: boolean;
}) => {
  return useQuery<ISolutionPaginatedResponse, Error>({
    queryKey: ["solutions", params],
    queryFn: ({ queryKey }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_key, queryParams] = queryKey as [string, IPaginationParams];
      return fetchSolutionPaginated(queryParams);
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && enabled,
  });
};

export const useCreateSolution = () => {
  const querySolution = useQueryClient();
  return useMutation<ISolution, Error, { solution: Omit<ISolution, "id"> }>({
    mutationFn: ({ solution }) => createSolution(solution),
    onSuccess: () => {
      querySolution.invalidateQueries({ queryKey: ["solutions"] });
      showSuccessToast("Solution created successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to create solution");
    },
  });
};

export const useUpdateSolution = () => {
  const querySolution = useQueryClient();
  return useMutation<ISolution, Error, { solution: ISolution }>({
    mutationFn: ({ solution }) => updateSolution(solution),
    onSuccess: () => {
      querySolution.invalidateQueries({ queryKey: ["solutions"] });
      querySolution.invalidateQueries({ queryKey: ["solution"] });
      showSuccessToast("Solution updated successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to update solution");
    },
  });
};

export const useSoftDeleteSolutions = () => {
  const querySolution = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: softDeleteSolutions,
    onSuccess: () => {
      querySolution.invalidateQueries({ queryKey: ["solutions"] });
      showSuccessToast("Solutions deleted successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to delete solutions");
    },
  });
};

export const useRestoreSolutions = () => {
  const querySolution = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: restoreSolutions,
    onSuccess: () => {
      querySolution.invalidateQueries({ queryKey: ["solutions"] });
      showSuccessToast("Solutions restored successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to restore solutions");
    },
  });
};

export const useForceDeleteSolutions = () => {
  const querySolution = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: forceDeleteSolutions,
    onSuccess: () => {
      querySolution.invalidateQueries({ queryKey: ["solutions"] });
      showSuccessToast("Solutions permanently deleted");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to permanently delete solutions");
    },
  });
};

// ============================================================
// EXPORT
// ============================================================

export const exportSolutionsToExcel = async (
  startDate: Date,
  endDate: Date,
): Promise<Blob> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/solutions/export/excel`, {
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

export const exportSolutionsToPDF = async (
  solutionIds: string[],
): Promise<Response> => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/solutions/export/pdf`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      solution_ids: solutionIds,
    }),
  });

  if (!response.ok) {
    await handleFetchError(response);
  }

  return response;
};

// ============================================================
// IMPORT
// ============================================================

export const downloadSolutionImportTemplate = async (): Promise<Blob> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/solutions/import/template`, {
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

export const importSolutionsFromExcel = async (
  file: File,
): Promise<ImportResult> => {
  const token = getToken();
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/solutions/import/excel`, {
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

// ============================================================
// HELPERS
// ============================================================

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
      const blob = await exportSolutionsToExcel(startDate, endDate);
      const filename = `solutions_export_${startDate.toISOString().split("T")[0]}_to_${endDate.toISOString().split("T")[0]}.xlsx`;
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
  const handleExport = async (solutionIds: string[]) => {
    try {
      const response = await exportSolutionsToPDF(solutionIds);

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
          filename = `solutions_export_${timestamp}.zip`;
        } else {
          filename = `solution_export_${timestamp}.pdf`;
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
      const blob = await downloadSolutionImportTemplate();
      const filename = `solution_import_template_${new Date().toISOString().split("T")[0]}.xlsx`;
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
  const querySolution = useQueryClient();

  const handleImport = async (file: File): Promise<ImportResult> => {
    try {
      const result = await importSolutionsFromExcel(file);
      querySolution.invalidateQueries({ queryKey: ["solutions"] });

      if (result.error_count === 0) {
        showSuccessToast(
          `Successfully imported ${result.success_count} solutions`,
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
