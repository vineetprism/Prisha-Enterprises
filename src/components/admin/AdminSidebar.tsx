"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAdminAuth } from "@/context/AdminAuthContext"
import { LayoutDashboard, MessageSquare, Package, Settings, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"

const navItems = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Products",
        href: "/admin/products",
        icon: Package,
    },
    {
        title: "Inquiries",
        href: "/admin/inquiries",
        icon: MessageSquare,
    },
    {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
    },
]

export function AdminSidebar() {
    const pathname = usePathname()
    const { logout } = useAdminAuth()
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    const handleLogout = () => {
        logout()
    }

    return (
        <>
            {/* Mobile Menu Toggle */}
            <button
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-brand-900 text-white rounded-lg shadow-lg"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
                {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={cn(
                "fixed lg:relative inset-y-0 left-0 z-40 flex h-full w-64 flex-col bg-brand-900 text-white transition-transform duration-300 ease-in-out shrink-0",
                isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}>
                <div className="flex h-16 items-center px-6 border-b border-brand-800 shrink-0">
                    <span className="text-xl font-bold tracking-tight">
                        PRISHA <span className="text-brand-400">ADMIN</span>
                    </span>
                </div>
                <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMobileOpen(false)}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                pathname === item.href
                                    ? "bg-brand-500 text-white"
                                    : "text-slate-300 hover:bg-brand-800 hover:text-white"
                            )}
                        >
                            <item.icon className="h-5 w-5 shrink-0" />
                            <span className="truncate">{item.title}</span>
                        </Link>
                    ))}
                </div>
                <div className="p-4 border-t border-brand-800 shrink-0">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-brand-800 hover:text-white transition-colors"
                    >
                        <LogOut className="h-5 w-5 shrink-0" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>
        </>
    )
}
