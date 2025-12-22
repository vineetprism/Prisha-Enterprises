"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, MessageSquare, Users, TrendingUp, Eye, ArrowRight, Loader2, LayoutDashboard, Sparkles } from "lucide-react"
import Link from "next/link"

interface Inquiry {
    id: string
    name: string
    message: string
    date: string
    status: string
}

interface Product {
    id: string
    title: string
    category: string
    status: string
}

const getStatusBadge = (status: string) => {
    switch (status) {
        case "new": return <Badge className="bg-blue-500 hover:bg-blue-600 text-xs">New</Badge>
        case "responded": return <Badge className="bg-amber-500 hover:bg-amber-600 text-xs">Responded</Badge>
        case "closed": return <Badge className="bg-emerald-500 hover:bg-emerald-600 text-xs">Closed</Badge>
        default: return <Badge className="text-xs">{status}</Badge>
    }
}

export default function AdminDashboard() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([])
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [inqRes, prodRes] = await Promise.all([
                    fetch('/api/inquiry'),
                    fetch('/api/products')
                ])
                const inqData = await inqRes.json()
                const prodData = await prodRes.json()
                setInquiries(inqData.inquiries || [])
                setProducts(prodData.products || [])
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const stats = [
        {
            title: "Total Products",
            value: products.length.toString(),
            icon: Package,
            change: `${products.filter(p => p.status === 'Active').length} active`,
            gradient: "from-blue-500 to-blue-600",
            bgGradient: "from-blue-50 to-white",
        },
        {
            title: "New Inquiries",
            value: inquiries.filter(i => i.status === 'new').length.toString(),
            icon: MessageSquare,
            change: `${inquiries.length} total`,
            gradient: "from-amber-500 to-orange-500",
            bgGradient: "from-amber-50 to-white",
        },
        {
            title: "Active Rentals",
            value: "12",
            icon: Users,
            change: "+3 this week",
            gradient: "from-emerald-500 to-emerald-600",
            bgGradient: "from-emerald-50 to-white",
        },
        {
            title: "Est. Revenue",
            value: "₹8.5L",
            icon: TrendingUp,
            change: "+15% growth",
            gradient: "from-cyan-500 to-cyan-600",
            bgGradient: "from-cyan-50 to-white",
        },
    ]

    return (
        <div className="space-y-6 pt-14 lg:pt-0 pb-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-navy-900 flex items-center gap-3">
                        <LayoutDashboard className="h-8 w-8 text-cyan-500" />
                        Dashboard
                    </h1>
                    <p className="text-slate-500 mt-1">Welcome back! Here's what's happening today.</p>
                </div>
                <div className="text-sm text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
                    {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Card key={index} className={`bg-gradient-to-br ${stat.bgGradient} border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300`}>
                        <CardContent className="p-5">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                                    <p className="text-3xl font-bold text-navy-900 mt-1">
                                        {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : stat.value}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-2">{stat.change}</p>
                                </div>
                                <div className={`p-3 bg-gradient-to-br ${stat.gradient} rounded-xl shadow-lg`}>
                                    <stat.icon className="h-5 w-5 text-white" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-7">
                {/* Recent Inquiries */}
                <Card className="lg:col-span-4 shadow-lg border-slate-200 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-navy-900 to-navy-800 text-white">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <MessageSquare className="h-5 w-5" />
                                Recent Inquiries
                            </CardTitle>
                            <Button variant="ghost" size="sm" className="text-cyan-300 hover:text-white hover:bg-white/10" asChild>
                                <Link href="/admin/inquiries">
                                    View All <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="h-6 w-6 animate-spin text-cyan-500" />
                            </div>
                        ) : (
                            <div className="divide-y">
                                {inquiries.slice(0, 5).map((inquiry, index) => (
                                    <div key={inquiry.id} className={`flex items-center justify-between p-4 hover:bg-cyan-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-navy-900">{inquiry.name}</p>
                                            <p className="text-sm text-slate-500 truncate max-w-xs">{inquiry.message}</p>
                                        </div>
                                        <div className="flex items-center gap-3 shrink-0">
                                            {getStatusBadge(inquiry.status)}
                                            <span className="text-xs text-slate-400 hidden sm:block">{inquiry.date}</span>
                                        </div>
                                    </div>
                                ))}
                                {inquiries.length === 0 && (
                                    <div className="py-8 text-center text-slate-500">No inquiries yet</div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Popular Products */}
                <Card className="lg:col-span-3 shadow-lg border-slate-200 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-cyan-600 to-cyan-500 text-white">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <Sparkles className="h-5 w-5" />
                                Top Products
                            </CardTitle>
                            <Button variant="ghost" size="sm" className="text-cyan-100 hover:text-white hover:bg-white/10" asChild>
                                <Link href="/admin/products">
                                    View All <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="h-6 w-6 animate-spin text-cyan-500" />
                            </div>
                        ) : (
                            <div className="divide-y">
                                {products.slice(0, 5).map((product, index) => (
                                    <div key={product.id} className={`flex items-center gap-4 p-4 hover:bg-cyan-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm ${index < 3 ? 'bg-gradient-to-br from-amber-400 to-amber-600' : 'bg-slate-400'}`}>
                                            {index + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-navy-900 truncate text-sm">{product.title}</p>
                                            <p className="text-xs text-slate-500">{product.category}</p>
                                        </div>
                                        <Badge variant="outline" className="text-xs shrink-0">{product.status}</Badge>
                                    </div>
                                ))}
                                {products.length === 0 && (
                                    <div className="py-8 text-center text-slate-500">No products yet</div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card className="shadow-lg border-slate-200 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-100 to-slate-50 border-b">
                    <CardTitle className="text-lg font-semibold text-navy-900">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="flex flex-wrap gap-3">
                        <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 shadow-lg shadow-cyan-500/30" asChild>
                            <Link href="/admin/products">
                                <Package className="mr-2 h-4 w-4" /> Manage Products
                            </Link>
                        </Button>
                        <Button variant="outline" className="border-navy-200 hover:bg-navy-50" asChild>
                            <Link href="/admin/inquiries">
                                <MessageSquare className="mr-2 h-4 w-4" /> View Inquiries
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/admin/settings">
                                Settings
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/" target="_blank">
                                <Eye className="mr-2 h-4 w-4" /> View Website
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
