import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
    Monitor,
    Headphones,
    Wrench,
    Lock,
    LifeBuoy,
    ArrowRight,
    CheckCircle2,
    Clock,
    Users,
    Shield
} from "lucide-react"

// Services data with full details
const services = [
    {
        slug: "it-management",
        title: "IT Infrastructure Management",
        subtitle: "Continuous IT Monitoring & Maintenance",
        description: "Proactive monitoring and maintenance of your entire IT infrastructure to ensure optimal performance, minimize downtime, and maximize productivity.",
        icon: Monitor,
        features: [
            "24/7 infrastructure monitoring",
            "Proactive issue detection and resolution",
            "Patch management and updates",
            "Performance optimization",
            "Capacity planning and scaling",
            "Monthly health reports"
        ],
        slaLevels: [
            { name: "Bronze", response: "8 hours", resolution: "24 hours" },
            { name: "Silver", response: "4 hours", resolution: "12 hours" },
            { name: "Gold", response: "1 hour", resolution: "4 hours" },
        ],
        benefits: [
            { title: "Reduced Downtime", desc: "Proactive monitoring prevents issues before they impact business" },
            { title: "Cost Savings", desc: "Avoid expensive emergency repairs and replacements" },
            { title: "Expert Team", desc: "Access to certified IT professionals without hiring costs" },
        ]
    },
    {
        slug: "consulting",
        title: "IT Consulting Services",
        subtitle: "Strategic Technology Advisory",
        description: "Expert guidance to align your IT investments with business objectives. From digital transformation to cost optimization strategies.",
        icon: Headphones,
        features: [
            "IT strategy and roadmap development",
            "Digital transformation consulting",
            "Technology assessment and audits",
            "Vendor evaluation and selection",
            "Budget planning and optimization",
            "Compliance consulting (ISO, GDPR)"
        ],
        slaLevels: [
            { name: "Project", response: "Per engagement", resolution: "As scoped" },
            { name: "Retainer", response: "24 hours", resolution: "Weekly reviews" },
            { name: "Virtual CIO", response: "Same day", resolution: "Ongoing" },
        ],
        benefits: [
            { title: "Strategic Alignment", desc: "IT investments aligned with business goals" },
            { title: "Cost Optimization", desc: "Identify savings and eliminate waste" },
            { title: "Future-Ready", desc: "Technology roadmap for growth" },
        ]
    },
    {
        slug: "amc",
        title: "Repair & AMC Services",
        subtitle: "Annual Maintenance Contracts",
        description: "Comprehensive maintenance contracts covering preventive maintenance, repairs, and support for all your IT hardware assets.",
        icon: Wrench,
        features: [
            "Preventive maintenance schedules",
            "On-site hardware repairs",
            "Spare parts management",
            "Desktop and laptop support",
            "Server and network maintenance",
            "Printer and peripheral support"
        ],
        slaLevels: [
            { name: "Standard AMC", response: "NBD", resolution: "48 hours" },
            { name: "Premium AMC", response: "4 hours", resolution: "8 hours" },
            { name: "Comprehensive", response: "2 hours", resolution: "4 hours" },
        ],
        benefits: [
            { title: "Predictable Costs", desc: "Fixed annual fees, no surprise repair bills" },
            { title: "Extended Life", desc: "Regular maintenance extends equipment life" },
            { title: "Priority Service", desc: "AMC customers get priority support" },
        ]
    },
    {
        slug: "security-management",
        title: "IT Security Management",
        subtitle: "Managed Cybersecurity Services",
        description: "Comprehensive cybersecurity services including threat monitoring, firewall management, endpoint protection, and security audits.",
        icon: Lock,
        features: [
            "Firewall and UTM management",
            "Endpoint detection and response (EDR)",
            "Security incident monitoring",
            "Vulnerability assessments",
            "Security awareness training",
            "Compliance audits and reporting"
        ],
        slaLevels: [
            { name: "Essential", response: "4 hours", resolution: "24 hours" },
            { name: "Professional", response: "1 hour", resolution: "8 hours" },
            { name: "Enterprise", response: "15 mins", resolution: "2 hours" },
        ],
        benefits: [
            { title: "Protection", desc: "24/7 threat monitoring and response" },
            { title: "Compliance", desc: "Meet regulatory requirements" },
            { title: "Peace of Mind", desc: "Expert security team on your side" },
        ]
    },
    {
        slug: "helpdesk",
        title: "Help Desk IT Services",
        subtitle: "24/7 Technical Support",
        description: "Round-the-clock technical support for your users. Remote and on-site assistance with ticketing system and SLA-based resolution.",
        icon: LifeBuoy,
        features: [
            "24/7 phone and email support",
            "Remote desktop assistance",
            "Ticketing system with tracking",
            "User onboarding and training",
            "Password and access management",
            "Software installation support"
        ],
        slaLevels: [
            { name: "Basic", response: "8 hours", resolution: "NBD" },
            { name: "Business", response: "2 hours", resolution: "8 hours" },
            { name: "Premium", response: "30 mins", resolution: "2 hours" },
        ],
        benefits: [
            { title: "Always Available", desc: "Support when your team needs it" },
            { title: "Faster Resolution", desc: "Expert help reduces downtime" },
            { title: "User Satisfaction", desc: "Happy employees, higher productivity" },
        ]
    },
]

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const service = services.find(s => s.slug === slug)

    if (!service) return { title: "Service Not Found" }

    return {
        title: `${service.title} | Prisha Enterprises`,
        description: service.description,
    }
}

