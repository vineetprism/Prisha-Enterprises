import { db } from "@/lib/db"
import { unstable_noStore as noStore } from "next/cache"

export interface CompanySettings {
    name: string
    email: string
    phone: string
    gst: string
    address: string
    website: string
}

const DEFAULT_SETTINGS: CompanySettings = {
    name: "Prisha Enterprises",
    email: "contact@prishaenterprises.in",
    phone: "+91 98765 43210",
    gst: "07AADCP1234F1Z5",
    address: "B-123, Sector 63, Noida, Uttar Pradesh, India - 201301",
    website: "www.prishaenterprises.in"
}

export async function getCompanySettings(): Promise<CompanySettings> {
    noStore() // Disable caching for settings to ensure real-time updates
    try {
        const settings = await db.setting.findMany()

        if (settings.length === 0) {
            return DEFAULT_SETTINGS
        }

        // Convert array of { key, value } to object
        const settingsMap = settings.reduce((acc, curr) => {
            acc[curr.key] = curr.value
            return acc
        }, {} as Record<string, string>)

        return {
            name: settingsMap.name || DEFAULT_SETTINGS.name,
            email: settingsMap.email || DEFAULT_SETTINGS.email,
            phone: settingsMap.phone || DEFAULT_SETTINGS.phone,
            gst: settingsMap.gst || DEFAULT_SETTINGS.gst,
            address: settingsMap.address || DEFAULT_SETTINGS.address,
            website: settingsMap.website || DEFAULT_SETTINGS.website,
        }
    } catch (error) {
        console.error("Error fetching settings:", error)
        return DEFAULT_SETTINGS
    }
}
