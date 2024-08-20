"use server";

import * as z from "zod";
import { RegisterSchemas } from "@/schemas";

export const register = async (values: z.infer<typeof RegisterSchemas>) => {
    const validateField = RegisterSchemas.safeParse(values);

    if(!validateField.success) return { error: "Invalid fields" }
    return { success: "Email sent!" } 
}