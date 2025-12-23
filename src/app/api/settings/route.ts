import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getCompanySettings } from "@/lib/settings"

export async function GET() {
    try {
        const settings = await getCompanySettings()
        return NextResponse.json(settings)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json()

        // Upsert each field
        const updates = Object.entries(data).map(([key, value]) => {
            return db.setting.upsert({
                where: { key },
                update: { value: String(value) },
                create: { key, value: String(value) }
            })
        })

        await Promise.all(updates)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error saving settings:", error)
        return NextResponse.json({ error: "Failed to save settings" }, { status: 500 })
    }
}
