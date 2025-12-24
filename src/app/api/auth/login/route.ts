import { NextRequest, NextResponse } from "next/server"
import { getCompanySettings } from "@/lib/settings"
import { db } from "@/lib/db"

export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json()

        // Fetch raw settings from DB to get sensitive auth data
        // We don't use getCompanySettings() here because we might exclude auth data from that helper in the future
        const settings = await db.setting.findMany({
            where: {
                key: { in: ['admin_username', 'admin_password'] }
            }
        })

        const settingsMap = settings.reduce((acc, curr) => {
            acc[curr.key] = curr.value
            return acc
        }, {} as Record<string, string>)

        // Default credentials if not set in DB
        const dbUsername = settingsMap.admin_username || "admin"
        const dbPassword = settingsMap.admin_password || "prisha2024"

        if (username === dbUsername && password === dbPassword) {
            return NextResponse.json({ success: true })
        }

        return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 })

    } catch (error) {
        console.error("Login error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
