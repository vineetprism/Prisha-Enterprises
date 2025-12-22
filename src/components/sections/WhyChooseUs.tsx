"use client"

import { HoverEffect } from "@/components/ui/card-hover-effect"
import { Clock, Users, ShieldCheck, Award, Headphones, Zap } from "lucide-react"

const features = [
    {
        title: "15+ Years Experience",
        description: "Decades of expertise in providing top-tier IT hardware solutions to businesses across industries.",
        link: "/about",
        icon: <Clock className="w-6 h-6" />,
    },
    {
        title: "Expert Team",
        description: "A dedicated team of certified professionals ready to support your IT infrastructure needs 24/7.",
        link: "/about",
        icon: <Users className="w-6 h-6" />,
    },
    {
        title: "Quality Assurance",
        description: "We provide only premium quality, rigorously tested hardware from leading global brands.",
        link: "/products/all",
        icon: <ShieldCheck className="w-6 h-6" />,
    },
    {
        title: "Client-Centric Approach",
        description: "Tailored solutions designed to meet your specific business goals and budget requirements.",
        link: "/contact",
        icon: <Award className="w-6 h-6" />,
    },
    {
        title: "24/7 Support",
        description: "Round-the-clock technical support ensuring your business operations never stop.",
        link: "/contact",
        icon: <Headphones className="w-6 h-6" />,
    },
    {
        title: "Fast Delivery",
        description: "Quick turnaround times with express delivery options for urgent requirements.",
        link: "/services",
        icon: <Zap className="w-6 h-6" />,
    },
]

export function WhyChooseUs() {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
                        Why Choose Prisha Enterprises?
                    </h2>
                    <p className="text-lg text-slate-600">
                        Empowering your business with reliable, high-performance IT infrastructure.
                        We are committed to excellence and innovation.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <HoverEffect items={features} />
                </div>
            </div>
        </section>
    )
}
