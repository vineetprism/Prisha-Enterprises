"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"

export const FloatingNav = ({
    navItems,
    className,
}: {
    navItems: {
        name: string
        link: string
        icon?: React.ReactNode
    }[]
    className?: string
}) => {
    return (
        <motion.div
            initial={{
                opacity: 1,
                y: -100,
            }}
            animate={{
                y: 0,
                opacity: 1,
            }}
            transition={{
                duration: 0.2,
            }}
            className={cn(
                "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-white/[0.2] rounded-full bg-black/50 backdrop-blur-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-8 py-4 items-center justify-center space-x-4",
                className
            )}
        >
            {navItems.map((navItem, idx) => (
                <Link
                    key={`link=${idx}`}
                    href={navItem.link}
                    className={cn(
                        "relative items-center flex space-x-1 text-neutral-50 hover:text-neutral-300"
                    )}
                >
                    <span className="block sm:hidden">{navItem.icon}</span>
                    <span className="hidden sm:block text-sm">{navItem.name}</span>
                </Link>
            ))}
        </motion.div>
    )
}
