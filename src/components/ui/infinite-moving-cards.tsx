"use client"

import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
}: {
    items: {
        quote?: string
        name?: string
        title?: string
        icon?: React.ReactNode
    }[]
    direction?: "left" | "right"
    speed?: "fast" | "normal" | "slow"
    pauseOnHover?: boolean
    className?: string
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const scrollerRef = React.useRef<HTMLUListElement>(null)

    useEffect(() => {
        addAnimation()
    }, [])

    const [start, setStart] = useState(false)

    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children)

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true)
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem)
                }
            })

            getDirection()
            getSpeed()
            setStart(true)
        }
    }

    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "forwards"
                )
            } else {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "reverse"
                )
            }
        }
    }

    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "20s")
            } else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "40s")
            } else {
                containerRef.current.style.setProperty("--animation-duration", "80s")
            }
        }
    }

    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
                    start && "animate-scroll",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
            >
                {items.map((item, idx) => (
                    <li
                        className="w-[350px] max-w-full relative rounded-2xl border border-slate-200 px-8 py-6 md:w-[450px] bg-white shadow-sm hover:shadow-md transition-shadow"
                        key={idx}
                    >
                        <blockquote>
                            <div className="flex items-center gap-4 mb-4">
                                {item.icon && (
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-white">
                                        {item.icon}
                                    </div>
                                )}
                                <div>
                                    <div className="text-sm font-semibold text-navy-900">
                                        {item.name}
                                    </div>
                                    <div className="text-xs text-slate-500">
                                        {item.title}
                                    </div>
                                </div>
                            </div>
                            <span className="relative z-20 text-sm leading-[1.6] text-slate-600 font-normal">
                                {item.quote}
                            </span>
                        </blockquote>
                    </li>
                ))}
            </ul>
        </div>
    )
}
