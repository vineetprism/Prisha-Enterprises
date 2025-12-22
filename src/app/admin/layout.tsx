"use client"

import { AdminAuthProvider, useAdminAuth } from "@/context/AdminAuthContext"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { usePathname } from "next/navigation"

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAdminAuth()
    const pathname = usePathname()
    const isLoginPage = pathname === "/admin/login"

    // Show loading state
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
            </div>
        )
    }

    // Login page doesn't need the sidebar layout
    if (isLoginPage) {
        return <>{children}</>
    }

    // Protected pages need authentication
    if (!isAuthenticated) {
        return null // Will redirect via context
    }

    return (
        <div className="flex h-screen bg-slate-100 overflow-hidden">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto">
                <div className="p-4 md:p-6 lg:p-8 pb-20">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AdminAuthProvider>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </AdminAuthProvider>
    )
}
