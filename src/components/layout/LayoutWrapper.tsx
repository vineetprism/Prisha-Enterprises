"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith("/admin");

    return (
        <>
            {!isAdminRoute && <Header />}
            <main className="flex-1">{children}</main>
            {!isAdminRoute && <Footer />}
        </>
    );
}
