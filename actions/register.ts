"use server";

import * as z from "zod";
import bcrypt from "bcrypt";

import { db } from "@/lib/db";
import { RegisterSchemas } from "@/schemas";
import { getUser } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchemas>) => {
    const validateField = RegisterSchemas.safeParse(values);

    if(!validateField.success) return { error: "Invalid fields" }

    const { email, password, name } = validateField.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await getUser(email);

    if(existingUser) return { error: "Email already in use" }

    await db.user.create({
        data: {
            email,
            name,
            password: hashedPassword
        }
    })

    return { success: "User created!" } 
}