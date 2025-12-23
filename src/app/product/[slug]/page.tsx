import { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductGallery } from "@/components/features/ProductGallery"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Truck, Check } from "lucide-react"
import { EnquiryModal } from "@/components/features/EnquiryModal"
import { db } from "@/lib/db"

interface PageProps {
    params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateStaticParams() {
    try {
        const products = await db.product.findMany({
            select: { slug: true }
        })
        return products.map((product) => ({
            slug: product.slug,
        }))
    } catch (error) {
        console.warn("Could not fetch products for static generation, falling back to on-demand rendering:", error)
        return []
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const product = await db.product.findUnique({
        where: { slug }
    })

    if (!product) {
        return { title: "Product Not Found" }
    }

    return {
        title: `${product.title} | Prisha Enterprises`,
        description: `Rent ${product.title} from Prisha Enterprises`,
    }
}

export default async function ProductPage({ params }: PageProps) {
    const { slug } = await params
    const product = await db.product.findUnique({
        where: { slug }
    })

    if (!product) {
        notFound()
    }

    // Parse parsing JSON specs
    let specs = {}
    try {
        specs = JSON.parse(product.specsJson || '{}')
    } catch (e) {
        console.error("Error parsing specs", e)
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <a href="/" className="hover:text-cyan-600">Home</a>
                        <span>/</span>
                        <a href={`/products/${product.category.toLowerCase()}`} className="hover:text-cyan-600">
                            {product.category}
                        </a>
                        <span>/</span>
                        <span className="text-navy-900 font-medium">{product.title}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Images */}
                    <div>
                        <ProductGallery images={[product.imageUrl]} title={product.title} />
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Badge variant="outline" className="text-cyan-600 border-cyan-200 bg-cyan-50">
                                    {product.category}
                                </Badge>
                                {product.isFeatured && (
                                    <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500">New</Badge>
                                )}
                                {product.status === "Low Stock" && (
                                    <Badge className="bg-amber-500">Low Stock</Badge>
                                )}
                                {product.status === "Out of Stock" && (
                                    <Badge className="bg-red-500">Out of Stock</Badge>
                                )}
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
                                {product.title}
                            </h1>
                            {product.shortDescription && (
                                <p className="text-xl text-slate-500 mb-4 font-light">
                                    {product.shortDescription}
                                </p>
                            )}
                            {product.rentalPrice && (
                                <div className="mb-4">
                                    <span className="text-sm text-slate-500">Rental Price</span>
                                    <p className="text-2xl font-bold text-cyan-600">₹{product.rentalPrice}/month</p>
                                </div>
                            )}
                            <div className="text-lg text-slate-600 leading-relaxed whitespace-pre-wrap">
                                {product.description || `${product.title} is a high-quality ${product.category} available for rent.`}
                            </div>
                        </div>

                        {/* Key Features */}
                        <div className="flex flex-wrap gap-4 py-4 border-y border-slate-200">
                            <div className="flex items-center gap-2 text-slate-700">
                                <Shield className="h-5 w-5 text-cyan-500" />
                                <span className="text-sm">Warranty Included</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-700">
                                <Truck className="h-5 w-5 text-cyan-500" />
                                <span className="text-sm">Free Installation</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-700">
                                <Check className="h-5 w-5 text-cyan-500" />
                                <span className="text-sm">24/7 Support</span>
                            </div>
                        </div>

                        {/* Specifications */}
                        {specs && Object.keys(specs).length > 0 && (
                            <div className="bg-slate-50 rounded-xl p-6">
                                <h2 className="text-lg font-semibold text-navy-900 mb-4">Specifications</h2>
                                <div className="grid grid-cols-1 gap-3">
                                    {Object.entries(specs).map(([key, value]) => (
                                        <div key={key} className="flex items-start justify-between py-2 border-b border-slate-200 last:border-0">
                                            <span className="text-slate-600 font-medium">{key}</span>
                                            <span className="text-navy-900 text-right max-w-[60%]">{value as React.ReactNode}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <EnquiryModal
                                trigger={
                                    <Button size="lg" className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 shadow-lg shadow-cyan-500/30 h-12 text-base">
                                        Get Rental Quote
                                    </Button>
                                }
                            />
                            <Button size="lg" variant="outline" className="flex-1 h-12 text-base border-navy-200 text-navy-900 hover:bg-navy-50" asChild>
                                <a href="/contact">Contact Sales</a>
                            </Button>
                        </div>

                        {/* Trust Indicators */}
                        <div className="bg-gradient-to-r from-navy-50 to-cyan-50 rounded-xl p-4 mt-6">
                            <p className="text-sm text-navy-700 text-center">
                                <strong>Trusted by 500+ businesses.</strong> Get personalized quotes within 24 hours.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
