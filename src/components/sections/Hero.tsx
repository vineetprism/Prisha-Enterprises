"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EnquiryModal } from "@/components/features/EnquiryModal"
import { Rocket, ArrowUpRight, Star, Laptop, TrendingUp, Cctv } from "lucide-react"

export function Hero() {
    return (
        <section className="relative bg-gradient-to-b from-slate-50 to-white overflow-hidden">
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Column - Typography & Action */}
                    <div className="space-y-8">
                        {/* Badge */}
                        <Badge variant="secondary" className="bg-slate-100 text-slate-600 px-4 py-1.5 text-sm font-medium rounded-full">
                            IT-Empowered
                        </Badge>

                        {/* Headline */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 leading-tight">
                            Transform Your Office Infrastructure into a{" "}
                            <span className="text-cyan-500">Productivity Engine</span>
                        </h1>

                        {/* Sub-headline */}
                        <p className="text-lg md:text-xl text-slate-600 max-w-xl">
                            Stop blocking capital. Get Enterprise-grade Laptops, Servers, and CCTV on flexible rentals with zero maintenance costs.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <EnquiryModal
                                trigger={
                                    <Button size="lg" className="bg-navy-900 hover:bg-navy-800 text-white px-6 h-12">
                                        <Rocket className="mr-2 h-5 w-5" />
                                        Get Rental Quote
                                    </Button>
                                }
                            />
                            <Button size="lg" variant="outline" className="border-2 border-slate-300 hover:border-slate-400 px-6 h-12" asChild>
                                <Link href="/products/all">
                                    Buy Refurbished
                                    <ArrowUpRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>

                        {/* Social Proof */}
                        <div className="flex items-center gap-4 pt-4">
                            {/* Avatar Stack */}
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white text-xs font-bold shadow-sm"
                                    >
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <p className="text-sm text-slate-600">
                                    Trusted by <span className="font-semibold text-navy-900">50+ Corporates</span> in India
                                </p>
                                <div className="flex gap-0.5 mt-1">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Floating Card Composition */}
                    <div className="relative h-[400px] md:h-[500px] lg:h-[550px]">
                        {/* Top Left Card - Laptop */}
                        <div className="absolute top-0 left-0 md:left-8 bg-white rounded-2xl shadow-xl p-5 border border-slate-100 animate-float z-10">
                            <div className="w-16 h-16 bg-navy-900 rounded-xl flex items-center justify-center mb-3">
                                <Laptop className="h-8 w-8 text-white" />
                            </div>
                            <p className="text-sm font-semibold text-navy-900">QC Passed: Grade A++</p>
                        </div>

                        {/* Top Right Card - Security */}
                        <div className="absolute top-0 right-0 md:right-8 bg-white rounded-2xl shadow-xl p-5 border border-slate-100 animate-float z-10" style={{ animationDelay: "0.5s" }}>
                            <div className="w-16 h-16 bg-navy-900 rounded-xl flex items-center justify-center mb-3">
                                <Cctv className="h-8 w-8 text-white" />
                            </div>
                            <p className="text-sm font-semibold text-navy-900">Security: Active 24/7</p>
                        </div>

                        {/* Main Card - Cost Savings */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] md:w-[75%] bg-white rounded-2xl shadow-2xl p-6 border border-slate-100 z-20">
                            <p className="text-sm font-semibold text-slate-600 mb-4">Cost Savings (Capex vs Opex)</p>

                            {/* Graph Visualization */}
                            <div className="relative h-32 mb-4">
                                <svg className="w-full h-full" viewBox="0 0 200 80" preserveAspectRatio="none">
                                    {/* Grid lines */}
                                    <line x1="0" y1="20" x2="200" y2="20" stroke="#e2e8f0" strokeDasharray="4" />
                                    <line x1="0" y1="40" x2="200" y2="40" stroke="#e2e8f0" strokeDasharray="4" />
                                    <line x1="0" y1="60" x2="200" y2="60" stroke="#e2e8f0" strokeDasharray="4" />

                                    {/* Ascending line */}
                                    <path
                                        d="M 10 70 Q 50 60, 80 45 T 150 25, 190 10"
                                        fill="none"
                                        stroke="url(#gradient)"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#06b6d4" />
                                            <stop offset="100%" stopColor="#0f204b" />
                                        </linearGradient>
                                    </defs>

                                    {/* Arrow at end */}
                                    <polygon points="185,5 200,10 185,15" fill="#0f204b" />
                                </svg>

                                {/* Trend icon */}
                                <div className="absolute top-0 right-4 w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                                    <TrendingUp className="h-5 w-5 text-cyan-600" />
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <p className="text-slate-500 text-sm">Annual Savings:</p>
                                <p className="text-3xl md:text-4xl font-bold text-navy-900">₹12.5L</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
