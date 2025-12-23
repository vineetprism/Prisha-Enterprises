"use client"

import Link from "next/link"
import Image from "next/image"
import { MobileMenu } from "@/components/layout/MobileMenu"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { EnquiryModal } from "@/components/features/EnquiryModal"

// Mock data - will be fetched from DB later
const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products/all" },
    { label: "Solutions", href: "/solutions" },
    { label: "Services", href: "/services" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
]

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-cyan-900/20 bg-white text-navy-900 shadow-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                {/* Logo Area */}
                <Link href="/" className="flex items-center gap-2 group">
                    <Image
                        src="/logo.png"
                        alt="Prisha Enterprises"
                        width={250}
                        height={50}
                        className="h-12 w-auto object-contain"
                        priority
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium text-slate-700 hover:text-cyan-600 transition-colors relative group"
                        >
                            {item.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    {/* <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-600 hover:bg-slate-100 hover:text-slate-900 hidden sm:flex"
                    >
                        <Search className="h-5 w-5" />
                        <span className="sr-only">Search</span>
                    </Button> */}

                    {/* Get Quote Button with Modal */}
                    <EnquiryModal
                        trigger={
                            <Button className="hidden md:flex bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold shadow-lg shadow-cyan-500/30">
                                Get a Quote
                            </Button>
                        }
                    />

                    {/* Mobile Menu Trigger */}
                    <MobileMenu items={navItems} />
                </div>
            </div>
        </header >
    )
}
