import { NextRequest, NextResponse } from 'next/server'
import { addInquiry, getInquiries, updateInquiryStatus, deleteInquiry } from '@/lib/inquiries-store'

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()

        const inquiry = addInquiry({
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: data.message || '',
            company: data.company,
            source: data.source || 'contact_page',
            product: data.product
        })

        console.log('New inquiry received:', inquiry)

        return NextResponse.json({ success: true, inquiry }, { status: 201 })
    } catch (error) {
        console.error('Error processing inquiry:', error)
        return NextResponse.json({ success: false, error: 'Failed to process inquiry' }, { status: 500 })
    }
}

export async function GET() {
    const inquiries = getInquiries()
    return NextResponse.json({ inquiries })
}

export async function PATCH(request: NextRequest) {
    try {
        const { id, status } = await request.json()
        const updated = updateInquiryStatus(id, status)

        if (updated) {
            return NextResponse.json({ success: true, inquiry: updated })
        }
        return NextResponse.json({ success: false, error: 'Inquiry not found' }, { status: 404 })
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update' }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (id && deleteInquiry(id)) {
            return NextResponse.json({ success: true })
        }
        return NextResponse.json({ success: false, error: 'Inquiry not found' }, { status: 404 })
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 500 })
    }
}
