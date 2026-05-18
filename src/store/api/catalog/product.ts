import { IPaginationCatalogProductParams } from "@/types/pagination";
import {
  appendIfExists,
  buildQueryParams,
  getToken,
  handleFetchError,
} from "@/utils/common";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ICatalogProduct,
  ICatalogProductDescription,
  ICatalogProductFeature,
  ICatalogProductKeyFeature,
  ICatalogProductSpecification,
  ICatalogProductUseCase,
} from "@/types/model";
import { ICatalogProductPaginatedResponse } from "@/types/pagination";
import { ImportResult } from "@/types/model";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API base URL is not defined");
}

export interface ICatalogProductPayload {
  catalog_id: string;
  name: string;
  short_description: string;
  start_price: number;
  end_price: number;
  currency: string;

  description?: ICatalogProductDescription;
  features?: ICatalogProductFeature[];
  key_features?: ICatalogProductKeyFeature[];
  specifications?: ICatalogProductSpecification[];
  use_cases?: ICatalogProductUseCase[];
}

export interface ICatalogProductFiles {
  image?: File;
  documents?: File[];
}

const fetchAllCatalogProducts = async ({
  query,
}: {
  query: {
    catalog_id: string;
    include_deleted: boolean;
  };
}): Promise<ICatalogProduct[]> => {
  const token = getToken();

  const qs = buildQueryParams(query);
  const url = `${API_BASE_URL}/catalog-products${qs ? `?${qs}` : ""}`;
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

const fetchCatalogProductById = async (
  id: string,
): Promise<ICatalogProduct> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/catalog-products/${id}`, {
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

const fetchCatalogProductPaginated = async (
  query: IPaginationCatalogProductParams,
): Promise<ICatalogProductPaginatedResponse> => {
  const token = getToken();

  const qs = buildQueryParams(query);
  const url = `${API_BASE_URL}/catalog-products/paginated${qs ? `?${qs}` : ""}`;

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

const createCatalogProduct = async (
  payload: ICatalogProductPayload,
  files?: ICatalogProductFiles,
): Promise<ICatalogProduct> => {
  const token = getToken();
  const formData = new FormData();

  appendIfExists(formData, "catalog_id", payload.catalog_id);
  appendIfExists(formData, "name", payload.name);
  appendIfExists(formData, "short_description", payload.short_description);

  appendIfExists(formData, "currency", payload.currency);
  appendIfExists(formData, "start_price", payload.start_price);
  appendIfExists(formData, "end_price", payload.end_price);

  appendIfExists(formData, "description", payload.description);
  appendIfExists(formData, "features", payload.features);
  appendIfExists(formData, "key_features", payload.key_features);
  appendIfExists(formData, "specifications", payload.specifications);
  appendIfExists(formData, "use_cases", payload.use_cases);

  if (files?.image) {
    formData.append("image", files.image);
  }

  if (files?.documents && files.documents.length > 0) {
    files.documents.forEach((file) => {
      formData.append("documents", file);
    });
  }

  const response = await fetch(`${API_BASE_URL}/catalog-products`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) await handleFetchError(response);

  const data = await response.json();
  if (!data?.data) throw new Error("Invalid response structure");

  return data.data;
};

const updateCatalogProduct = async (
  id: string,
  payload: Partial<ICatalogProductPayload>,
  files?: ICatalogProductFiles,
): Promise<ICatalogProduct> => {
  const token = getToken();
  const formData = new FormData();

  appendIfExists(formData, "name", payload.name);
  appendIfExists(formData, "short_description", payload.short_description);

  appendIfExists(formData, "currency", payload.currency);
  appendIfExists(formData, "start_price", payload.start_price);
  appendIfExists(formData, "end_price", payload.end_price);

  appendIfExists(formData, "description", payload.description);
  appendIfExists(formData, "features", payload.features);
  appendIfExists(formData, "key_features", payload.key_features);
  appendIfExists(formData, "specifications", payload.specifications);
  appendIfExists(formData, "use_cases", payload.use_cases);

  if (files?.image) {
    formData.append("image", files.image);
  }

  if (files?.documents && files.documents.length > 0) {
    files.documents.forEach((file) => {
      formData.append("documents", file);
    });
  }

  const response = await fetch(`${API_BASE_URL}/catalog-products/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) await handleFetchError(response);

  const data = await response.json();
  if (!data?.data) throw new Error("Invalid response structure");

  return data.data;
};
const softDeleteCatalogProducts = async (ids: string[]): Promise<void> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/catalog-products/soft-delete`, {
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

const restoreCatalogProducts = async (ids: string[]): Promise<void> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/catalog-products/restore`, {
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

const forceDeleteCatalogProducts = async (ids: string[]): Promise<void> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/catalog-products/hard-delete`, {
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

const deleteProductDocument = async (
  productID: string,
  documentID: string,
): Promise<void> => {
  const token = getToken();
  const response = await fetch(
    `${API_BASE_URL}/catalog-products/${productID}/documents/${documentID}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    await handleFetchError(response);
  }
};

export const useAllCatalogProducts = ({
  params,
  enabled,
}: {
  params: {
    catalog_id: string;
    include_deleted: boolean;
  };
  enabled: boolean;
}) => {
  return useQuery<ICatalogProduct[], Error>({
    queryKey: ["catalog-products", params],
    queryFn: () => fetchAllCatalogProducts({ query: params }),
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && enabled,
  });
};

