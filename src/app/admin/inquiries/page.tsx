"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Search, Eye, Mail, Phone, Calendar, Check, X, ChevronLeft, ChevronRight, RefreshCw, Loader2, Trash2, MessageSquare, Inbox, Clock, CheckCircle2 } from "lucide-react"

interface Inquiry {
    id: string
    name: string
    email: string
    phone: string
    message: string
    company?: string
    source: string
    product?: string
    status: string
    date: string
}

const ITEMS_PER_PAGE = 5

export default function AdminInquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
    const [isViewOpen, setIsViewOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    const fetchInquiries = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/inquiry')
            const data = await response.json()
            setInquiries(data.inquiries || [])
        } catch (error) {
            console.error('Error fetching inquiries:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchInquiries()
    }, [])

    const filteredInquiries = useMemo(() => {
        return inquiries.filter(i =>
            i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            i.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (i.message && i.message.toLowerCase().includes(searchQuery.toLowerCase()))
        )
    }, [inquiries, searchQuery])

    const totalPages = Math.ceil(filteredInquiries.length / ITEMS_PER_PAGE)
    const paginatedInquiries = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE
        return filteredInquiries.slice(start, start + ITEMS_PER_PAGE)
    }, [filteredInquiries, currentPage])

    const handleSearch = (value: string) => {
        setSearchQuery(value)
        setCurrentPage(1)
    }

    const handleStatusChange = async (id: string, status: string) => {
        try {
            const response = await fetch('/api/inquiry', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status })
            })
            if (response.ok) {
                setInquiries(inquiries.map(i => i.id === id ? { ...i, status } : i))
                if (selectedInquiry?.id === id) {
                    setSelectedInquiry({ ...selectedInquiry, status })
                }
            }
        } catch (error) {
            console.error('Error updating status:', error)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this inquiry?')) return
        try {
            const response = await fetch(`/api/inquiry?id=${id}`, { method: 'DELETE' })
            if (response.ok) {
                setInquiries(inquiries.filter(i => i.id !== id))
                setIsViewOpen(false)
            }
        } catch (error) {
            console.error('Error deleting inquiry:', error)
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "new": return <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>
            case "responded": return <Badge className="bg-amber-500 hover:bg-amber-600">Responded</Badge>
            case "closed": return <Badge className="bg-emerald-500 hover:bg-emerald-600">Closed</Badge>
            default: return <Badge>{status}</Badge>
        }
    }

    const getSourceBadge = (source: string) => {
        switch (source) {
            case "contact_page": return <Badge variant="outline" className="text-xs bg-slate-50">Contact Form</Badge>
            case "quote_modal": return <Badge variant="outline" className="text-xs bg-cyan-50 text-cyan-700">Quote Request</Badge>
            default: return <Badge variant="outline" className="text-xs">{source}</Badge>
        }
    }

    const stats = {
        total: inquiries.length,
        new: inquiries.filter(i => i.status === "new").length,
        responded: inquiries.filter(i => i.status === "responded").length,
        closed: inquiries.filter(i => i.status === "closed").length,
    }

    return (
        <div className="space-y-6 pt-14 lg:pt-0 pb-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-navy-900 flex items-center gap-3">
                        <MessageSquare className="h-8 w-8 text-cyan-500" />
                        Inquiries
                    </h1>
                    <p className="text-slate-500 mt-1">Manage customer inquiries and quote requests</p>
                </div>
                <Button variant="outline" size="sm" onClick={fetchInquiries} disabled={loading} className="border-slate-300">
                    <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-slate-50 to-white border-slate-200 shadow-sm">
                    <CardContent className="p-5">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Total Inquiries</p>
                                <p className="text-3xl font-bold text-navy-900 mt-1">
                                    {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : stats.total}
                                </p>
                            </div>
                            <div className="p-3 bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl shadow-lg">
                                <Inbox className="h-5 w-5 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100 shadow-sm">
                    <CardContent className="p-5">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">New</p>
                                <p className="text-3xl font-bold text-blue-600 mt-1">
                                    {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : stats.new}
                                </p>
                            </div>
                            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                                <MessageSquare className="h-5 w-5 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100 shadow-sm">
                    <CardContent className="p-5">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Responded</p>
                                <p className="text-3xl font-bold text-amber-600 mt-1">
                                    {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : stats.responded}
                                </p>
                            </div>
                            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg">
                                <Clock className="h-5 w-5 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-emerald-50 to-white border-emerald-100 shadow-sm">
                    <CardContent className="p-5">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Closed</p>
                                <p className="text-3xl font-bold text-emerald-600 mt-1">
                                    {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : stats.closed}
                                </p>
                            </div>
                            <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
                                <CheckCircle2 className="h-5 w-5 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Inquiries Table */}
            <Card className="shadow-lg border-slate-200 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-navy-900 to-navy-800 text-white">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            <Inbox className="h-5 w-5" />
                            All Inquiries ({filteredInquiries.length})
                        </CardTitle>
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-300" />
                            <Input
                                placeholder="Search inquiries..."
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
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-slate-50 text-left text-sm text-navy-900 border-b">
                                            <th className="py-4 px-6 font-semibold">Contact</th>
                                            <th className="py-4 px-4 font-semibold">Source</th>
                                            <th className="py-4 px-4 font-semibold">Message</th>
                                            <th className="py-4 px-4 font-semibold">Status</th>
                                            <th className="py-4 px-4 font-semibold">Date</th>
                                            <th className="py-4 px-6 font-semibold text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedInquiries.map((inquiry, index) => (
                                            <tr
                                                key={inquiry.id}
                                                className={`border-b last:border-0 hover:bg-cyan-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
                                            >
                                                <td className="py-4 px-6">
                                                    <div>
                                                        <p className="font-semibold text-navy-900">{inquiry.name}</p>
                                                        <p className="text-sm text-slate-500">{inquiry.email}</p>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4">
                                                    {getSourceBadge(inquiry.source)}
                                                </td>
                                                <td className="py-4 px-4">
                                                    <p className="text-sm text-slate-600 max-w-xs truncate">{inquiry.message}</p>
                                                </td>
                                                <td className="py-4 px-4">
                                                    {getStatusBadge(inquiry.status)}
                                                </td>
                                                <td className="py-4 px-4">
                                                    <p className="text-sm text-slate-500">{inquiry.date}</p>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-9 w-9 p-0 hover:bg-slate-100"
                                                            onClick={() => { setSelectedInquiry(inquiry); setIsViewOpen(true) }}
                                                        >
                                                            <Eye className="h-4 w-4 text-slate-600" />
                                                        </Button>
                                                        {inquiry.status !== "responded" && (
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-9 w-9 p-0 hover:bg-amber-100"
                                                                onClick={() => handleStatusChange(inquiry.id, "responded")}
                                                            >
                                                                <Check className="h-4 w-4 text-amber-600" />
                                                            </Button>
                                                        )}
                                                        {inquiry.status !== "closed" && (
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-9 w-9 p-0 hover:bg-emerald-100"
                                                                onClick={() => handleStatusChange(inquiry.id, "closed")}
                                                            >
                                                                <X className="h-4 w-4 text-emerald-600" />
                                                            </Button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Cards */}
                            <div className="md:hidden p-4 space-y-4">
                                {paginatedInquiries.map((inquiry) => (
                                    <div key={inquiry.id} className="border rounded-xl p-4 bg-white shadow-sm">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <p className="font-semibold text-navy-900">{inquiry.name}</p>
                                                    {getStatusBadge(inquiry.status)}
                                                </div>
                                                <p className="text-sm text-slate-500 mb-2">{inquiry.email}</p>
                                                <p className="text-sm text-slate-600 line-clamp-2">{inquiry.message}</p>
                                                <div className="flex items-center gap-2 mt-3">
                                                    {getSourceBadge(inquiry.source)}
                                                    <span className="text-xs text-slate-400">{inquiry.date}</span>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0"
                                                onClick={() => { setSelectedInquiry(inquiry); setIsViewOpen(true) }}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredInquiries.length === 0 && (
                                <div className="text-center py-16 text-slate-500">
                                    <Inbox className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                                    <p>No inquiries found</p>
                                </div>
                            )}

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-between p-4 border-t bg-slate-50/50">
                                    <p className="text-sm text-slate-500">
                                        Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredInquiries.length)} of {filteredInquiries.length}
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

            {/* View Inquiry Dialog */}
            <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader className="pb-4 border-b">
                        <DialogTitle className="text-xl">Inquiry Details</DialogTitle>
                    </DialogHeader>
                    {selectedInquiry && (
                        <div className="space-y-4 pt-2">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-lg font-semibold text-navy-900">{selectedInquiry.name}</p>
                                    {selectedInquiry.company && (
                                        <p className="text-sm text-slate-500">{selectedInquiry.company}</p>
                                    )}
                                </div>
                                {getStatusBadge(selectedInquiry.status)}
                            </div>

                            <div className="space-y-2 bg-slate-50 rounded-lg p-4">
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="h-4 w-4 text-cyan-500" />
                                    <a href={`mailto:${selectedInquiry.email}`} className="text-cyan-600 hover:underline">
                                        {selectedInquiry.email}
                                    </a>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Phone className="h-4 w-4 text-cyan-500" />
                                    <a href={`tel:${selectedInquiry.phone}`} className="text-cyan-600 hover:underline">
                                        {selectedInquiry.phone}
                                    </a>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Calendar className="h-4 w-4 text-cyan-500" />
                                    <span className="text-slate-600">{selectedInquiry.date}</span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                {getSourceBadge(selectedInquiry.source)}
                            </div>

                            <div className="p-4 bg-white border rounded-lg">
                                <p className="text-sm font-medium text-slate-700 mb-2">Message:</p>
                                <p className="text-slate-600">{selectedInquiry.message}</p>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t">
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(selectedInquiry.id)}
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                </Button>
                                <div className="flex gap-2">
                                    {selectedInquiry.status !== "responded" && (
                                        <Button
                                            size="sm"
                                            className="bg-amber-500 hover:bg-amber-600"
                                            onClick={() => handleStatusChange(selectedInquiry.id, "responded")}
                                        >
                                            Mark Responded
                                        </Button>
                                    )}
                                    {selectedInquiry.status !== "closed" && (
                                        <Button
                                            size="sm"
                                            className="bg-emerald-500 hover:bg-emerald-600"
                                            onClick={() => handleStatusChange(selectedInquiry.id, "closed")}
                                        >
                                            Mark Closed
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
