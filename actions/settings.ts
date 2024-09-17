"use server";

import * as z from "zod";
import bcrypt from "bcrypt";

import { getUser, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/email";
import { generateVerificationToken } from "@/lib/token";
import { SettingsSchema } from "@/schemas";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
    const user = await currentUser();

    console.log(values.isTwoFactorEnabled)

    if(!user) return { error: "Unauthorizez" };

    const dbUser = user.id && await getUserById(user.id);

    if(!dbUser) return { error: "Unauthorize" };

    if(user.isOAuth) {
        values.email = undefined
        values.password = undefined
        values.newPassword = undefined
        values.isTwoFactorEnabled = undefined
    };

    if(values.email && values.email !== user.email) {
        const existingUser = await getUser(values.email);

        if(existingUser && existingUser.id !== user.id ) return { error: "Email already in use!" };

        const verificationToken = await generateVerificationToken(values.email);

        await sendVerificationEmail(verificationToken.email, verificationToken.token);

        return { success: "Verification email sent!" };
    };

    if(values.password && values.newPassword && dbUser.password) {
        const passwordMatch = await bcrypt.compare(values.password, dbUser.password);

        if(!passwordMatch) return { error: "Incorrect password!" };

        const hashedPassword = await bcrypt.hash(values.newPassword, 10);

        values.password = hashedPassword;
        values.newPassword = undefined;
    }

    await db.user.update({
        where: {
            id: dbUser.id
        },
        data: {
            ...values
        }
    });

    return { success: "Settings Updates!"}
};