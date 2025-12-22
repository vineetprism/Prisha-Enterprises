import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
    Server,
    BatteryCharging,
    Shield,
    Database,
    Network,
    Video,
    Package,
    ArrowRight
} from "lucide-react"

const solutions = [
    {
        slug: "it-infrastructure",
        title: "IT Infrastructure Solutions",
        description: "Comprehensive setup and management of IT backbones including servers, networking, storage, and end-user devices.",
        icon: Server,
    },
    {
        slug: "power-backup",
        title: "Power Backup Solutions",
        description: "Systems to ensure continuous power supply including UPS, Inverters, and power conditioning equipment.",
        icon: BatteryCharging,
    },
    {
        slug: "security",
        title: "Security Solutions",
        description: "Technologies to protect physical and digital assets including CCTV surveillance, access control, and cybersecurity.",
        icon: Shield,
    },
    {
        slug: "server-storage",
        title: "Server & Storage Solutions",
        description: "Data center hardware, enterprise servers, and storage units (NAS/SAN) for reliable data management.",
        icon: Database,
    },
    {
        slug: "networking",
        title: "Networking Solutions",
        description: "Setup of reliable wired and wireless networks including LAN/WAN design, structured cabling, and firewalls.",
        icon: Network,
    },
    {
        slug: "conferencing",
        title: "Conferencing Solutions",
        description: "Audio and video conferencing setups for businesses including meeting room solutions and collaboration tools.",
        icon: Video,
    },
    {
        slug: "software",
        title: "Software Solutions",
        description: "Licensing and installation of business software including Microsoft 365, Antivirus, and enterprise applications.",
        icon: Package,
    },
]

export default function SolutionsPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-cyan-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <Badge className="bg-cyan-500/20 text-cyan-300 mb-6">Technical Solutions</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200">
                        IT Solutions
                    </h1>
                    <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
                        Specific technical implementations and product-based solutions designed to power your business infrastructure.
                    </p>
                </div>
            </section>

            {/* Solutions Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {solutions.map((solution) => {
                            const IconComponent = solution.icon
                            return (
                                <Link
                                    key={solution.slug}
                                    href={`/solutions/${solution.slug}`}
                                    className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border border-slate-100 hover:border-cyan-200"
                                >
                                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <IconComponent className="h-7 w-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-navy-900 mb-2 group-hover:text-cyan-600 transition-colors">
                                        {solution.title}
                                    </h3>
                                    <p className="text-slate-600 mb-4">{solution.description}</p>
                                    <span className="inline-flex items-center text-cyan-600 font-medium text-sm">
                                        Learn More <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-navy-900 mb-6">
                                Why Choose Our Solutions?
                            </h2>
                            <div className="space-y-4">
                                {[
                                    { title: "Industry Expertise", desc: "15+ years of experience delivering IT solutions across sectors" },
                                    { title: "Certified Engineers", desc: "Team of certified professionals from Dell, HP, Cisco, and Microsoft" },
                                    { title: "End-to-End Support", desc: "From consultation to implementation and ongoing maintenance" },
                                    { title: "Scalable Solutions", desc: "Future-proof designs that grow with your business" },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600 shrink-0">
                                            ✓
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-navy-900">{item.title}</h3>
                                            <p className="text-sm text-slate-600">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-cyan-50 to-slate-100 rounded-2xl p-8 text-center">
                            <h3 className="text-2xl font-bold text-navy-900 mb-4">Need a Custom Solution?</h3>
                            <p className="text-slate-600 mb-6">
                                Our experts will analyze your requirements and design a tailored solution for your business.
                            </p>
                            <Button className="bg-cyan-500 hover:bg-cyan-600" asChild>
                                <Link href="/contact">
                                    Get a Free Consultation <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
