import z from "zod";

export const loginSchema = z.object({
  email: z.email("Not a valid email!").trim().toLowerCase(),
  password: z
    .string("Not a string!")
    .min(8, "Password must be minimum 8 characters Long.")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .regex(/[0-9]/, "Password must contain at least 1 number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least 1 special character",
    ),
});

export const ResendOtpSchema = z.object({
	email: z.email("Not a valid email!").trim().toLowerCase(),
});

export const ForgotPasswordSchema = z.object({
  email: z.email("Not a valid email!").trim().toLowerCase(),
});

export const ResetPasswordSchema = z.object({
  email: z.email("Not a valid email!").trim().toLowerCase(),
  newPassword: z
    .string("Not a string!!!!!")
    .min(8, "Password must be minimum 8 characters Long.")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")

    .regex(/[0-9]/, "Password must contain at least 1 number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least 1 special character",
    ),
  confirmNewPassword: z.string("Not a string!").min(1, "Please confirm your new password"),
  otp: z.string().length(6, "OTP must be 6-digits long"),
})
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match!",
    path: ["confirmNewPassword"],
  });

export const customerRegistrationSchema = z.object({
  name: z
    .string("Not A String!")
    .min(3, "Name must at least 3 characters long!")
    .max(15, "Name cannot be greater than 15 characters long!"),
  email: z.email("Not a valid email!").trim().toLowerCase(),
  password: z
    .string("Not a string!")
    .min(8, "Password must be minimum 8 characters Long.")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .regex(/[0-9]/, "Password must contain at least 1 number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least 1 special character",
    ),
  confirmPassword: z.string("Not a string!").min(1, "Please confirm your password"),
  contactNumber: z
    .string("Not a string!")
    .refine((val) => val === "" || /^(?:\+?880|0)1[3-9]\d{8}$/.test(val), {
      message: "Please provide valid Bangladeshi number",
    })
    .optional(),
  address: z.string("Not a string!").optional(),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export const UserVerificationSchema = z.object({
  otp: z.string().length(6, "OTP must be 6-digits long"),
})

//* GP - 017, 013
//* BL - 019, 014
//* Airtel - 016
//* Robi - 018
//* TeleTalk - 01512345678
//! City Cell - 011 (Already dead)
//! there is no 012
//todo we need to confirm from [3-9]

//? Either +880, 880, 0
