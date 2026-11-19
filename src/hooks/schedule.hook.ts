import {
  createSchedule,
  deleteSchedule,
  getAllSchedules,
  getMySchedules,
  publishSchedule,
} from "@/api";
import type { ScheduleParams } from "@/types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

export function useCreateSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
}

export function useAllSchedules(params: ScheduleParams) {
  return useQuery({
    queryKey: ["schedules", params],
    queryFn: () => getAllSchedules(params),
  });
}

export function useSuspenseAllSchedules(params: ScheduleParams) {
  return useSuspenseQuery({
    queryKey: ["schedules", params],
    queryFn: () => getAllSchedules(params),
  });
}

export function useMySchedules(params: ScheduleParams) {
  return useQuery({
    queryKey: ["my-schedules", params],
    queryFn: () => getMySchedules(params),
  });
}

export function useSuspenseMySchedules(params: ScheduleParams) {
  return useSuspenseQuery({
    queryKey: ["my-schedules", params],
    queryFn: () => getMySchedules(params),
  });
}

export function usePublishSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: publishSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
}

export function useDeleteSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
}
