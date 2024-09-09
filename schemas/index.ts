import * as z from "zod";

export const LoginSchemas = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string({
        message: "Password is required"
    }),
    code: z.optional(z.string())
});

export const RegisterSchemas = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required"
    }),
    name: z.string().min(1, {
        message: "Name is required"
    })
});

export const ResetPasswordSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    })
});

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Minimum 6 characters required"
    }),
});