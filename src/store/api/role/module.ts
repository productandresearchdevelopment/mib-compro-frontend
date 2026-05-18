import { IRoleModule } from "@/types/model";
import { getToken, handleFetchError } from "@/utils/common";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ImportResult } from "@/types/model";

type RoleModulePermissionMap = Record<string, boolean>;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API base URL is not defined");
}
const fetchRoleModules = async (role_id: string): Promise<IRoleModule[]> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/roles/${role_id}/modules`, {
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

const fetchRoleModuleMenus = async (
  role_id: string,
): Promise<IRoleModule[]> => {
  const token = getToken();
  const response = await fetch(
    `${API_BASE_URL}/roles/${role_id}/modules/menu`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

const checkRoleModulesBatch = async (
  role_id: string,
  modules: string[],
): Promise<RoleModulePermissionMap> => {
  const token = getToken();

  const response = await fetch(
    `${API_BASE_URL}/roles/${role_id}/modules/check`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ modules }),
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

const updatePermissions = async (
  role_id: string,
  module_id: number,
  checked: boolean,
): Promise<IRoleModule[]> => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/roles/${role_id}/modules`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ module_id, checked }),
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

const updateMultiplePermissions = async (
  role_id: string,
  permissions: { module_id: number; checked: boolean }[],
): Promise<IRoleModule[]> => {
  const token = getToken();
  const response = await fetch(
    `${API_BASE_URL}/roles/${role_id}/modules/batch`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ permissions }),
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

export const exportPermissionsToExcel = async (
  roleId: string,
  startDate: Date,
  endDate: Date,
): Promise<Blob> => {
  const token = getToken();
  const response = await fetch(
    `${API_BASE_URL}/roles/${roleId}/modules/export/excel`,
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

export const exportPermissionsToPDF = async (
  roleId: string,
): Promise<Response> => {
  const token = getToken();

  const response = await fetch(
    `${API_BASE_URL}/roles/${roleId}/modules/export/pdf`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    await handleFetchError(response);
  }

  return response;
};

// ==================== IMPORT FUNCTIONS ====================

export const downloadImportTemplate = async (): Promise<Blob> => {
  const token = getToken();
  const response = await fetch(
    `${API_BASE_URL}/roles/modules/import/template`,
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

export const importPermissionsFromExcel = async (
  roleId: string,
  file: File,
): Promise<ImportResult> => {
  const token = getToken();
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `${API_BASE_URL}/roles/${roleId}/modules/import/excel`,
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

// ==================== UTILITY FUNCTION ====================

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

// ==================== EXISTING QUERY HOOKS ====================

export const useFetchRoleModules = (role_id: string) => {
  return useQuery<IRoleModule[], Error>({
    queryKey: ["role-modules", role_id],
    queryFn: () => fetchRoleModules(role_id),
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && !!role_id,
  });
};

export const useFetchRoleModuleMenus = (role_id: string) => {
  return useQuery<IRoleModule[], Error>({
    queryKey: ["role-module-menus", role_id],
    queryFn: () => fetchRoleModuleMenus(role_id),
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && !!role_id,
  });
};

export const useCheckRoleModules = (roleId: string, modules: string[]) => {
  return useQuery<RoleModulePermissionMap, Error>({
    queryKey: ["role-module-check-batch", roleId, modules],
    queryFn: () => checkRoleModulesBatch(roleId, modules),
    enabled: !!roleId && modules.length > 0,
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdatePermissions = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IRoleModule[],
    Error,
    { role_id: string; module_id: number; checked: boolean }
  >({
    mutationFn: ({ role_id, module_id, checked }) =>
      updatePermissions(role_id, module_id, checked),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["role-modules"] });
      queryClient.invalidateQueries({ queryKey: ["role-module-menus"] });
      showSuccessToast("Permissions updated successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to update permissions");
    },
  });
};

export const useUpdateMultiplePermissions = () => {
  const queryClient = useQueryClient();

  return useMutation<
    IRoleModule[],
    Error,
    { role_id: string; modules: { module_id: number; checked: boolean }[] }
  >({
    mutationFn: ({ role_id, modules }) =>
      updateMultiplePermissions(role_id, modules),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["role-modules"] });
      queryClient.invalidateQueries({ queryKey: ["role-module-menus"] });
      showSuccessToast("Permissions updated successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to update permissions");
    },
  });
};

// ==================== EXPORT/IMPORT CUSTOM HOOKS ====================

export const useExportExcel = () => {
  const handleExport = async (
    roleId: string,
    roleName: string,
    startDate: Date,
    endDate: Date,
  ) => {
    try {
      const blob = await exportPermissionsToExcel(roleId, startDate, endDate);
      const filename = `${roleName}_permissions_export_${startDate.toISOString().split("T")[0]}_to_${endDate.toISOString().split("T")[0]}.xlsx`;
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
  const handleExport = async (roleId: string, roleName: string) => {
    try {
      const response = await exportPermissionsToPDF(roleId);

      // const contentType = response.headers.get("Content-Type") || "";
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

        filename = `${roleName}_permissions_export_${timestamp}.pdf`;
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
      const filename = `permission_import_template_${new Date().toISOString().split("T")[0]}.xlsx`;
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

  const handleImport = async (
    roleId: string,
    file: File,
  ): Promise<ImportResult> => {
    try {
      const result = await importPermissionsFromExcel(roleId, file);
      queryClient.invalidateQueries({ queryKey: ["role-modules", roleId] });
      queryClient.invalidateQueries({ queryKey: ["role-module-menus"] });

      if (result.error_count === 0) {
        showSuccessToast(
          `Successfully imported ${result.success_count} permissions`,
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
