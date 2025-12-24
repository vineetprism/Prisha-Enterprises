import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(req: NextRequest) {
    try {
        const { currentPassword, newPassword } = await req.json()

        // Verify current password
        const passwordSetting = await db.setting.findUnique({
            where: { key: 'admin_password' }
        })

        const currentDbPassword = passwordSetting?.value || "prisha2024"

        if (currentPassword !== currentDbPassword) {
            return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 })
        }

        // Update to new password
        await db.setting.upsert({
            where: { key: 'admin_password' },
            update: { value: newPassword },
            create: { key: 'admin_password', value: newPassword }
        })

        return NextResponse.json({ success: true })

    } catch (error) {
        console.error("Change password error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
