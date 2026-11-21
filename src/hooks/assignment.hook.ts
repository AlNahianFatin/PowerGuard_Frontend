import { assignTechnician, updateAssignment } from "@/api";
import { AssignTechnicianPayload, UpdateAssignmentPayload } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface AssignTechnicianVariables {
  requestId: string;
  payload: AssignTechnicianPayload;
}

export function useAssignTechnician() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ requestId, payload }: AssignTechnicianVariables) =>
      assignTechnician(requestId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-requests"] });
      queryClient.invalidateQueries({ queryKey: ["my-service-requests"] });
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      queryClient.invalidateQueries({ queryKey: ["my-assignments"] });
      queryClient.invalidateQueries({ queryKey: ["technicians"] });
      queryClient.invalidateQueries({ queryKey: ["available-technicians"] });
    },
  });
}

interface UpdateAssignmentVariables {
  assignmentId: string;
  payload: UpdateAssignmentPayload;
}

export function useUpdateTechnician() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ assignmentId, payload }: UpdateAssignmentVariables) =>
      updateAssignment(assignmentId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-requests"] });
      queryClient.invalidateQueries({ queryKey: ["my-service-requests"] });
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      queryClient.invalidateQueries({ queryKey: ["my-assignments"] });
      queryClient.invalidateQueries({ queryKey: ["technicians"] });
      queryClient.invalidateQueries({ queryKey: ["available-technicians"] });
    },
  });
}

// export function useGetMyAppointments(params: {
//   page?: number;
//   limit?: number;
// }) {
//   return useQuery({
//     queryKey: ["appointments"],
//     queryFn: () => getMyAppointments(params),
//   });
// }
