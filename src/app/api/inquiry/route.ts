import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
    try {
        const inquiries = await db.inquiry.findMany({
            orderBy: { createdAt: 'desc' }
        })

        // Format dates for frontend compatibility
        const formattedInquiries = inquiries.map(inquiry => ({
            ...inquiry,
            id: String(inquiry.id),
            date: inquiry.createdAt.toLocaleString('en-IN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            })
        }))

        return NextResponse.json({ inquiries: formattedInquiries })
    } catch (error) {
        console.error('Error fetching inquiries:', error)
        return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()

        const inquiry = await db.inquiry.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                message: data.message || '',
                company: data.company,
                source: data.source || 'contact_page',
                product: data.product,
                status: 'new'
            }
        })

        return NextResponse.json({ success: true, inquiry: { ...inquiry, id: String(inquiry.id) } }, { status: 201 })
    } catch (error) {
        console.error('Error processing inquiry:', error)
        return NextResponse.json({ success: false, error: 'Failed to process inquiry' }, { status: 500 })
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const data = await request.json()
        const { id, status } = data

        const updated = await db.inquiry.update({
            where: { id: parseInt(id) },
            data: { status }
        })

        return NextResponse.json({ success: true, inquiry: { ...updated, id: String(updated.id) } })
    } catch (error) {
        console.error('Error updating status:', error)
        return NextResponse.json({ success: false, error: 'Failed to update' }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (id) {
            await db.inquiry.delete({
                where: { id: parseInt(id) }
            })
            return NextResponse.json({ success: true })
        }
        return NextResponse.json({ success: false, error: 'Inquiry ID required' }, { status: 400 })
    } catch (error) {
        console.error('Error deleting inquiry:', error)
        return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 500 })
    }
}
