"use client"

import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"

const brands = [
    { name: "Dell", logo: "DELL" },
    { name: "HP", logo: "HP" },
    { name: "Cisco", logo: "CISCO" },
    { name: "Lenovo", logo: "LENOVO" },
    { name: "Microsoft", logo: "MICROSOFT" },
    { name: "Intel", logo: "INTEL" },
    { name: "AMD", logo: "AMD" },
    { name: "Hikvision", logo: "HIKVISION" },
    { name: "TP-Link", logo: "TP-LINK" },
    { name: "Seagate", logo: "SEAGATE" },
]

export function BrandPartners() {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const scrollerRef = React.useRef<HTMLUListElement>(null)
    const [start, setStart] = useState(false)

    useEffect(() => {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children)
            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true)
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem)
                }
            })
            setStart(true)
        }
    }, [])

    return (
        <section className="py-16 bg-navy-900 overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800/50 to-navy-900" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-10">
                    <span className="inline-block px-4 py-1.5 bg-white/10 text-cyan-300 text-sm font-medium rounded-full mb-4">
                        Our Partners
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        Trusted Brand Partners
                    </h2>
                    <p className="text-slate-400">
                        We work with the world's leading technology brands
                    </p>
                </div>

                <div
                    ref={containerRef}
                    className="relative max-w-6xl mx-auto overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
                >
                    <ul
                        ref={scrollerRef}
                        className={cn(
                            "flex min-w-full shrink-0 gap-6 py-4 w-max flex-nowrap",
                            start && "animate-scroll hover:[animation-play-state:paused]"
                        )}
                        style={{
                            "--animation-duration": "30s",
                            "--animation-direction": "forwards"
                        } as React.CSSProperties}
                    >
                        {brands.map((brand, idx) => (
                            <li
                                key={idx}
                                className="flex items-center justify-center w-36 h-16 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer group"
                            >
                                <span className="text-base font-bold text-white/70 tracking-wider group-hover:text-cyan-400 transition-colors">
                                    {brand.logo}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}
