// import {
//   applyAsTechnician,
//   approveTechnician,
//   getAllTechnicians,
//   getPublicTechnicianProfile,
//   verifyTechnicianAccount,
// } from "@/api";
import { getAdminAnalytics } from "@/api/admin.api";
import { getCustomerAnalytics } from "@/api/customer.api";
// import type { TechnicianParams } from "@/types";
import {
  // useMutation,
  useQuery,
  // useQueryClient,
  // useSuspenseQuery,
} from "@tanstack/react-query";

// export function useApplyAsTechnician() {
//   return useMutation({
//     mutationFn: applyAsTechnician,
//   });
// }

// export function useVerifyTechnicianAccount() {
//   return useMutation({
//     mutationFn: verifyTechnicianAccount,
//   });
// }

// export function useGetAllTechnicians(params: TechnicianParams) {
//   return useQuery({
//     queryKey: ["technicians", params],
//     queryFn: () => getAllTechnicians(params),
//   });
// }

// export function useGetAllPublicDoctors(params: PublicTechnicianParams) {
//   return useQuery({
//     queryKey: ["doctor", "public", params],
//     queryFn: () => getAllPublicDoctors(params),
//   });
// }

// export function useSuspenseGetPublicDoctors(params: PublicTechnicianParams) {
//   return useSuspenseQuery({
//     queryKey: ["doctors", "public", params],
//     queryFn: () => getAllPublicDoctors(params),
//   });
// }

// export function usePublicTechnicianProfile(technicianId: string) {
//   return useQuery({
//     queryKey: ["technician", "public", technicianId],
//     queryFn: () => getPublicTechnicianProfile(technicianId),
//     enabled: !!technicianId,
//   });
// }

// export function useSuspenseGetAllTechnicians(params: TechnicianParams) {
//   return useSuspenseQuery({
//     queryKey: ["doctors", params],
//     queryFn: () => getAllTechnicians(params),
//   });
// }

// export function useApproveTechnician() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: approveTechnician,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["technicians"] });
//     },
//   });
// }

// export function useGetTodayScheduleByDoctor(params: {
//   doctorId?: string;
//   page?: number;
//   limit?: number;
// }) {
//   return useQuery({
//     queryKey: ["schedule", params],
//     queryFn: () => getTodayScheduleByDoctor(params),
//   });
// }

export function useGetCustomerAnalytics() {
  return useQuery({
    queryKey: ["customer-analytics"],
    queryFn: () => getCustomerAnalytics(),
  });
}