"use client";

import { usePathname } from "next/navigation";
interface LayoutWrapperProps {
    children: React.ReactNode
    header: React.ReactNode
    footer: React.ReactNode
}

export function LayoutWrapper({ children, header, footer }: LayoutWrapperProps) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith("/admin");

    return (
        <>
            {!isAdminRoute && header}
            <main className="flex-1">{children}</main>
            {!isAdminRoute && footer}
        </>
    );
}
