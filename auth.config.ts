import GitHub from "next-auth/providers/github";
import bcryptjs from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { LoginSchemas } from "./schemas";
import { getUser } from "./data/user";

export default { providers: [
    Credentials({
        async authorize(credentials) {
            const validateFields = LoginSchemas.safeParse(credentials);

            if(validateFields.success) {
                const { email, password } = validateFields.data;
                const user = await getUser(email);
                if(!user || !user.password) return null;

                const passwordMatch = await bcryptjs.compare(password, user.password);

                if(passwordMatch) return user;
            }

            return null;
        }
    })
] } satisfies NextAuthConfig