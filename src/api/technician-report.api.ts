import apiClient from "@/lib/apiClient";
import type { ApiResponse, SubmitTechnicianReportPayload, SubmitTechnicianReportResponse, UpdateTechnicianReportPayload, UpdateTechnicianReportResponse } from "@/types";

export function submitTechnicianReport(assignmentId: string, payload: SubmitTechnicianReportPayload) {
    return apiClient<ApiResponse<SubmitTechnicianReportResponse>>(
        `/report/submit-report/${assignmentId}`,
        {
            method: "POST",
            body: payload,
        },
    );
}

export function updateTechnicianReport(reportId: string, payload: UpdateTechnicianReportPayload) {
    return apiClient<ApiResponse<UpdateTechnicianReportResponse>>(
        `/report/update-report/${reportId}`,
        {
            method: "PATCH",
            body: payload,
        },
    );
}