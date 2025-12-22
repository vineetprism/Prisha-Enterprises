"use client"

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"
import { Quote, User } from "lucide-react"

const testimonials = [
    {
        quote: "Prisha Enterprises has been our trusted IT partner for over 5 years. Their servers and networking equipment have never let us down. Excellent service and support!",
        name: "Rajesh Kumar",
        title: "IT Director, TechCorp India",
        icon: <User className="w-6 h-6" />,
    },
    {
        quote: "We rented 50 laptops for our corporate training program. The entire process was seamless, and the equipment quality was top-notch. Highly recommended!",
        name: "Priya Sharma",
        title: "HR Manager, GlobalFinance Ltd",
        icon: <User className="w-6 h-6" />,
    },
    {
        quote: "Their CCTV solutions have transformed our security infrastructure. Professional installation and ongoing support make them stand out from competitors.",
        name: "Amit Verma",
        title: "Security Head, Metro Mall",
        icon: <User className="w-6 h-6" />,
    },
    {
        quote: "Fast delivery, genuine products, and competitive pricing. Prisha Enterprises is our go-to vendor for all workstation and server requirements.",
        name: "Sunita Reddy",
        title: "CTO, DataDrive Solutions",
        icon: <User className="w-6 h-6" />,
    },
    {
        quote: "The team understands enterprise needs perfectly. They helped us set up our entire data center with Dell servers and networking equipment.",
        name: "Vikram Singh",
        title: "Infrastructure Lead, CloudNet Systems",
        icon: <User className="w-6 h-6" />,
    },
    {
        quote: "Outstanding customer service! They went above and beyond to meet our urgent requirements during our office expansion. Will definitely work with them again.",
        name: "Ananya Iyer",
        title: "Admin Head, StartupHub India",
        icon: <User className="w-6 h-6" />,
    },
]

export function Testimonials() {
    return (
        <section className="py-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 text-cyan-600 text-sm font-medium mb-4">
                        <Quote className="w-4 h-4" />
                        Client Testimonials
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
                        What Our Clients Say
                    </h2>
                    <p className="text-lg text-slate-600">
                        Trusted by leading enterprises across India for reliable IT hardware solutions.
                    </p>
                </div>

                <InfiniteMovingCards
                    items={testimonials}
                    direction="left"
                    speed="slow"
                    pauseOnHover={true}
                    className="mx-auto"
                />
            </div>
        </section>
    )
}
