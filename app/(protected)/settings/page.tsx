// import { auth, signOut } from "@/auth"
"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { logout } from "@/actions/logou";

export default function SettingsPage() {
    const user = useCurrentUser()
    const onClick = () => {
        logout()
    }
    console.log(user)
    return (
        <div className="bg-white">
            <button type="submit" onClick={onClick}>Sign Out</button>
        </div>
    )
}