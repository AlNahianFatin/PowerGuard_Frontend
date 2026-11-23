import { assignTechnician, getMyAssignment, updateAssignment, updateAssignmentStatus } from "@/api";
import type { AssignTechnicianPayload, MyAssignmentParams, UpdateAssignmentPayload, UpdateAssignmentStatusPayload } from "@/types";
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

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

export function useSuspenseGetMyAssignment(params: MyAssignmentParams) {
  return useSuspenseQuery({
    queryKey: ["my-assignments", params],
    queryFn: () => getMyAssignment(params),
  });
}

export function useGetMyAssignment(params: MyAssignmentParams) {
  return useQuery({
    queryKey: ["my-assignments", params],
    queryFn: () => getMyAssignment(params),
  });
}

interface UpdateAssignmentStatusVariables {
  assignmentId: string;
  payload: UpdateAssignmentStatusPayload;
}

export function useUpdateStatusTechnician() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ assignmentId, payload }: UpdateAssignmentStatusVariables) =>
      updateAssignmentStatus(assignmentId, payload),

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