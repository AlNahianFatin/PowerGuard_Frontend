import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  TechnicianParams,
  PublicTechnicianProfile,
  VerifyAccountPayload,
  TechnicianApplicationPayload,
  Technician,
  ApproveTechnicianPayload,
  TechnicianAnalyticsResponse,
} from "@/types";

export function applyAsTechnician(payload: TechnicianApplicationPayload) {
  const formData = new FormData();

  formData.append("data", JSON.stringify(payload.data));
  formData.append("resume", payload.resume);

  for (const file of payload.additionalFiles) {
    formData.append("additionalFiles", file);
  }

  return apiClient("/technician/apply-as-technician", {
    method: "POST",
    body: formData,
  });
}

export function verifyTechnicianAccount(payload: VerifyAccountPayload) {
  return apiClient("/technician/apply-as-technician/verify-email", {
    method: "POST",
    body: payload,
  });
}

export function getAllTechnicians(params: TechnicianParams) {
  return apiClient<ApiResponse<Technician[]>>("/technician/all-technicians", {
    params,
  });
}

export function approveTechnician(payload: ApproveTechnicianPayload) {
  return apiClient("/technician/approve-technician", {
    method: "POST",
    body: payload,
  });
}

// export function getAllPublicDoctors(params: PublicTechnicianParams) {
//   return apiClient<ApiResponse<PublicDoctorProfile[]>>(
//     "/doctor/public/all-doctors",
//     {
//       params,
//     },
//   );
// }

export function getPublicTechnicianProfile(technicianId: string) {
  return apiClient<ApiResponse<PublicTechnicianProfile>>(
    `/technician/public/${technicianId}`,
  );
}

// export function getTodayScheduleByDoctor(params: {
//   doctorId?: string;
//   page?: number;
//   limit?: number;
// }) {
//   return apiClient<ApiResponse<Schedule[]>>("/schedule/todays-schedule", {
//     params,
//   });
// }

export function getTechnicianAnalytics() {
  return apiClient<ApiResponse<TechnicianAnalyticsResponse>>("/analytics/technician-analytics");
}

export function getAvailableTechnicianToday() {
  return apiClient<ApiResponse<Technician[]>>(
    `/technician/available-today`,
  );
}