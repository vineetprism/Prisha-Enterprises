import { CategorySidebar } from "@/components/features/CategorySidebar"
import { ProductGrid } from "@/components/features/ProductGrid"

import { db } from "@/lib/db"

interface PageProps {
    params: Promise<{
        category: string
    }>
}

export const revalidate = 0 // Disable cache for real-time updates

export default async function ProductListingPage({ params }: PageProps) {
    const { category } = await params

    const where = category === "all" ? {} : { category: { equals: category, mode: 'insensitive' } }

    // Fetch from Database
    const products = await db.product.findMany({
        where,
        orderBy: { createdAt: 'desc' }
    })

    // Transform database shape to frontend shape if needed
    const filteredProducts = products.map(p => ({
        id: String(p.id),
        title: p.title,
        category: p.category,
        image: p.imageUrl,
        slug: p.slug,
        slug: p.slug,
        isNew: p.isNew || p.isFeatured, // Show tag if either is true
        rentalPrice: p.rentalPrice
    }))

    const categoryTitle = category === "all"
        ? "All Products"
        : category.charAt(0).toUpperCase() + category.slice(1)

    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full md:w-64 shrink-0">
                    <CategorySidebar activeCategory={category} />
                </aside>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-navy-900 mb-2">{categoryTitle}</h1>
                        <p className="text-slate-500">
                            Showing {filteredProducts.length} results
                        </p>
                    </div>

                    <ProductGrid products={filteredProducts} />
                </div>
            </div>
        </div>
    )
}
