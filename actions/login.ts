"use server";

import * as z from "zod";
import { LoginSchemas } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/token";
import { getUser } from "@/data/user";
import { sendVerificationEmail } from "@/lib/email";

export const login = async (values: z.infer<typeof LoginSchemas>) => {
    const validateField = LoginSchemas.safeParse(values);

    if(!validateField.success) return { error: "Invalid fields" }
    
    const { email, password } = validateField.data;

    const existingUser = await getUser(email);

    if(!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email does not exist!" }
    }

    if(!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email);
        await sendVerificationEmail(verificationToken.email, verificationToken.token)

        return { success: "Confirmation email sent!" }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch(error) {
        if(error instanceof AuthError) {
            switch(error.type) {
                case "CredentialsSignin": {
                    return { error: "Invalid credentials!" }
                }
                default: {
                    return { error: "Something went wrong!" }
                }
            }
        }
        throw error;
    }

    return { success: "email sent"}
}