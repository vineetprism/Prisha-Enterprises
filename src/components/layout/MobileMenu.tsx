"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

interface MobileMenuProps {
    items: {
        label: string
        href: string
    }[]
}

export function MobileMenu({ items }: MobileMenuProps) {
    const [open, setOpen] = React.useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="text-left">
                    <SheetTitle className="text-brand-900 font-bold text-xl">
                        Prisha Enterprises
                    </SheetTitle>
                </SheetHeader>
                <Separator className="my-4" />
                <nav className="flex flex-col gap-4">
                    {items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-lg font-medium hover:text-brand-500 transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Separator className="my-2" />
                    <Button className="w-full bg-brand-500 hover:bg-brand-400 text-white">
                        Get a Quote
                    </Button>
                </nav>
            </SheetContent>
        </Sheet>
    )
}
