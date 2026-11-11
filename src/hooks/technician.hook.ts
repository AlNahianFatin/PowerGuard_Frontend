import {
  applyAsDoctor,
  approveDoctor,
  getAllDoctors,
  getAllPublicDoctors,
  getPublicDoctorProfile,
  getTodayScheduleByDoctor,
  verifyTechnicianAccount,
} from "@/api";
import type { TechnicianParams, PublicTechnicianParams } from "@/types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

export function useApplyAsTechnician() {
  return useMutation({
    mutationFn: applyAsDoctor,
  });
}

export function useVerifyTechnicianAccount() {
  return useMutation({
    mutationFn: verifyTechnicianAccount,
  });
}

export function useGetAllTechnicians(params: TechnicianParams) {
  return useQuery({
    queryKey: ["doctors", params],
    queryFn: () => getAllDoctors(params),
  });
}

export function useGetAllPublicDoctors(params: PublicTechnicianParams) {
  return useQuery({
    queryKey: ["doctor", "public", params],
    queryFn: () => getAllPublicDoctors(params),
  });
}

export function useSuspenseGetPublicDoctors(params: PublicTechnicianParams) {
  return useSuspenseQuery({
    queryKey: ["doctors", "public", params],
    queryFn: () => getAllPublicDoctors(params),
  });
}

export function usePublicDoctorProfile(doctorId: string) {
  return useQuery({
    queryKey: ["doctor", "public", doctorId],
    queryFn: () => getPublicDoctorProfile(doctorId),
    enabled: !!doctorId,
  });
}

export function useSuspenseGetAllDoctors(params: TechnicianParams) {
  return useSuspenseQuery({
    queryKey: ["doctors", params],
    queryFn: () => getAllDoctors(params),
  });
}

export function useApproveDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
}

export function useGetTodayScheduleByDoctor(params: {
  doctorId?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["schedule", params],
    queryFn: () => getTodayScheduleByDoctor(params),
  });
}
