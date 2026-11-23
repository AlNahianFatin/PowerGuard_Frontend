import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  Assignment,
  AssignTechnicianPayload,
  AssignTechnicianResponse,
  MyAssignmentParams,
  UpdateAssignmentPayload,
  UpdateAssignmentResponse,
  UpdateAssignmentStatusPayload,
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

export function updateAssignment(assignmentId: string, payload: UpdateAssignmentPayload) {
  return apiClient<ApiResponse<UpdateAssignmentResponse>>(
    `/assignment/update-assignment/${assignmentId}`,
    {
      method: "PATCH",
      body: payload,
    },
  );
}

export function getMyAssignment(params: MyAssignmentParams) {
  return apiClient<ApiResponse<Assignment[]>>(
    `/assignment/my-assignments`,
    {
      params
    },
  );
}

export function updateAssignmentStatus(assignmentId: string, payload: UpdateAssignmentStatusPayload) {
  // biome-ignore lint/suspicious/noExplicitAny: <sd>
  return apiClient<ApiResponse<any>>(
    `/assignment/update-assignment-status-technician/${assignmentId}`,
    {
      method: "PATCH",
      body: payload,
    },
  );
}

// export function getMyAppointments(params: { page?: number; limit?: number }) {
//   return apiClient<ApiResponse<{ doctor: PublicDoctorProfile; status: string; id: string }[]>>("/appointment/my-appointments", {
//     params,
//   });
// }
