import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const id = searchParams.get('id')

    try {
        if (id) {
            const product = await db.product.findUnique({ where: { id: parseInt(id) } })
            if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })
            return NextResponse.json({ product: { ...product, specs: JSON.parse(product.specsJson || '{}'), id: String(product.id) } })
        }

        if (slug) {
            const product = await db.product.findUnique({ where: { slug } })
            return product
                ? NextResponse.json({ product: { ...product, specs: JSON.parse(product.specsJson || '{}'), id: String(product.id) } })
                : NextResponse.json({ error: 'Product not found' }, { status: 404 })
        }

        const where: any = {}
        if (category && category !== 'all') {
            where.category = { equals: category, mode: 'insensitive' }
        }
        if (featured === 'true') {
            where.isFeatured = true
        }

        const products = await db.product.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        })

        const formattedProducts = products.map(p => ({
            ...p,
            id: String(p.id),
            specs: JSON.parse(p.specsJson || '{}')
        }))

        return NextResponse.json({ products: formattedProducts })
    } catch (error) {
        console.error('Error fetching products:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()

        const product = await db.product.create({
            data: {
                title: data.title,
                slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                category: data.category,
                description: data.description,
                shortDescription: data.shortDescription,
                status: data.status || 'Active',
                specsJson: JSON.stringify(data.specs || {}),
                imageUrl: data.images?.[0] || data.imageUrl || '/products/placeholder.jpg',
                rentalPrice: data.rentalPrice,
                isFeatured: data.isFeatured || false,
                isNew: data.isNew || false,
            }
        })

        return NextResponse.json({ success: true, product: { ...product, id: String(product.id) } }, { status: 201 })
    } catch (error) {
        console.error('Error adding product:', error)
        return NextResponse.json({ success: false, error: 'Failed to add product' }, { status: 500 })
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const data = await request.json()
        const { id, ...updates } = data

        // Whitelist Update Fields
        const updateData: any = {}
        if (updates.title) updateData.title = updates.title
        if (updates.category) updateData.category = updates.category
        if (updates.description) updateData.description = updates.description
        if (updates.shortDescription) updateData.shortDescription = updates.shortDescription
        if (updates.status) updateData.status = updates.status
        if (updates.rentalPrice) updateData.rentalPrice = updates.rentalPrice
        if (typeof updates.isFeatured === 'boolean') updateData.isFeatured = updates.isFeatured
        if (typeof updates.isNew === 'boolean') updateData.isNew = updates.isNew

        // Handle Specs
        if (updates.specs) {
            updateData.specsJson = JSON.stringify(updates.specs)
        }

        // Handle Image
        if (updates.images && updates.images.length > 0) {
            updateData.imageUrl = updates.images[0]
        } else if (updates.imageUrl) {
            updateData.imageUrl = updates.imageUrl
        }

        const updated = await db.product.update({
            where: { id: parseInt(id) },
            data: updateData
        })

        return NextResponse.json({ success: true, product: { ...updated, id: String(updated.id) } })
    } catch (error) {
        console.error('Error updating product:', error)
        return NextResponse.json({ success: false, error: 'Failed to update' }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (id) {
            await db.product.delete({ where: { id: parseInt(id) } })
            return NextResponse.json({ success: true })
        }
        return NextResponse.json({ success: false, error: 'Product ID required' }, { status: 400 })
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 500 })
    }
}
