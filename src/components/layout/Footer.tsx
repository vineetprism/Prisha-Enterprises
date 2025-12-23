import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-navy-900 text-slate-200 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>

            <div className="container mx-auto px-4 py-12 md:px-6 relative z-10">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-block bg-white rounded-lg p-2">
                            <Image
                                src="/logo.png"
                                alt="Prisha Enterprises"
                                width={240}
                                height={64}
                                className="h-12 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-sm leading-relaxed text-slate-300">
                            Your trusted partner for IT hardware rentals, sales, and services.
                            Providing top-tier technology solutions for businesses of all sizes.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="hover:text-cyan-400 transition-colors p-2 rounded-lg hover:bg-white/5">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="hover:text-cyan-400 transition-colors p-2 rounded-lg hover:bg-white/5">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="hover:text-cyan-400 transition-colors p-2 rounded-lg hover:bg-white/5">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="hover:text-cyan-400 transition-colors p-2 rounded-lg hover:bg-white/5">
                                <Instagram className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/products/all" className="hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block">
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/solutions" className="hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block">
                                    Our Solutions
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block">
                                    Our Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Our Services</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/contact?service=rentals" className="hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block">
                                    IT Rentals
                                </Link>
                            </li>
                            <li>
                                <Link href="/solutions/security" className="hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block">
                                    CCTV Surveillance
                                </Link>
                            </li>
                            <li>
                                <Link href="/solutions/networking" className="hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block">
                                    Networking Solutions
                                </Link>
                            </li>
                            <li>
                                <Link href="/services/amc" className="hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block">
                                    Annual Maintenance (AMC)
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Contact Us</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-cyan-400 shrink-0" />
                                <span className="text-slate-300">
                                    House no 708/c, Gali No 17,
                                    <br />
                                    Ashok Vihar, Phase-2,
                                    <br />
                                    Gurgaon, Haryana 122001
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-cyan-400 shrink-0" />
                                <a href="tel:+917982646008" className="text-slate-300 hover:text-cyan-400 transition-colors">
                                    +91 7982646008
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-cyan-400 shrink-0" />
                                <a href="mailto:info@prishatech.in" className="text-slate-300 hover:text-cyan-400 transition-colors">
                                    info@prishatech.in
                                </a>
                            </li>
                        </ul>
                        <p className="text-xs text-slate-500 mt-2">
                            GSTIN: 06GGEPR7125B1ZI
                        </p>
                    </div>
                </div>

                <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <div className="flex flex-col items-center justify-between gap-4 md:flex-row text-xs text-slate-400">
                    <p>© {new Date().getFullYear()} Prisha Enterprises. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Designed & Developed with
                        <span className="text-cyan-400">♥</span>
                        by Prism Infoways Private Limited
                    </p>
                </div>
            </div>
        </footer>
    )
}
