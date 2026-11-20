import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  AssignTechnicianPayload,
  AssignTechnicianResponse,
} from "@/types";

export function assignTechnician(requestId: string, payload: AssignTechnicianPayload) {
  return apiClient<ApiResponse<AssignTechnicianResponse>>(
    `/assignment/assign-technician/${requestId}`,
    {
      method: "POST",
      body: payload,
    },
  );
}

// export function getMyAppointments(params: { page?: number; limit?: number }) {
//   return apiClient<ApiResponse<{ doctor: PublicDoctorProfile; status: string; id: string }[]>>("/appointment/my-appointments", {
//     params,
//   });
// }
