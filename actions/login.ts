"use server";

import * as z from "zod";
import { LoginSchemas } from "@/schemas";

export const login = async (values: z.infer<typeof LoginSchemas>) => {
    const validateField = LoginSchemas.safeParse(values);

    if(!validateField.success) return { error: "Invalid fields" }
    return { success: "Email sent!" } 
}