export interface RegistrationPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  customer: {
    contactNumber?: string;
    address?: string;
  };
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  newPassword: string;
  confirmNewPassword: string;
  otp: string;
}

export interface ChangePasswordPayload {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ResendOtpPayload {
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface VerifyAccountPayload {
  email: string;
  otp: string;
}
