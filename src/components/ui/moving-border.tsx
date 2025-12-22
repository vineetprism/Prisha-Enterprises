"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const MovingBorder = ({
    children,
    duration = 2000,
    className,
    containerClassName,
    borderClassName,
    as: Component = "button",
    ...otherProps
}: {
    children: React.ReactNode
    duration?: number
    className?: string
    containerClassName?: string
    borderClassName?: string
    as?: React.ElementType
    [key: string]: any
}) => {
    return (
        <Component
            className={cn(
                "relative p-[1px] overflow-hidden",
                containerClassName
            )}
            {...otherProps}
        >
            <div
                className={cn(
                    "absolute inset-0 rounded-lg",
                    borderClassName
                )}
                style={{
                    background: `
                        radial-gradient(circle at center, #667eea 0%, #764ba2 50%, #f093fb 100%)
                    `,
                }}
            >
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: `
                            conic-gradient(
                                from 0deg,
                                transparent 0deg,
                                #667eea 90deg,
                                transparent 180deg,
                                #764ba2 270deg,
                                transparent 360deg
                            )
                        `,
                    }}
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        duration: duration / 1000,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </div>
            <div className={cn(
                "relative bg-slate-900 rounded-lg px-8 py-3 text-white",
                className
            )}>
                {children}
            </div>
        </Component>
    )
}
