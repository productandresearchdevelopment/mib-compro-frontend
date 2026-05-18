import { IModule } from "@/types/model";
import { getToken, handleFetchError } from "@/utils/common";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API base URL is not defined");
}

const fetchAllModules = async (): Promise<IModule[]> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/modules`, {
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

const fetchModuleById = async (id: string): Promise<IModule> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/modules/${id}`, {
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

const createModule = async (
  targetModule: Omit<IModule, "id">,
): Promise<IModule> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/modules`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(targetModule),
  });

  if (!response.ok) {
    await handleFetchError(response);
  }

  return response.json();
};

const updateModule = async (targetModule: IModule): Promise<IModule> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/modules/${targetModule.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(targetModule),
  });

  if (!response.ok) {
    await handleFetchError(response);
  }

  return response.json();
};

const softDeleteModules = async (ids: number[]): Promise<void> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/modules/soft-delete`, {
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

const restoreModules = async (ids: number[]): Promise<void> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/modules/restore`, {
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

const forceDeleteModules = async (ids: number[]): Promise<void> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/modules/hard-delete`, {
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

export const useAllModules = () => {
  return useQuery<IModule[], Error>({
    queryKey: ["modules"],
    queryFn: fetchAllModules,
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken(),
  });
};

export const useModuleById = (id: string) => {
  return useQuery<IModule, Error>({
    queryKey: ["module", id],
    queryFn: () => fetchModuleById(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken(),
  });
};

export const useCreateModule = () => {
  const queryModule = useQueryClient();
  return useMutation<IModule, Error, Omit<IModule, "id">>({
    mutationFn: createModule,
    onSuccess: () => {
      queryModule.invalidateQueries({ queryKey: ["modules"] });
      showSuccessToast("Module created successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to create module");
    },
  });
};

export const useUpdateModule = () => {
  const queryModule = useQueryClient();
  return useMutation<IModule, Error, IModule>({
    mutationFn: updateModule,
    onSuccess: () => {
      queryModule.invalidateQueries({ queryKey: ["modules"] });
      queryModule.invalidateQueries({ queryKey: ["module"] });
      showSuccessToast("Module updated successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to update module");
    },
  });
};

export const useSoftDeleteModules = () => {
  const queryModule = useQueryClient();
  return useMutation<void, Error, number[]>({
    mutationFn: softDeleteModules,
    onSuccess: () => {
      queryModule.invalidateQueries({ queryKey: ["modules"] });
      showSuccessToast("Modules deleted successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to delete modules");
    },
  });
};

export const useRestoreModules = () => {
  const queryModule = useQueryClient();
  return useMutation<void, Error, number[]>({
    mutationFn: restoreModules,
    onSuccess: () => {
      queryModule.invalidateQueries({ queryKey: ["modules"] });
      showSuccessToast("Modules restored successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to restore modules");
    },
  });
};

export const useForceDeleteModules = () => {
  const queryModule = useQueryClient();
  return useMutation<void, Error, number[]>({
    mutationFn: forceDeleteModules,
    onSuccess: () => {
      queryModule.invalidateQueries({ queryKey: ["modules"] });
      showSuccessToast("Modules permanently deleted");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to permanently delete modules");
    },
  });
};
