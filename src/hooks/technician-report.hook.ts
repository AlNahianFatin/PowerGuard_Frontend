import {
  applyAsTechnician,
  approveTechnician,
  getAllTechnicians,
  getAvailableTechnicianToday,
  getPublicTechnicianProfile,
  getTechnicianAnalytics,
  submitTechnicianReport,
  updateTechnicianReport,
  verifyTechnicianAccount,
} from "@/api";
import type { SubmitTechnicianReportPayload, UpdateTechnicianReportPayload } from "@/types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

interface SubmitTechnicianReportVariables {
  assignmentId: string;
  payload: SubmitTechnicianReportPayload;
}

export function useSubmitTechnicianReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ assignmentId, payload }: SubmitTechnicianReportVariables) =>
      submitTechnicianReport(assignmentId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-requests"] });
      queryClient.invalidateQueries({ queryKey: ["my-service-requests"] });
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      queryClient.invalidateQueries({ queryKey: ["my-assignments"] });
    },
  });
}

interface UpdateTechnicianReportVariables {
  reportId: string;
  payload: UpdateTechnicianReportPayload;
}

export function useUpdateTechnicianReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reportId, payload }: UpdateTechnicianReportVariables) =>
      updateTechnicianReport(reportId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-requests"] });
      queryClient.invalidateQueries({ queryKey: ["my-service-requests"] });
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      queryClient.invalidateQueries({ queryKey: ["my-assignments"] });
    },
  });
}