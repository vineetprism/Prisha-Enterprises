"use client"

import { motion } from "framer-motion"
import { Target, Lightbulb, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
    const stats = [
        { label: "Years Experience", value: "15+" },
        { label: "Happy Clients", value: "500+" },
        { label: "Projects Done", value: "1200+" },
        { label: "Team Members", value: "50+" },
    ]

    const values = [
        { title: "Innovation", desc: "Embracing new technologies to solve complex challenges" },
        { title: "Integrity", desc: "Conducting business with transparency, honesty, and ethics" },
        { title: "Excellence", desc: "Striving for perfection in every product and service we deliver" },
    ]

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-b from-navy-900 to-navy-800 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.02]" />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-white"
                    >
                        About Prisha Enterprises
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-xl text-cyan-100 max-w-2xl mx-auto"
                    >
                        Your trusted partner in IT infrastructure solutions. Empowering businesses with cutting-edge technology.
                    </motion.p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                        >
                            <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-6">
                                <Target className="w-6 h-6 text-cyan-700" />
                            </div>
                            <h2 className="text-2xl font-bold text-navy-900 mb-4">Our Mission</h2>
                            <p className="text-slate-600 leading-relaxed">
                                To empower businesses by providing robust, scalable, and cost-effective IT hardware solutions.
                                We aim to bridge the gap between technology and business goals, ensuring our clients have the
                                infrastructure they need to thrive in a digital world.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                        >
                            <div className="w-12 h-12 bg-navy-100 rounded-xl flex items-center justify-center mb-6">
                                <Lightbulb className="w-6 h-6 text-navy-700" />
                            </div>
                            <h2 className="text-2xl font-bold text-navy-900 mb-4">Our Vision</h2>
                            <p className="text-slate-600 leading-relaxed">
                                To be the leading provider of innovative IT solutions, recognized for our integrity,
                                customer-centric approach, and commitment to excellence. We envision a future where
                                every business has access to world-class technology.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-navy-900 mb-4">Our Core Values</h2>
                        <p className="text-slate-600">The principles that guide every interaction and decision</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((value, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center p-6 bg-gradient-to-br from-slate-50 to-cyan-50/30 rounded-xl hover:shadow-md transition-shadow"
                            >
                                <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle2 className="w-6 h-6 text-cyan-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-navy-900 mb-2">{value.title}</h3>
                                <p className="text-slate-600">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gradient-to-b from-navy-900 to-navy-800 text-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-cyan-200 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-cyan-100">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-navy-900 mb-4">Ready to Transform Your IT Infrastructure?</h2>
                    <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                        Let's discuss how we can help your business grow with the right technology solutions.
                    </p>
                    <Button size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-white" asChild>
                        <Link href="/contact">Get in Touch</Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}
