import {
  applyAsTechnician,
  approveTechnician,
  getAllTechnicians,
  getPublicTechnicianProfile,
  verifyTechnicianAccount,
} from "@/api";
import type { TechnicianParams } from "@/types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

export function useApplyAsTechnician() {
  return useMutation({
    mutationFn: applyAsTechnician,
  });
}

export function useVerifyTechnicianAccount() {
  return useMutation({
    mutationFn: verifyTechnicianAccount,
  });
}

export function useGetAllTechnicians(params: TechnicianParams) {
  return useQuery({
    queryKey: ["technicians", params],
    queryFn: () => getAllTechnicians(params),
  });
}

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

export function usePublicTechnicianProfile(technicianId: string) {
  return useQuery({
    queryKey: ["technician", "public", technicianId],
    queryFn: () => getPublicTechnicianProfile(technicianId),
    enabled: !!technicianId,
  });
}

// export function useSuspenseGetAllDoctors(params: TechnicianParams) {
//   return useSuspenseQuery({
//     queryKey: ["doctors", params],
//     queryFn: () => getAllDoctors(params),
//   });
// }

export function useApproveTechnician() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveTechnician,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technicians"] });
    },
  });
}

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