export const useCatalogProductById = ({
  id,
  enabled,
}: {
  id: string;
  enabled?: boolean;
}) => {
  return useQuery<ICatalogProduct, Error>({
    queryKey: ["catalog-product", id],
    queryFn: () => fetchCatalogProductById(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && enabled,
  });
};

export const usePaginatedCatalogProducts = ({
  params,
  enabled,
}: {
  params: IPaginationCatalogProductParams;
  enabled: boolean;
}) => {
  return useQuery<ICatalogProductPaginatedResponse, Error>({
    queryKey: ["catalog-products", params],
    queryFn: ({ queryKey }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_key, queryParams] = queryKey as [
        string,
        IPaginationCatalogProductParams,
      ];
      return fetchCatalogProductPaginated(queryParams);
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken() && enabled,
  });
};

export const useCreateCatalogProduct = () => {
  const queryCatalogProduct = useQueryClient();

  return useMutation<
    ICatalogProduct,
    Error,
    {
      catalogProduct: ICatalogProductPayload;
      files?: ICatalogProductFiles;
    }
  >({
    mutationFn: ({ catalogProduct, files }) =>
      createCatalogProduct(catalogProduct, files),

    onSuccess: () => {
      queryCatalogProduct.invalidateQueries({ queryKey: ["catalog-products"] });
      showSuccessToast("Catalog product created successfully");
    },

    onError: (error) => {
      showErrorToast(error.message || "Failed to create catalog product");
    },
  });
};

export const useUpdateCatalogProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ICatalogProduct,
    Error,
    {
      id: string;
      payload: Partial<ICatalogProductPayload>;
      files?: ICatalogProductFiles;
    }
  >({
    mutationFn: ({ id, payload, files }) =>
      updateCatalogProduct(id, payload, files),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["catalog-products"] });
      queryClient.invalidateQueries({
        queryKey: ["catalog-product", variables.id],
      });
      showSuccessToast("Catalog product updated successfully");
    },

    onError: (error) => {
      showErrorToast(error.message || "Failed to update catalog product");
    },
  });
};

export const useSoftDeleteCatalogProducts = () => {
  const queryCatalogProduct = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: softDeleteCatalogProducts,
    onSuccess: () => {
      queryCatalogProduct.invalidateQueries({ queryKey: ["catalog-products"] });
      showSuccessToast("Catalog products deleted successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to delete catalogProducts");
    },
  });
};

export const useRestoreCatalogProducts = () => {
  const queryCatalogProduct = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: restoreCatalogProducts,
    onSuccess: () => {
      queryCatalogProduct.invalidateQueries({ queryKey: ["catalog-products"] });
      showSuccessToast("Catalog products restored successfully");
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to restore catalogProducts");
    },
  });
};

export const useForceDeleteCatalogProducts = () => {
  const queryCatalogProduct = useQueryClient();
  return useMutation<void, Error, string[]>({
    mutationFn: forceDeleteCatalogProducts,
    onSuccess: () => {
      queryCatalogProduct.invalidateQueries({ queryKey: ["catalog-products"] });
      showSuccessToast("Catalog products permanently deleted");
    },
    onError: (error) => {
      showErrorToast(
        error.message || "Failed to permanently delete catalogProducts",
      );
    },
  });
};

export const useDeleteProductDocument = (productID: string) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (documentID: string) =>
      deleteProductDocument(productID, documentID),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["catalog-products"] });
      queryClient.invalidateQueries({
        queryKey: ["catalog-product", productID],
      });
      showSuccessToast("Document deleted successfully");
    },

    onError: (error) => {
      showErrorToast(error.message || "Failed to delete document");
    },
  });
};

// Export or Import
export const exportCatalogProductsToExcel = async (
  startDate: Date,
  endDate: Date,
): Promise<Blob> => {
  const token = getToken();
  const response = await fetch(
    `${API_BASE_URL}/catalog-products/export/excel`,
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

export const exportCatalogProductsToPDF = async (
  catalogProductIds: string[],
): Promise<Response> => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/catalog-products/export/pdf`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      catalogProduct_ids: catalogProductIds,
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
    `${API_BASE_URL}/catalog-products/import/template`,
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

export const importCatalogProductsFromExcel = async (
  file: File,
): Promise<ImportResult> => {
  const token = getToken();
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `${API_BASE_URL}/catalog-products/import/excel`,
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
      const blob = await exportCatalogProductsToExcel(startDate, endDate);
      const filename = `catalog_products_export_${startDate.toISOString().split("T")[0]}_to_${endDate.toISOString().split("T")[0]}.xlsx`;
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
  const handleExport = async (catalogProductIds: string[]) => {
    try {
      const response = await exportCatalogProductsToPDF(catalogProductIds);

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
          filename = `catalog_products_export_${timestamp}.zip`;
        } else {
          filename = `catalog_product_export_${timestamp}.pdf`;
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
      const filename = `catalog_product_import_template_${new Date().toISOString().split("T")[0]}.xlsx`;
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
  const queryCatalogProduct = useQueryClient();

  const handleImport = async (file: File): Promise<ImportResult> => {
    try {
      const result = await importCatalogProductsFromExcel(file);
      queryCatalogProduct.invalidateQueries({ queryKey: ["catalog-products"] });

      if (result.error_count === 0) {
        showSuccessToast(
          `Successfully imported ${result.success_count} catalogProducts`,
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
