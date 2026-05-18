import { IRole } from "@/types/model";
import { IPaginationParams } from "@/types/pagination";
import { buildQueryParams, getToken, handleFetchError } from "@/utils/common";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IRolePaginatedResponse } from "@/types/pagination";
import { ImportResult } from "@/types/model";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API base URL is not defined");
}

const fetchAllRoles = async ({
  params,
}: {
  params: { include_deleted: boolean };
}): Promise<IRole[]> => {
  const token = getToken();
  const qs = buildQueryParams(params);
  const url = `${API_BASE_URL}/roles${qs ? `?${qs}` : ""}`;

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

const fetchRoleById = async (id: string): Promise<IRole> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/roles/${id}`, {
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

const fetchRolePaginated = async (
  query: IPaginationParams,
): Promise<IRolePaginatedResponse> => {
  const token = getToken();

  const qs = buildQueryParams(query);
  const url = `${API_BASE_URL}/roles/paginated${qs ? `?${qs}` : ""}`;

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

const createRole = async (role: Omit<IRole, "id">): Promise<IRole> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/roles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(role),
  });

  if (!response.ok) {
    await handleFetchError(response);
  }

  return response.json();
};

const updateRole = async (role: IRole): Promise<IRole> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/roles/${role.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(role),
  });

  if (!response.ok) {
    await handleFetchError(response);
  }

  return response.json();
};

const softDeleteRoles = async (ids: string[]): Promise<void> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/roles/soft-delete`, {
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

const restoreRoles = async (ids: string[]): Promise<void> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/roles/restore`, {
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

const forceDeleteRoles = async (ids: string[]): Promise<void> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/roles/hard-delete`, {
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

// ─── Export / Import API functions ───────────────────────────────────────────

const exportRolesToExcel = async (
  startDate: Date,
  endDate: Date,
  isArchived?: boolean,
): Promise<Blob> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/roles/export/excel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      is_archived: isArchived,
    }),
  });

  if (!response.ok) {
    await handleFetchError(response);
  }

  return await response.blob();
};

const exportRolesToPDF = async (roleIds: string[]): Promise<Response> => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/roles/export/pdf`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      role_ids: roleIds,
    }),
  });

  if (!response.ok) {
    await handleFetchError(response);
  }

  return response;
};

const downloadImportTemplate = async (): Promise<Blob> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/roles/import/template`, {
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

const importRolesFromExcel = async (file: File): Promise<ImportResult> => {
  const token = getToken();
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/roles/import/excel`, {
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

// ─── React Query hooks ────────────────────────────────────────────────────────

export const useAllRoles = ({
  params,
  enabled,
}: {
  params: {
    include_deleted: boolean;
  };
  enabled: boolean;
}) => {
  return useQuery<IRole[], Error>({
    queryKey: ["roles", params],
    queryFn: () =>
      fetchAllRoles({
        params,
      }),
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && enabled,
  });
};

export const useRoleById = (id: string) => {
  return useQuery<IRole, Error>({
    queryKey: ["role", id],
    queryFn: () => fetchRoleById(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken(),
  });
};

export const usePaginatedRoles = ({
  params,
  enabled,
}: {
  params: IPaginationParams;
  enabled: boolean;
}) => {
  return useQuery<IRolePaginatedResponse, Error>({
    queryKey: ["roles", params],
    queryFn: ({ queryKey }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_key, queryParams] = queryKey as [string, IPaginationParams];
      return fetchRolePaginated(queryParams);
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && enabled,
  });
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  return useMutation<IRole, Error, Omit<IRole, "id">>({
    mutationFn: createRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      showSuccessToast("Role created successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to create role");
    },
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();
  return useMutation<IRole, Error, IRole>({
    mutationFn: updateRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({ queryKey: ["role"] });
      showSuccessToast("Role updated successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to update role");
    },
  });
};

export const useSoftDeleteRoles = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: softDeleteRoles,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      showSuccessToast("Roles deleted successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to delete roles");
    },
  });
};

export const useRestoreRoles = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: restoreRoles,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      showSuccessToast("Roles restored successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to restore roles");
    },
  });
};

export const useForceDeleteRoles = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: forceDeleteRoles,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      showSuccessToast("Roles permanently deleted");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to permanently delete roles");
    },
  });
};

export const useExportExcel = () => {
  const handleExport = async (
    startDate: Date,
    endDate: Date,
    isArchived?: boolean,
  ) => {
    try {
      const blob = await exportRolesToExcel(startDate, endDate, isArchived);
      const filename = `roles_export_${startDate.toISOString().split("T")[0]}_to_${endDate.toISOString().split("T")[0]}.xlsx`;
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
  const handleExport = async (roleIds: string[]) => {
    try {
      const response = await exportRolesToPDF(roleIds);

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
          filename = `roles_export_${timestamp}.zip`;
        } else {
          filename = `role_export_${timestamp}.pdf`;
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
      const filename = `role_import_template_${new Date().toISOString().split("T")[0]}.xlsx`;
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
      const result = await importRolesFromExcel(file);
      queryClient.invalidateQueries({ queryKey: ["roles"] });

      if (result.error_count === 0) {
        showSuccessToast(`Successfully imported ${result.success_count} roles`);
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
