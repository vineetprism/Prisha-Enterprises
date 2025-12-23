"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Pencil, Trash2, Search, Eye, ChevronLeft, ChevronRight, Package, Loader2, RefreshCw, Star, Sparkles } from "lucide-react"

interface Product {
    id: string
    title: string
    slug: string
    category: string
    description: string
    shortDescription?: string
    specs: Record<string, string>
    images: string[]
    imageUrl?: string // Add this to handle direct mapping
    rentalPrice?: string
    isNew?: boolean
    isFeatured?: boolean
    status: string
}

const CATEGORIES = ["Servers", "Laptops", "Workstations", "Networking", "CCTV", "Storage", "Power"]
const ITEMS_PER_PAGE = 6

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [editProduct, setEditProduct] = useState<Product | null>(null)
    const [saving, setSaving] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    const [formData, setFormData] = useState({
        title: "",
        category: "Servers",
        description: "",
        shortDescription: "",
        rentalPrice: "",
        specs: "",
        imageUrl: "",
        isNew: false,
        isFeatured: false,
        status: "Active"
    })

    const fetchProducts = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/products')
            const data = await response.json()
            setProducts(data.products || [])
        } catch (error) {
            console.error('Error fetching products:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const filteredProducts = useMemo(() => {
        return products.filter(p =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [products, searchQuery])

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE
        return filteredProducts.slice(start, start + ITEMS_PER_PAGE)
    }, [filteredProducts, currentPage])

    const handleSearch = (value: string) => {
        setSearchQuery(value)
        setCurrentPage(1)
    }

    const resetForm = () => {
        setFormData({
            title: "",
            category: "Servers",
            description: "",
            shortDescription: "",
            rentalPrice: "",
            specs: "",
            imageUrl: "",
            isNew: false,
            isFeatured: false,
            status: "Active"
        })
    }

    const handleAddProduct = async () => {
        setSaving(true)
        try {
            // Parse specs from string to object
            const specsObj: Record<string, string> = {}
            formData.specs.split('\n').forEach(line => {
                const [key, value] = line.split(':').map(s => s.trim())
                if (key && value) specsObj[key] = value
            })

            const response = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    specs: specsObj,
                    images: formData.imageUrl ? [formData.imageUrl] : ['/products/placeholder.jpg']
                })
            })

            if (response.ok) {
                await fetchProducts()
                setIsAddOpen(false)
                resetForm()
            }
        } catch (error) {
            console.error('Error adding product:', error)
        } finally {
            setSaving(false)
        }
    }

    const handleEditProduct = async () => {
        if (!editProduct) return
        setSaving(true)
        try {
            const specsObj: Record<string, string> = {}
            formData.specs.split('\n').forEach(line => {
                const [key, value] = line.split(':').map(s => s.trim())
                if (key && value) specsObj[key] = value
            })

            const response = await fetch('/api/products', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: editProduct.id,
                    ...formData,
                    specs: specsObj,
                    images: formData.imageUrl ? [formData.imageUrl] : undefined
                })
            })

            if (response.ok) {
                await fetchProducts()
                setIsEditOpen(false)
                setEditProduct(null)
                resetForm()
            }
        } catch (error) {
            console.error('Error updating product:', error)
        } finally {
            setSaving(false)
        }
    }

    const handleDeleteProduct = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return
        try {
            const response = await fetch(`/api/products?id=${id}`, { method: 'DELETE' })
            if (response.ok) {
                await fetchProducts()
            }
        } catch (error) {
            console.error('Error deleting product:', error)
        }
    }

    const openEditModal = (product: Product) => {
        setEditProduct(product)
        // Check both locations for image
        let img = "";
        if (product.images && product.images.length > 0) {
            img = product.images[0];
        } else if (product.imageUrl) {
            // Fallback for types that might have imageUrl directly
            img = product.imageUrl;
        }

        setFormData({
            title: product.title,
            category: product.category,
            description: product.description || "",
            shortDescription: product.shortDescription || "",
            rentalPrice: product.rentalPrice || "",
            specs: Object.entries(product.specs || {}).map(([k, v]) => `${k}: ${v}`).join('\n'),
            imageUrl: img,
            isNew: product.isNew || false,
            isFeatured: product.isFeatured || false,
            status: product.status || "Active"
        })
        setIsEditOpen(true)
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active": return "bg-emerald-500 hover:bg-emerald-600"
            case "Low Stock": return "bg-amber-500 hover:bg-amber-600"
            case "Out of Stock": return "bg-red-500 hover:bg-red-600"
            default: return "bg-slate-500"
        }
    }

    const stats = {
        total: products.length,
        active: products.filter(p => p.status === "Active").length,
        featured: products.filter(p => p.isFeatured).length,
        new: products.filter(p => p.isNew).length
    }

    return (
        <div className="space-y-6 pt-14 lg:pt-0 pb-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-navy-900">Products</h1>
                    <p className="text-slate-500 mt-1">Manage your product catalog</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={fetchProducts} disabled={loading}>
                        <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                    <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 shadow-lg shadow-cyan-500/30" onClick={() => { resetForm(); setIsAddOpen(true) }}>
                        <Plus className="mr-2 h-4 w-4" /> Add Product
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-slate-50 to-white border-slate-200">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-slate-100 rounded-xl">
                            <Package className="h-6 w-6 text-slate-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Total Products</p>
                            <p className="text-2xl font-bold text-navy-900">{stats.total}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-emerald-50 to-white border-emerald-100">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-emerald-100 rounded-xl">
                            <Sparkles className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Active</p>
                            <p className="text-2xl font-bold text-emerald-600">{stats.active}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-amber-100 rounded-xl">
                            <Star className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Featured</p>
                            <p className="text-2xl font-bold text-amber-600">{stats.featured}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-cyan-50 to-white border-cyan-100">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-cyan-100 rounded-xl">
                            <Sparkles className="h-6 w-6 text-cyan-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">New</p>
                            <p className="text-2xl font-bold text-cyan-600">{stats.new}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Products Table */}
            <Card className="shadow-lg border-slate-200 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-navy-900 to-navy-800 text-white">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <CardTitle className="text-lg font-semibold">Product Inventory ({filteredProducts.length})</CardTitle>
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-300" />
                            <Input
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-navy-300 focus:bg-white focus:text-navy-900"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
                        </div>
                    ) : (
                        <>
                            {/* Desktop Table */}
                            <div className="hidden lg:block overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-slate-50 text-left text-sm text-navy-900 border-b">
                                            <th className="py-4 px-6 font-semibold">Product</th>
                                            <th className="py-4 px-4 font-semibold">Category</th>
                                            <th className="py-4 px-4 font-semibold">Price</th>
                                            <th className="py-4 px-4 font-semibold">Status</th>
                                            <th className="py-4 px-4 font-semibold">Tags</th>
                                            <th className="py-4 px-6 font-semibold text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedProducts.map((product, index) => (
                                            <tr
                                                key={product.id}
                                                className={`border-b last:border-0 hover:bg-cyan-50/50 transition-all duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
                                            >
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center shadow-inner">
                                                            <Package className="h-6 w-6 text-slate-400" />
                                                        </div>
                                                        <div className="max-w-xs">
                                                            <p className="font-semibold text-navy-900 truncate">{product.title}</p>
                                                            <p className="text-sm text-slate-500 truncate">{product.shortDescription || product.slug}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-200 font-medium">
                                                        {product.category}
                                                    </Badge>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <span className="font-semibold text-navy-900">{product.rentalPrice || '-'}</span>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <Badge className={getStatusColor(product.status)}>
                                                        {product.status}
                                                    </Badge>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <div className="flex gap-1">
                                                        {product.isNew && (
                                                            <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-xs">New</Badge>
                                                        )}
                                                        {product.isFeatured && (
                                                            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-xs">Featured</Badge>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-slate-100" asChild>
                                                            <a href={`/product/${product.slug}`} target="_blank">
                                                                <Eye className="h-4 w-4 text-slate-600" />
                                                            </a>
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-9 w-9 p-0 hover:bg-cyan-100"
                                                            onClick={() => openEditModal(product)}
                                                        >
                                                            <Pencil className="h-4 w-4 text-cyan-600" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-9 w-9 p-0 hover:bg-red-100"
                                                            onClick={() => handleDeleteProduct(product.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4 text-red-500" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Cards */}
                            <div className="lg:hidden p-4 space-y-4">
                                {paginatedProducts.map((product) => (
                                    <Card key={product.id} className="overflow-hidden">
                                        <CardContent className="p-4">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex-1">
                                                    <p className="font-semibold text-navy-900">{product.title}</p>
                                                    <p className="text-sm text-slate-500 mt-1">{product.rentalPrice || 'Price on request'}</p>
                                                    <div className="flex flex-wrap gap-2 mt-3">
                                                        <Badge variant="outline" className="text-xs">{product.category}</Badge>
                                                        <Badge className={`text-xs ${getStatusColor(product.status)}`}>{product.status}</Badge>
                                                        {product.isNew && <Badge className="bg-cyan-500 text-xs">New</Badge>}
                                                        {product.isFeatured && <Badge className="bg-amber-500 text-xs">Featured</Badge>}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => openEditModal(product)}>
                                                        <Pencil className="h-4 w-4 text-cyan-600" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleDeleteProduct(product.id)}>
                                                        <Trash2 className="h-4 w-4 text-red-500" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {filteredProducts.length === 0 && (
                                <div className="text-center py-16 text-slate-500">
                                    <Package className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                                    <p>No products found</p>
                                </div>
                            )}

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-between p-4 border-t bg-slate-50/50">
                                    <p className="text-sm text-slate-500">
                                        Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                            <Button
                                                key={page}
                                                variant={page === currentPage ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => setCurrentPage(page)}
                                                className={page === currentPage ? "bg-cyan-500 hover:bg-cyan-600" : ""}
                                            >
                                                {page}
                                            </Button>
                                        ))}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Add Product Dialog */}
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-xl">Add New Product</DialogTitle>
                        <DialogDescription>
                            Fill in the product details below
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Product Title *</Label>
                                <Input
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="e.g. Dell PowerEdge R740"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Category *</Label>
                                <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CATEGORIES.map(cat => (
                                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Short Description</Label>
                            <Input
                                value={formData.shortDescription}
                                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                                placeholder="Brief one-line description"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Full Description</Label>
                            <Textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Detailed product description..."
                                className="min-h-[100px]"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Product Image URL</Label>
                            <Input
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                placeholder="/products/server.jpg or https://example.com/image.jpg"
                            />
                            <p className="text-xs text-slate-500">Enter image path from /products folder or external URL</p>
                            <div className="mt-2">
                                <Input
                                    type="file"
                                    className="hidden"
                                    id="image-upload"
                                    accept="image/*"
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0]
                                        if (!file) return

                                        // Set loading state if you have one, or just show uploading text
                                        const formData = new FormData()
                                        formData.append('file', file)

                                        try {
                                            const res = await fetch('/api/upload', {
                                                method: 'POST',
                                                body: formData
                                            })
                                            const data = await res.json()

                                            if (data.url) {
                                                setFormData(prev => ({ ...prev, imageUrl: data.url }))
                                            }
                                        } catch (err) {
                                            console.error('Upload failed', err)
                                            alert('Upload failed')
                                        }
                                    }}
                                />
                                <Label
                                    htmlFor="image-upload"
                                    className="inline-flex cursor-pointer items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2"
                                >
                                    <span className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                                        Upload Image from Device
                                    </span>
                                </Label>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Rental Price</Label>
                                <Input
                                    value={formData.rentalPrice}
                                    onChange={(e) => setFormData({ ...formData, rentalPrice: e.target.value })}
                                    placeholder="₹5,000/month"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="Low Stock">Low Stock</SelectItem>
                                        <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Specifications (one per line, format: Key: Value)</Label>
                            <Textarea
                                value={formData.specs}
                                onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                                placeholder="Processor: Intel Xeon&#10;Memory: 64GB DDR4&#10;Storage: 1TB SSD"
                                className="min-h-[100px] font-mono text-sm"
                            />
                        </div>
                        <div className="flex gap-6">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="isNew"
                                    checked={formData.isNew}
                                    onCheckedChange={(c) => setFormData({ ...formData, isNew: c === true })}
                                />
                                <Label htmlFor="isNew" className="cursor-pointer">Mark as New</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="isFeatured"
                                    checked={formData.isFeatured}
                                    onCheckedChange={(c) => setFormData({ ...formData, isFeatured: c === true })}
                                />
                                <Label htmlFor="isFeatured" className="cursor-pointer">Featured Product</Label>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                        <Button
                            onClick={handleAddProduct}
                            disabled={saving || !formData.title}
                            className="bg-cyan-500 hover:bg-cyan-600"
                        >
                            {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : 'Add Product'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Product Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-xl">Edit Product</DialogTitle>
                        <DialogDescription>
                            Update product details
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Product Title *</Label>
                                <Input
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Category *</Label>
                                <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CATEGORIES.map(cat => (
                                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Short Description</Label>
                            <Input
                                value={formData.shortDescription}
                                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Full Description</Label>
                            <Textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="min-h-[100px]"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Product Image URL</Label>
                            <Input
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                placeholder="/products/server.jpg or https://example.com/image.jpg"
                            />
                            <p className="text-xs text-slate-500">Enter image path from /products folder or external URL</p>
                            <div className="mt-2">
                                <Input
                                    type="file"
                                    className="hidden"
                                    id="edit-image-upload"
                                    accept="image/*"
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0]
                                        if (!file) return

                                        const formData = new FormData()
                                        formData.append('file', file)

                                        try {
                                            const res = await fetch('/api/upload', {
                                                method: 'POST',
                                                body: formData
                                            })
                                            const data = await res.json()

                                            if (data.url) {
                                                setFormData(prev => ({ ...prev, imageUrl: data.url }))
                                            }
                                        } catch (err) {
                                            console.error('Upload failed', err)
                                            alert('Upload failed')
                                        }
                                    }}
                                />
                                <Label
                                    htmlFor="edit-image-upload"
                                    className="inline-flex cursor-pointer items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2"
                                >
                                    <span className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                                        Upload New Image
                                    </span>
                                </Label>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Rental Price</Label>
                                <Input
                                    value={formData.rentalPrice}
                                    onChange={(e) => setFormData({ ...formData, rentalPrice: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="Low Stock">Low Stock</SelectItem>
                                        <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Specifications (one per line, format: Key: Value)</Label>
                            <Textarea
                                value={formData.specs}
                                onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                                className="min-h-[100px] font-mono text-sm"
                            />
                        </div>
                        <div className="flex gap-6">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="editIsNew"
                                    checked={formData.isNew}
                                    onCheckedChange={(c) => setFormData({ ...formData, isNew: c === true })}
                                />
                                <Label htmlFor="editIsNew" className="cursor-pointer">Mark as New</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="editIsFeatured"
                                    checked={formData.isFeatured}
                                    onCheckedChange={(c) => setFormData({ ...formData, isFeatured: c === true })}
                                />
                                <Label htmlFor="editIsFeatured" className="cursor-pointer">Featured Product</Label>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
                        <Button
                            onClick={handleEditProduct}
                            disabled={saving || !formData.title}
                            className="bg-cyan-500 hover:bg-cyan-600"
                        >
                            {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
