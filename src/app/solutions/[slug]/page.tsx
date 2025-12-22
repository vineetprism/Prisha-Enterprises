import { Metadata } from "next"
import { notFound } from "next/navigation"
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
    ArrowRight,
    CheckCircle2
} from "lucide-react"

// Solutions data with full details
const solutions = [
    {
        slug: "it-infrastructure",
        title: "IT Infrastructure Solutions",
        subtitle: "Comprehensive IT Backbone Setup",
        description: "End-to-end IT infrastructure setup and management including servers, networking, storage, and end-user devices for seamless business operations.",
        icon: Server,
        image: "/solutions/it-infrastructure.jpg",
        features: [
            "Complete server room design and setup",
            "Structured cabling and network infrastructure",
            "Workstation and endpoint deployment",
            "Data center planning and implementation",
            "Disaster recovery infrastructure",
            "Cloud-hybrid infrastructure solutions"
        ],
        benefits: [
            { title: "Scalability", desc: "Easily scale your infrastructure as your business grows" },
            { title: "Reliability", desc: "99.9% uptime with redundant systems" },
            { title: "Cost Efficiency", desc: "Optimized TCO with right-sized solutions" },
        ],
        useCases: ["Corporate offices", "Data centers", "Educational institutions", "Healthcare facilities"]
    },
    {
        slug: "power-backup",
        title: "Power Backup Solutions",
        subtitle: "Uninterrupted Power Supply Systems",
        description: "Comprehensive power protection solutions including UPS, inverters, and power conditioning equipment to safeguard your critical IT assets from power disruptions.",
        icon: BatteryCharging,
        image: "/solutions/power-backup.jpg",
        features: [
            "Online/Offline UPS systems (1KVA to 500KVA)",
            "Industrial inverter installations",
            "Power conditioning and surge protection",
            "Battery backup management systems",
            "Generator synchronization panels",
            "Power monitoring and alerting"
        ],
        benefits: [
            { title: "Zero Downtime", desc: "Seamless power switchover in milliseconds" },
            { title: "Equipment Protection", desc: "Protect sensitive electronics from power surges" },
            { title: "Energy Efficiency", desc: "High-efficiency power systems reduce costs" },
        ],
        useCases: ["Server rooms", "Medical equipment", "Manufacturing plants", "Retail stores"]
    },
    {
        slug: "security",
        title: "Security Solutions",
        subtitle: "Physical & Digital Asset Protection",
        description: "Comprehensive security technologies to protect your physical premises and digital assets including CCTV, access control, and cybersecurity measures.",
        icon: Shield,
        image: "/solutions/security.jpg",
        features: [
            "IP and analog CCTV surveillance systems",
            "Biometric and RFID access control",
            "Video analytics and AI-powered monitoring",
            "Intrusion detection systems",
            "Fire and smoke detection integration",
            "Central monitoring station setup"
        ],
        benefits: [
            { title: "24/7 Protection", desc: "Round-the-clock surveillance and monitoring" },
            { title: "Deterrence", desc: "Visible security prevents incidents" },
            { title: "Evidence", desc: "HD recordings for investigations" },
        ],
        useCases: ["Offices", "Warehouses", "Retail outlets", "Residential complexes"]
    },
    {
        slug: "server-storage",
        title: "Server & Storage Solutions",
        subtitle: "Enterprise Data Infrastructure",
        description: "High-performance servers and enterprise storage solutions including NAS, SAN, and backup systems for reliable data management.",
        icon: Database,
        image: "/solutions/server-storage.jpg",
        features: [
            "Rack and tower server deployment",
            "NAS and SAN storage solutions",
            "Virtualization (VMware, Hyper-V)",
            "Backup and recovery systems",
            "High-availability clustering",
            "Storage tiering and optimization"
        ],
        benefits: [
            { title: "Performance", desc: "Enterprise-grade speed and reliability" },
            { title: "Data Protection", desc: "RAID and backup ensure data safety" },
            { title: "Flexibility", desc: "Scale storage on demand" },
        ],
        useCases: ["Data centers", "ERP hosting", "Database servers", "File servers"]
    },
    {
        slug: "networking",
        title: "Networking Solutions",
        subtitle: "Reliable Network Infrastructure",
        description: "Complete networking solutions including LAN/WAN design, structured cabling, routers, switches, and firewall configuration.",
        icon: Network,
        image: "/solutions/networking.jpg",
        features: [
            "LAN/WAN design and implementation",
            "Structured cabling (Cat6/Cat6A/Fiber)",
            "Managed switches and routers",
            "Firewall and security appliances",
            "Wireless network solutions",
            "SD-WAN and VPN connectivity"
        ],
        benefits: [
            { title: "Speed", desc: "Gigabit and 10G network capabilities" },
            { title: "Security", desc: "Enterprise-grade firewalls and segmentation" },
            { title: "Reliability", desc: "Redundant paths ensure uptime" },
        ],
        useCases: ["Corporate networks", "Campus connectivity", "Branch offices", "Retail chains"]
    },
    {
        slug: "conferencing",
        title: "Conferencing Solutions",
        subtitle: "Unified Communication Systems",
        description: "Professional audio-video conferencing setups for modern businesses including meeting room solutions, video walls, and collaboration tools.",
        icon: Video,
        image: "/solutions/conferencing.jpg",
        features: [
            "Video conferencing room setup",
            "Interactive flat panels and displays",
            "Audio conferencing systems",
            "Webinar and broadcast solutions",
            "Unified communication platforms",
            "Digital signage systems"
        ],
        benefits: [
            { title: "Collaboration", desc: "Seamless remote team communication" },
            { title: "Productivity", desc: "Reduce travel time and costs" },
            { title: "Professional", desc: "HD quality for client meetings" },
        ],
        useCases: ["Board rooms", "Training centers", "Town halls", "Customer briefing centers"]
    },
    {
        slug: "software",
        title: "Software Solutions",
        subtitle: "Business Application Licensing",
        description: "Licensing and installation of essential business software including Microsoft 365, antivirus, accounting software, and enterprise applications.",
        icon: Package,
        image: "/solutions/software.jpg",
        features: [
            "Microsoft 365 and Windows licensing",
            "Endpoint security and antivirus",
            "Accounting software (Tally, SAP)",
            "Productivity suites deployment",
            "License management and compliance",
            "Software asset management"
        ],
        benefits: [
            { title: "Compliance", desc: "Always licensed and audit-ready" },
            { title: "Support", desc: "Official vendor support channels" },
            { title: "Updates", desc: "Automatic security and feature updates" },
        ],
        useCases: ["All businesses", "Remote teams", "Finance departments", "IT departments"]
    },
]

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const solution = solutions.find(s => s.slug === slug)

    if (!solution) return { title: "Solution Not Found" }

    return {
        title: `${solution.title} | Prisha Enterprises`,
        description: solution.description,
    }
}

