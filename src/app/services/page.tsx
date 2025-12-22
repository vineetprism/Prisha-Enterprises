import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
    Server,
    Shield,
    Network,
    Laptop,
    Monitor,
    Headphones,
    Wrench,
    Lock,
    LifeBuoy,
    ArrowRight
} from "lucide-react"

// Core services (original)
const coreServices = [
    {
        title: "Enterprise Server Rentals",
        description: "High-performance Dell PowerEdge & HP ProLiant servers with flexible rental plans.",
        icon: Server,
        link: "/contact?service=rentals",
    },
    {
        title: "IT Hardware Sales",
        description: "Premium laptops, desktops, and workstations from top brands with warranty support.",
        icon: Laptop,
        link: "/contact?service=sales",
    },
    {
        title: "Networking Solutions",
        description: "End-to-end networking infrastructure with Cisco & Juniper gear.",
        icon: Network,
        link: "/solutions/networking",
    },
    {
        title: "CCTV & Security",
        description: "Advanced IP & Analog surveillance systems with remote monitoring.",
        icon: Shield,
        link: "/solutions/security",
    },
]

// Managed services (new - with detail pages)
const managedServices = [
    {
        slug: "it-management",
        title: "IT Infrastructure Management",
        description: "Continuous monitoring and maintenance of IT systems to ensure optimal performance and uptime.",
        icon: Monitor,
    },
    {
        slug: "consulting",
        title: "IT Consulting Services",
        description: "Strategic advice to align IT with business goals. Digital transformation and technology roadmaps.",
        icon: Headphones,
    },
    {
        slug: "amc",
        title: "Repair & AMC Services",
        description: "Annual Maintenance Contracts and hardware repair with preventive maintenance and SLA support.",
        icon: Wrench,
    },
    {
        slug: "security-management",
        title: "IT Security Management",
        description: "Managed cybersecurity and threat monitoring services. Firewall management and audits.",
        icon: Lock,
    },
    {
        slug: "helpdesk",
        title: "Help Desk IT Services",
        description: "24/7 technical support for user issues with ticketing system and SLA commitments.",
        icon: LifeBuoy,
    },
]

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-cyan-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <Badge className="bg-cyan-500/20 text-cyan-300 mb-6">Professional Services</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200">
                        Our Services
                    </h1>
                    <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
                        Comprehensive IT solutions and ongoing operational support services designed to drive efficiency and growth.
                    </p>
                </div>
            </section>

            {/* Core IT Services */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-navy-900 mb-4">Core IT Services</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Hardware rentals, sales, and infrastructure setup for your business needs.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {coreServices.map((service, i) => {
                            const IconComponent = service.icon
                            return (
                                <Link
                                    key={i}
                                    href={service.link}
                                    className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border border-slate-100 hover:border-cyan-200"
                                >
                                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <IconComponent className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-navy-900 mb-2 group-hover:text-cyan-600 transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm text-slate-600">{service.description}</p>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Managed & Support Services */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-navy-900 mb-4">Managed & Support Services</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Ongoing operational and support services to keep your IT running smoothly.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {managedServices.map((service) => {
                            const IconComponent = service.icon
                            return (
                                <Link
                                    key={service.slug}
                                    href={`/services/${service.slug}`}
                                    className="group bg-slate-50 rounded-xl p-6 hover:bg-cyan-50 transition-all border border-slate-100 hover:border-cyan-200"
                                >
                                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <IconComponent className="h-7 w-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-navy-900 mb-2 group-hover:text-cyan-600 transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-slate-600 mb-4">{service.description}</p>
                                    <span className="inline-flex items-center text-cyan-600 font-medium text-sm">
                                        View Details <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-navy-900 mb-4">Our Process</h2>
                    <p className="text-slate-600 mb-12">Simple, efficient, and transparent</p>
                    <div className="grid md:grid-cols-3 gap-8 relative max-w-4xl mx-auto">
                        <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-200 to-transparent -z-10" />
                        {[
                            { step: "01", title: "Consultation", desc: "We analyze your requirements and business goals" },
                            { step: "02", title: "Implementation", desc: "Our experts deploy the solution with minimal downtime" },
                            { step: "03", title: "Support", desc: "Ongoing maintenance and 24/7 support for peace of mind" },
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl hover:shadow-lg transition-shadow">
                                <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white shadow-lg">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold text-navy-900 mb-2">{item.title}</h3>
                                <p className="text-slate-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-navy-900 to-cyan-900 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="text-cyan-100 mb-8 max-w-xl mx-auto">
                        Contact us today for a free consultation and discover how we can help your business grow.
                    </p>
                    <Button size="lg" className="bg-white text-navy-900 hover:bg-cyan-50" asChild>
                        <Link href="/contact">
                            Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}
