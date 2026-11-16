import { submitRequest } from "@/api/submit-request.api";
import { useMutation } from "@tanstack/react-query";

export function useSubmitRequest() {
    return useMutation({
        mutationFn: submitRequest,
    });
}