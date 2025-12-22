"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
    product: {
        id: string
        title: string
        category: string
        image: string
        slug: string
        isNew?: boolean
    }
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Card className="group overflow-hidden border-slate-200 hover:shadow-xl transition-all duration-300 hover:border-cyan-200">
            <CardHeader className="p-0">
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                    {product.isNew && (
                        <Badge className="absolute top-3 left-3 z-10 bg-cyan-500 hover:bg-cyan-600 border-0">
                            New Arrival
                        </Badge>
                    )}
                    {/* Placeholder for Product Image */}
                    <div className="w-full h-full flex items-center justify-center text-slate-400 group-hover:scale-105 transition-transform duration-500">
                        <span className="text-xs font-medium">Product Image</span>
                    </div>
                    {/* 
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    */}
                </div>
            </CardHeader>
            <CardContent className="p-5">
                <div className="text-xs font-semibold text-cyan-600 mb-2 uppercase tracking-wider">
                    {product.category}
                </div>
                <h3 className="font-bold text-lg text-navy-900 line-clamp-2 group-hover:text-cyan-700 transition-colors">
                    <Link href={`/product/${product.slug}`}>
                        {product.title}
                    </Link>
                </h3>
            </CardContent>
            <CardFooter className="p-5 pt-0">
                <Button
                    asChild
                    className="w-full bg-navy-900 hover:bg-cyan-600 text-white transition-colors"
                >
                    <Link href={`/product/${product.slug}`}>
                        View Details
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
