import apiClient from "@/lib/apiClient";
import type { ApiResponse, CancelRequestParams, ServiceRequest, ServiceRequestParams, SubmitRequestPayload } from "@/types";

export function submitRequest(payload: SubmitRequestPayload) {
  return apiClient("/request/submit-request", {
    method: "POST",
    body: payload,
  });
}

// export function verifyTechnicianAccount(payload: VerifyAccountPayload) {
//   return apiClient("/technician/apply-as-technician/verify-email", {
//     method: "POST",
//     body: payload,
//   });
// }

export function getMyServiceRequests(params: ServiceRequestParams) {
  return apiClient<ApiResponse<ServiceRequest[]>>("/request/my-requests", {
    params,
  });
}

export function cancelRequest({ requestId }: CancelRequestParams) {
  return apiClient(`/request/cancel-request/${requestId}`, {
    method: "PATCH",
  });
}

// export function approveTechnician(payload: ApproveTechnicianPayload) {
//   return apiClient("/technician/approve-technician", {
//     method: "POST",
//     body: payload,
//   });
// }

// // export function getAllPublicDoctors(params: PublicTechnicianParams) {
// //   return apiClient<ApiResponse<PublicDoctorProfile[]>>(
// //     "/doctor/public/all-doctors",
// //     {
// //       params,
// //     },
// //   );
// // }

// export function getPublicTechnicianProfile(technicianId: string) {
//   return apiClient<ApiResponse<PublicTechnicianProfile>>(
//     `/technician/public/${technicianId}`,
//   );
// }

// // export function getTodayScheduleByDoctor(params: {
// //   doctorId?: string;
// //   page?: number;
// //   limit?: number;
// // }) {
// //   return apiClient<ApiResponse<Schedule[]>>("/schedule/todays-schedule", {
// //     params,
// //   });
// // }

// export function getTechnicianAnalytics() {
//   return apiClient<ApiResponse<TechnicianAnalyticsResponse>>("/analytics/technician-analytics");
// }