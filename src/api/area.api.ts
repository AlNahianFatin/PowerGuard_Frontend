import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
} from "@/types";

// export function getAllAreas() {
//   return apiClient("/area/all-areas", { method: "POST", body: payload });
// }
export function getAllAreas() {
  // biome-ignore lint/suspicious/noExplicitAny: <f>
  return apiClient<ApiResponse<any>>("/area/all-areas");
}

// export function userForgotPassword(payload: ForgotPasswordPayload) {
//   return apiClient("/auth/forgot-password", { method: "POST", body: payload });
// }

// export function userResetPassword(payload: ResetPasswordPayload) {
//   return apiClient("/auth/reset-password", { method: "POST", body: payload });
// }

// export function userChangePassword(payload: ChangePasswordPayload) {
//   return apiClient("/auth/change-password", { method: "POST", body: payload });
// }

// export function verifyAccount(payload: VerifyAccountPayload) {
//   return apiClient("/auth/verify-email", { method: "POST", body: payload });
// }

// export function userRegistration(payload: RegistrationPayload) {
//   return apiClient("/auth/register", { method: "POST", body: payload });
// }

// export function userResendOtp(payload: ResendOtpPayload) {
//   return apiClient("/auth/resend-otp", { method: "POST", body: payload });
// }

// export function userLogout() {
//   return apiClient("/auth/logout", { method: "POST" });
// }

// export function getMe() {
//   return apiClient("/auth/me");
// }

// export function googleOAuth(payload: { idToken: string }) {
//   return apiClient("/auth/google", { method: "POST", body: payload });
// }
