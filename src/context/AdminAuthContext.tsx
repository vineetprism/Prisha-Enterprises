"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

interface AdminAuthContextType {
    isAuthenticated: boolean
    login: (username: string, password: string) => Promise<boolean>
    logout: () => void
    isLoading: boolean
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

// Simple credentials for demo purposes
const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "prisha2024"
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        // Check localStorage for existing session
        const authStatus = localStorage.getItem("adminAuth")
        if (authStatus === "true") {
            setIsAuthenticated(true)
        }
        setIsLoading(false)
    }, [])

    useEffect(() => {
        // Redirect logic
        if (!isLoading) {
            const isLoginPage = pathname === "/admin/login"

            if (!isAuthenticated && !isLoginPage && pathname?.startsWith("/admin")) {
                router.push("/admin/login")
            } else if (isAuthenticated && isLoginPage) {
                router.push("/admin")
            }
        }
    }, [isAuthenticated, isLoading, pathname, router])

    const login = async (username: string, password: string): Promise<boolean> => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })

            const data = await res.json()

            if (data.success) {
                setIsAuthenticated(true)
                localStorage.setItem("adminAuth", "true")
                router.push("/admin")
                return true
            }
            return false
        } catch (error) {
            console.error("Login failed:", error)
            return false
        }
    }

    const logout = () => {
        setIsAuthenticated(false)
        localStorage.removeItem("adminAuth")
        router.push("/admin/login")
    }

    return (
        <AdminAuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
            {children}
        </AdminAuthContext.Provider>
    )
}

export function useAdminAuth() {
    const context = useContext(AdminAuthContext)
    if (context === undefined) {
        throw new Error("useAdminAuth must be used within an AdminAuthProvider")
    }
    return context
}
