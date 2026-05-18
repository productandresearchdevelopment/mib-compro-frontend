import { useCookies } from "@/hooks/useCookies";
import { IUser } from "@/types/model";
import { getToken, handleFetchError } from "@/utils/common";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type LoginResponse = {
  token: string;
  expires_in: number;
  user: IUser;
};

export type OTPResponse = {
  message: string;
  success: boolean;
  retry_count: number;
  remaining_retries: number;
};

export type VerifyEmailResponse = {
  message: string;
  success: boolean;
};

export type ResendVerificationEmailResponse = {
  message: string;
  success: boolean;
  retry_count: number;
  remaining_retries: number;
};

// =====================
// Request Variables
// =====================

export type LoginVariables = {
  identifier: string;
  password: string;
};

export type ForgotPasswordVariables = {
  email: string;
};

export type VerifyOTPVariables = {
  email: string;
  otp: string;
};

export type ResetPasswordVariables = {
  email: string;
  otp: string;
  new_password: string;
  confirm_password: string;
};

export type VerifyEmailVariables = {
  token: string;
};

export type ResendVerificationEmailVariables = {
  email: string;
};

export type UpdateMeVariables = {
  name?: string;
  phone?: string;
  address?: string;
  username?: string;
  email?: string;
};

export type ChangePasswordVariables = {
  old_password: string;
  new_password: string;
};

// ===== Helpers =====

const authFetch = async (url: string, options: RequestInit = {}) => {
  const token = getToken();
  if (!options.headers) options.headers = {};
  if (token)
    (options.headers as Record<string, string>).Authorization =
      `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}/auth${url}`, options);
  if (!response.ok) await handleFetchError(response);
  return response.json();
};

// ===== Queries =====

const fetchMe = async (): Promise<IUser> => {
  const data = await authFetch("/me");
  if (!data || !data.data) throw new Error("Invalid response structure");
  return data.data;
};

// ===== Mutations =====

const loginUser = async (variables: LoginVariables): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(variables),
  });
  if (!response.ok) await handleFetchError(response);
  const data = await response.json();
  if (!data || !data.data) throw new Error("Invalid response structure");
  return data.data;
};

const forgotPassword = async (
  variables: ForgotPasswordVariables,
): Promise<OTPResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(variables),
  });
  if (!response.ok) await handleFetchError(response);
  const data = await response.json();
  if (!data || !data.data) throw new Error("Invalid response structure");
  return data.data;
};

const verifyOTP = async (
  variables: VerifyOTPVariables,
): Promise<OTPResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(variables),
  });
  if (!response.ok) await handleFetchError(response);
  const data = await response.json();
  if (!data || !data.data) throw new Error("Invalid response structure");
  return data.data;
};

const resetPassword = async (
  variables: ResetPasswordVariables,
): Promise<OTPResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(variables),
  });
  if (!response.ok) await handleFetchError(response);
  const data = await response.json();
  return data;
};

const verifyEmail = async (
  variables: VerifyEmailVariables,
): Promise<VerifyEmailResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(variables),
  });
  if (!response.ok) await handleFetchError(response);
  const data = await response.json();
  return data;
};

const resendVerificationEmail = async (
  variables: ResendVerificationEmailVariables,
): Promise<ResendVerificationEmailResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/auth/resend-verification-email`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(variables),
    },
  );
  if (!response.ok) await handleFetchError(response);
  const data = await response.json();
  if (!data || !data.data) throw new Error("Invalid response structure");
  return data.data;
};

const updateMe = async (variables: UpdateMeVariables): Promise<IUser> => {
  const filtered = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(variables).filter(([_, v]) => v !== undefined && v !== null),
  );
  const data = await authFetch("/me", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filtered),
  });
  return data.data;
};

const changePassword = async (
  variables: ChangePasswordVariables,
): Promise<void> => {
  await authFetch("/change-password", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(variables),
  });
};

// ===== Hooks =====
export const useUserMe = () => {
  return useQuery<IUser, Error>({
    queryKey: ["userMe"],
    queryFn: fetchMe,
    staleTime: 1000 * 60 * 5,
    enabled: !!getToken(),
  });
};

export const useLogin = (): UseMutationResult<
  LoginResponse,
  { message: string; success: boolean },
  LoginVariables
> => {
  const queryClient = useQueryClient();
  const { set } = useCookies();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const expires = new Date(Date.now() + (data.expires_in ?? 86400) * 1000);

      set("token", data.token, {
        expires,
        path: "/",
      });

      queryClient.setQueryData(["userMe"], data.user);
      showSuccessToast("Login successful");
    },
    onError: (error: { message: string; success: boolean }) =>
      showErrorToast(error.message || "Login failed"),
  });
};

export const useForgotPassword = (): UseMutationResult<
  OTPResponse,
  { message: string; success: boolean },
  ForgotPasswordVariables
> =>
  useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => showSuccessToast(data.message),
    onError: (error: { message: string; success: boolean }) =>
      showErrorToast(error.message),
  });

export const useVerifyOTP = (): UseMutationResult<
  OTPResponse,
  { message: string; success: boolean },
  VerifyOTPVariables
> =>
  useMutation({
    mutationFn: verifyOTP,
    onSuccess: (data) => showSuccessToast(data.message),
    onError: (error: { message: string; success: boolean }) =>
      showErrorToast(error.message),
  });

export const useResetPassword = (): UseMutationResult<
  OTPResponse,
  { message: string; success: boolean },
  ResetPasswordVariables
> =>
  useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => showSuccessToast(data.message),
    onError: (error: { message: string; success: boolean }) =>
      showErrorToast(error.message),
  });

export const useVerifyEmail = (): UseMutationResult<
  VerifyEmailResponse,
  { message: string; success: boolean },
  VerifyEmailVariables
> =>
  useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data) => showSuccessToast(data.message),
    onError: (error: { message: string; success: boolean }) =>
      showErrorToast(error.message),
  });

export const useResendVerificationEmail = (): UseMutationResult<
  ResendVerificationEmailResponse,
  { message: string; success: boolean },
  ResendVerificationEmailVariables
> =>
  useMutation({
    mutationFn: resendVerificationEmail,
    onSuccess: (data) => showSuccessToast(data.message),
    onError: (error: { message: string; success: boolean }) =>
      showErrorToast(error.message),
  });

export const useUpdateMe = (): UseMutationResult<
  IUser,
  { message: string; success: boolean },
  UpdateMeVariables
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userMe"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      showSuccessToast("Profile updated successfully");
    },
    onError: (error: { message: string; success: boolean }) =>
      showErrorToast(error.message || "Failed to update profile"),
  });
};

export const useChangePassword = (): UseMutationResult<
  void,
  { message: string; success: boolean },
  ChangePasswordVariables
> =>
  useMutation({
    mutationFn: changePassword,
    onSuccess: () => showSuccessToast("Password changed successfully"),
    onError: (error: { message: string; success: boolean }) =>
      showErrorToast(error.message || "Failed to change password"),
  });
