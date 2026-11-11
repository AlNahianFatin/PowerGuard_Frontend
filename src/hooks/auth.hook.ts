import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getMe,
  googleOAuth,
  userLogin,
  userLogout,
  userRegistration,
  userResendOtp,
  verifyAccount,
} from "@/api";

export function useLogin() {
  return useMutation({
    mutationFn: userLogin,
  });
}

export function useResendAccountOtp() {
  return useMutation({
    mutationFn: userResendOtp,
  });
}

export function useVerifyAccount() {
  return useMutation({
    mutationFn: verifyAccount,
  });
}

export function useRegistration() {
  return useMutation({
    mutationFn: userRegistration,
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: userLogout,
  });
}

export function useGoogleOAuth() {
  return useMutation({
    mutationFn: googleOAuth,
  });
}

export function useGetMe() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
  });
}
