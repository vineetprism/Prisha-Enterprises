import { CategorySidebar } from "@/components/features/CategorySidebar"
import { ProductGrid } from "@/components/features/ProductGrid"

// Mock Data - 10 Products
const allProducts = [
    {
        id: "1",
        title: "Dell PowerEdge R740 Server",
        category: "servers",
        image: "/products/server.jpg",
        slug: "dell-poweredge-r740",
        isNew: true,
    },
    {
        id: "2",
        title: "MacBook Pro 16 M3 Max",
        category: "laptops",
        image: "/products/macbook.jpg",
        slug: "macbook-pro-16-m3",
    },
    {
        id: "3",
        title: "Cisco Catalyst 9300 Switch",
        category: "networking",
        image: "/products/switch.jpg",
        slug: "cisco-catalyst-9300",
    },
    {
        id: "4",
        title: "HP Z8 G4 Workstation",
        category: "workstations",
        image: "/products/workstation.jpg",
        slug: "hp-z8-g4",
        isNew: true,
    },
    {
        id: "5",
        title: "Hikvision 4K NVR System",
        category: "cctv",
        image: "/products/nvr.jpg",
        slug: "hikvision-4k-nvr",
    },
    {
        id: "6",
        title: "Dell Latitude 7440 Business Laptop",
        category: "laptops",
        image: "/products/dell-laptop.jpg",
        slug: "dell-latitude-7440",
        isNew: true,
    },
    {
        id: "7",
        title: "HPE ProLiant DL380 Gen10 Server",
        category: "servers",
        image: "/products/hpe-server.jpg",
        slug: "hpe-proliant-dl380",
    },
    {
        id: "8",
        title: "Lenovo ThinkStation P620",
        category: "workstations",
        image: "/products/lenovo-workstation.jpg",
        slug: "lenovo-thinkstation-p620",
    },
    {
        id: "9",
        title: "TP-Link Omada Business Router",
        category: "networking",
        image: "/products/router.jpg",
        slug: "tplink-omada-router",
    },
    {
        id: "10",
        title: "Dahua 8-Channel PTZ Camera Kit",
        category: "cctv",
        image: "/products/dahua-cctv.jpg",
        slug: "dahua-ptz-camera-kit",
        isNew: true,
    },
]

export const revalidate = 60

interface PageProps {
    params: Promise<{
        category: string
    }>
}

export async function generateStaticParams() {
    return [
        { category: "all" },
        { category: "servers" },
        { category: "laptops" },
        { category: "workstations" },
        { category: "networking" },
        { category: "cctv" },
    ]
}

export default async function ProductListingPage({ params }: PageProps) {
    const { category } = await params

    const filteredProducts = category === "all"
        ? allProducts
        : allProducts.filter(p => p.category === category)

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
