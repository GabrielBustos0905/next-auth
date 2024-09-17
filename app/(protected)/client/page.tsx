"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { UserInfo } from "@/components/user-info";

export default function ClientPage() {
    const user = useCurrentUser();
    console.log(user)
    return (
        <UserInfo
            label="🌐 Client Component"
            user={user}
        />
    )
}