import { getAllAreas } from "@/api/area.api";
import {
  useQuery,
} from "@tanstack/react-query";

export function useGetAllAreas() {
  return useQuery({
    queryKey: ["areas"],
    queryFn: () => getAllAreas(),
  });
}

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
//     queryKey: ["technicians", params],
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

// export function useGetTechnicianAnalytics() {
//   return useQuery({
//     queryKey: ["technician-analytics"],
//     queryFn: () => getTechnicianAnalytics(),
//   });
// }