export async function generateStaticParams() {
    return services.map(s => ({ slug: s.slug }))
}

export default async function ServiceDetailPage({ params }: PageProps) {
    const { slug } = await params
    const service = services.find(s => s.slug === slug)

    if (!service) notFound()

    const IconComponent = service.icon

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero */}
            <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-cyan-900 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl">
                        <Badge className="bg-cyan-500/20 text-cyan-300 mb-4">{service.subtitle}</Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">{service.title}</h1>
                        <p className="text-xl text-cyan-100 mb-8">{service.description}</p>
                        <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600" asChild>
                            <Link href={`/contact?service=${service.slug}`}>
                                Get Started <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-navy-900 mb-8">Service Features</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {service.features.map((feature, i) => (
                            <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                                <CheckCircle2 className="h-5 w-5 text-cyan-500 shrink-0 mt-0.5" />
                                <span className="text-slate-700">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SLA Levels */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-navy-900 mb-8">Service Level Options</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {service.slaLevels.map((sla, i) => (
                            <div key={i} className={`p-6 rounded-xl border-2 ${i === 2 ? 'border-cyan-500 bg-cyan-50' : 'border-slate-200 bg-white'}`}>
                                <h3 className="text-xl font-bold text-navy-900 mb-4">{sla.name}</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-cyan-500" />
                                        <span className="text-sm text-slate-600">Response: <strong>{sla.response}</strong></span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Shield className="h-4 w-4 text-cyan-500" />
                                        <span className="text-sm text-slate-600">Resolution: <strong>{sla.resolution}</strong></span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-navy-900 mb-8">Key Benefits</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {service.benefits.map((benefit, i) => (
                            <div key={i} className="text-center p-6 rounded-xl bg-white shadow-sm">
                                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <IconComponent className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-navy-900 mb-2">{benefit.title}</h3>
                                <p className="text-slate-600">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-navy-900 to-cyan-900 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="text-cyan-100 mb-8 max-w-xl mx-auto">
                        Contact us for a customized service proposal tailored to your business needs.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button size="lg" className="bg-white text-navy-900 hover:bg-cyan-50" asChild>
                            <Link href="/contact">Request a Quote</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                            <Link href="/services">View All Services</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
