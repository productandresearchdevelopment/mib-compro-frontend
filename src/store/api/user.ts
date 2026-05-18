import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { IUser } from "@/types/model";
import { buildQueryParams, getToken, handleFetchError } from "@/utils/common";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import {
  IPaginationUserParams,
  IUserPaginatedResponse,
} from "@/types/pagination";
import { ImportResult } from "@/types/model";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchAllUsers = async (): Promise<IUser[]> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/users`, {
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

export const fetchUserById = async (id: string): Promise<IUser> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
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

const fetchUserByRoleName = async ({
  roleName,
}: {
  roleName: string;
}): Promise<IUser[]> => {
  const token = getToken();

  const qs = buildQueryParams({});
  const url = `${API_BASE_URL}/users/role/${roleName}${qs ? `?${qs}` : ""}`;
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

const fetchUserPaginated = async (
  query: IPaginationUserParams,
): Promise<IUserPaginatedResponse> => {
  const token = getToken();

  const qs = buildQueryParams(query);
  const url = `${API_BASE_URL}/users/paginated${qs ? `?${qs}` : ""}`;

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

const fetchCountUsers = async (): Promise<number> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/users/count`, {
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

const createUser = async (user: IUser, avatar?: File): Promise<IUser> => {
  const token = getToken();
  const formData = new FormData();

  Object.entries(user).forEach(([key, value]) => {
    formData.append(key, value as string);
  });

  if (avatar) {
    formData.append("avatar", avatar);
  }

  const response = await fetch(`${API_BASE_URL}/users`, {
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

const updateUser = async (user: IUser, avatar?: File): Promise<IUser> => {
  const token = getToken();
  const formData = new FormData();

  Object.entries(user).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      formData.append(key, value as string);
    }
  });

  if (avatar) {
    formData.append("avatar", avatar);
  }

  const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
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

const updateLastModuleAccess = async ({
  module_id,
}: {
  module_id: number;
}): Promise<IUser> => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/users/last-module`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ module_id }),
  });

  if (!response.ok) await handleFetchError(response);
  const data = await response.json();
  return data.data;
};

const softDeleteUsers = async (ids: string[]): Promise<void> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/users/soft-delete`, {
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

const restoreUsers = async (ids: string[]): Promise<void> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/users/restore`, {
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

const forceDeleteUsers = async (ids: string[]): Promise<void> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/users/hard-delete`, {
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

const exportUsersToExcel = async (
  startDate: Date,
  endDate: Date,
  isArchived?: boolean,
): Promise<Blob> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/users/export/excel`, {
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

const exportUsersToPDF = async (userIds: string[]): Promise<Response> => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/users/export/pdf`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      user_ids: userIds,
    }),
  });

  if (!response.ok) {
    await handleFetchError(response);
  }

  return response;
};

const downloadImportTemplate = async (): Promise<Blob> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/users/import/template`, {
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

const importUsersFromExcel = async (file: File): Promise<ImportResult> => {
  const token = getToken();
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/users/import/excel`, {
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

export const useAllUsers = () => {
  return useQuery<IUser[], Error>({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken(),
  });
};

export const useUserById = ({
  id,
  enabled,
}: {
  id: string;
  enabled: boolean;
}) => {
  return useQuery<IUser, Error>({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && enabled,
  });
};

export const useUserByRoleName = ({
  roleName,
  enabled,
}: {
  roleName: string;
  enabled: boolean;
}) => {
  return useQuery<IUser[], Error>({
    queryKey: ["user", roleName],
    queryFn: () =>
      fetchUserByRoleName({
        roleName,
      }),
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && enabled,
  });
};

export const usePaginatedUsers = ({
  params,
  enabled,
}: {
  params: IPaginationUserParams;
  enabled: boolean;
}) => {
  return useQuery<IUserPaginatedResponse, Error>({
    queryKey: ["users", params],
    queryFn: ({ queryKey }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_key, queryParams] = queryKey as [string, IPaginationUserParams];
      return fetchUserPaginated(queryParams);
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && enabled,
  });
};

export const useCountUsers = () => {
  return useQuery<number, Error>({
    queryKey: ["users-count"],
    queryFn: fetchCountUsers,
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken(),
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<IUser, Error, { user: IUser; avatar?: File }>({
    mutationFn: ({ user, avatar }) => createUser(user, avatar),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      showSuccessToast("User created successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to create user");
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<IUser, Error, { user: IUser; avatar?: File }>({
    mutationFn: ({ user, avatar }) => updateUser(user, avatar),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      showSuccessToast("User updated successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to update user");
    },
  });
};

export const useUpdateLastModuleAccess = (): UseMutationResult<
  IUser,
  { message: string; success: boolean },
  { module_id: number }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateLastModuleAccess,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userMe"] });
    },
    onError: (error: { message: string; success: boolean }) =>
      showErrorToast(error.message || "Failed to update last module access"),
  });
};

export const useSoftDeleteUsers = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: softDeleteUsers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      showSuccessToast("Users deleted successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to delete users");
    },
  });
};

export const useRestoreUsers = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: restoreUsers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      showSuccessToast("Users restored successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to restore users");
    },
  });
};

export const useForceDeleteUsers = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: forceDeleteUsers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      showSuccessToast("Users permanently deleted successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to permanently delete users");
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
      const blob = await exportUsersToExcel(startDate, endDate, isArchived);
      const filename = `users_export_${startDate.toISOString().split("T")[0]}_to_${endDate.toISOString().split("T")[0]}.xlsx`;
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
  const handleExport = async (userIds: string[]) => {
    try {
      const response = await exportUsersToPDF(userIds);

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
          filename = `users_export_${timestamp}.zip`;
        } else {
          filename = `user_export_${timestamp}.pdf`;
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
      const filename = `user_import_template_${new Date().toISOString().split("T")[0]}.xlsx`;
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
      const result = await importUsersFromExcel(file);
      queryClient.invalidateQueries({ queryKey: ["users"] });

      if (result.error_count === 0) {
        showSuccessToast(`Successfully imported ${result.success_count} users`);
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
