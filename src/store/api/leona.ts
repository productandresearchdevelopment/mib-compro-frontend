import { getToken, handleFetchError } from "@/utils/common";

export interface ILeonaChatRequest {
  session_id: string;
  message: string;
}

export interface ILeonaChatResponse {
  output: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API base URL is not defined");
}

export const chatWithLeona = async (
  payload: ILeonaChatRequest,
): Promise<ILeonaChatResponse> => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/leona/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
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
