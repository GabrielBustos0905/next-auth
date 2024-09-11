"use client";

import { logout } from "@/actions/logou";

interface LogoutButtonProps {
    children?: React.ReactNode
}

export function LogoutButton({ children }: LogoutButtonProps) {
    const onClick = () => {
        logout()
    }

    return (
        <button onClick={onClick} className="cursor-pointer">
            {children}
        </button>
    )
}