export async function generateStaticParams() {
    return solutions.map(s => ({ slug: s.slug }))
}

export default async function SolutionDetailPage({ params }: PageProps) {
    const { slug } = await params
    const solution = solutions.find(s => s.slug === slug)

    if (!solution) notFound()

    const IconComponent = solution.icon

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero */}
            <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-cyan-900 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl">
                        <Badge className="bg-cyan-500/20 text-cyan-300 mb-4">{solution.subtitle}</Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">{solution.title}</h1>
                        <p className="text-xl text-cyan-100 mb-8">{solution.description}</p>
                        <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600" asChild>
                            <Link href={`/contact?solution=${solution.slug}`}>
                                Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-navy-900 mb-8">What We Offer</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {solution.features.map((feature, i) => (
                            <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                                <CheckCircle2 className="h-5 w-5 text-cyan-500 shrink-0 mt-0.5" />
                                <span className="text-slate-700">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-navy-900 mb-8">Key Benefits</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {solution.benefits.map((benefit, i) => (
                            <div key={i} className="text-center p-6 rounded-xl bg-gradient-to-b from-cyan-50 to-white border border-cyan-100">
                                <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <IconComponent className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-navy-900 mb-2">{benefit.title}</h3>
                                <p className="text-slate-600">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-navy-900 mb-8">Ideal For</h2>
                    <div className="flex flex-wrap gap-4">
                        {solution.useCases.map((useCase, i) => (
                            <Badge key={i} variant="secondary" className="text-lg py-2 px-4 bg-slate-100">
                                {useCase}
                            </Badge>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-navy-900 to-cyan-900 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Implement This Solution?</h2>
                    <p className="text-cyan-100 mb-8 max-w-xl mx-auto">
                        Contact our experts for a free consultation and customized proposal.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button size="lg" className="bg-white text-navy-900 hover:bg-cyan-50" asChild>
                            <Link href="/contact">Contact Us</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy-900" asChild>
                            <Link href="/solutions">View All Solutions</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
