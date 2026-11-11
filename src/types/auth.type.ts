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

export interface LoginPayload {
  email: string;
  password: string;
}

export interface VerifyAccountPayload {
  email: string;
  otp: string;
}
