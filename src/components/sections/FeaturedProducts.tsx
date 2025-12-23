import { ProductCard } from "@/components/features/ProductCard"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Featured Products - Show first 4
import { db } from "@/lib/db"

export async function FeaturedProducts() {
    const products = await db.product.findMany({
        where: {
            isFeatured: true
        },
        take: 4,
        orderBy: {
            createdAt: 'desc'
        }
    })

    // Transform if needed to match ProductCard props, but ProductCard expects:
    // { id, title, category, image, slug, isNew? }
    // DB returns: { id (Int), imageUrl, ... }

    const formattedProducts = products.map(p => ({
        id: String(p.id),
        title: p.title,
        category: p.category,
        image: p.imageUrl,
        slug: p.slug,
        isNew: p.isNew
    }))

    if (formattedProducts.length === 0) return null

    return (
        <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-cyan-50/30 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                    <div className="space-y-3">
                        <h2 className="text-4xl md:text-5xl font-bold text-navy-900">
                            Featured Inventory
                        </h2>
                        <p className="text-slate-600 max-w-lg text-lg">
                            Explore our top-rated hardware available for immediate rental or purchase.
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 group"
                        asChild
                    >
                        <Link href="/products/all">
                            View All Products
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {formattedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}
