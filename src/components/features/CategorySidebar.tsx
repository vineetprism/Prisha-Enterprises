import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const categories = [
    { name: "All Products", slug: "all" },
    { name: "Servers", slug: "servers" },
    { name: "Laptops", slug: "laptops" },
    { name: "Workstations", slug: "workstations" },
    { name: "Networking", slug: "networking" },
    { name: "CCTV & Security", slug: "cctv" },
    { name: "Storage", slug: "storage" },
    { name: "Accessories", slug: "accessories" },
]

interface CategorySidebarProps {
    activeCategory: string
}

export function CategorySidebar({ activeCategory }: CategorySidebarProps) {
    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-lg text-brand-900 mb-4">Categories</h3>
            <div className="flex flex-col space-y-1">
                {categories.map((category) => (
                    <Button
                        key={category.slug}
                        variant="ghost"
                        asChild
                        className={cn(
                            "justify-start text-base font-normal",
                            activeCategory === category.slug
                                ? "bg-brand-50 text-brand-500 font-medium"
                                : "text-slate-600 hover:text-brand-500 hover:bg-brand-50/50"
                        )}
                    >
                        <Link href={`/products/${category.slug}`}>
                            {category.name}
                        </Link>
                    </Button>
                ))}
            </div>
        </div>
    )
}
