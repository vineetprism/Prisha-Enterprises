import { ShieldCheck, Truck, Clock, Headphones } from "lucide-react"
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"

const features = [
    {
        icon: <ShieldCheck className="w-6 h-6" />,
        name: "Genuine Products",
        title: "100% Authentic",
        quote: "All our hardware is sourced directly from authorized distributors, ensuring authenticity and warranty coverage.",
    },
    {
        icon: <Truck className="w-6 h-6" />,
        name: "Fast Delivery",
        title: "Pan-India Shipping",
        quote: "Quick and reliable delivery across India with professional installation and setup services.",
    },
    {
        icon: <Clock className="w-6 h-6" />,
        name: "Flexible Tenure",
        title: "Rent Your Way",
        quote: "Flexible rental periods from days to years, tailored to your business needs and budget.",
    },
    {
        icon: <Headphones className="w-6 h-6" />,
        name: "24/7 Support",
        title: "Always Available",
        quote: "Round-the-clock technical assistance from our team of certified IT professionals.",
    },
    {
        icon: <ShieldCheck className="w-6 h-6" />,
        name: "Quality Assurance",
        title: "Tested Hardware",
        quote: "Every piece of equipment undergoes rigorous testing before deployment to ensure peak performance.",
    },
    {
        icon: <Truck className="w-6 h-6" />,
        name: "Easy Returns",
        title: "Hassle-Free",
        quote: "Simple return and exchange process with no hidden fees or complicated procedures.",
    },
]

export function TrustStrip() {
    return (
        <section className="relative py-16 overflow-hidden">
            {/* Top decorative border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

            {/* Background with subtle pattern */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50" />

            {/* Decorative circles */}
            <div className="absolute top-8 left-10 w-32 h-32 bg-cyan-100 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-8 right-10 w-40 h-40 bg-navy-100 rounded-full blur-3xl opacity-30" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-10">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-50 text-cyan-600 text-sm font-medium rounded-full mb-4">
                        <ShieldCheck className="w-4 h-4" />
                        Why Businesses Trust Us
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-2">
                        Your Success is Our Priority
                    </h2>
                    <p className="text-slate-600 max-w-xl mx-auto">
                        Experience excellence in IT infrastructure solutions with guaranteed quality and support
                    </p>
                </div>
                <InfiniteMovingCards
                    items={features}
                    direction="left"
                    speed="slow"
                />
            </div>

            {/* Bottom decorative border */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-navy-900 to-transparent opacity-20" />
        </section>
    )
}
