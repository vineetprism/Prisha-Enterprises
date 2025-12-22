"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const AuroraBackground = ({
    children,
    className,
    showRadialGradient = true,
}: {
    children: React.ReactNode
    className?: string
    showRadialGradient?: boolean
}) => {
    return (
        <div
            className={cn(
                "relative flex flex-col h-full items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white transition-bg overflow-hidden",
                className
            )}
        >
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className={cn(
                        `
                        [--aurora-color-1:#667eea]
                        [--aurora-color-2:#764ba2]
                        [--aurora-color-3:#f093fb]
                        [--aurora-color-4:#4facfe]
                        `,
                        `
                        [background-image:repeating-linear-gradient(100deg,var(--aurora-color-1)_0%,var(--aurora-color-2)_10%,var(--aurora-color-3)_20%,var(--aurora-color-4)_30%,var(--aurora-color-1)_40%)]
                        [background-size:300%]
                        [background-position:50%_50%]
                        filter blur-[10px] invert-0
                        after:content-[""] after:absolute after:inset-0 after:[background-image:repeating-linear-gradient(100deg,var(--aurora-color-1)_0%,var(--aurora-color-2)_10%,var(--aurora-color-3)_20%,var(--aurora-color-4)_30%,var(--aurora-color-1)_40%)]
                        after:[background-size:200%]
                        after:animate-aurora after:blur-[30px]
                        after:[background-attachment:fixed]
                        `,
                        "absolute -inset-[10px] opacity-50 will-change-transform"
                    )}
                ></div>
            </div>
            {showRadialGradient && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_80%)]"></div>
            )}
            <div className="relative z-10 w-full">{children}</div>
        </div>
    )
}
