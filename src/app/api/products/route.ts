import { NextRequest, NextResponse } from 'next/server'
import { getProducts, getProductBySlug, addProduct, updateProduct, deleteProduct } from '@/lib/products-store'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')

    let products = getProducts()

    if (slug) {
        const product = getProductBySlug(slug)
        return product
            ? NextResponse.json({ product })
            : NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    if (category) {
        products = products.filter(p => p.category.toLowerCase() === category.toLowerCase())
    }

    if (featured === 'true') {
        products = products.filter(p => p.isFeatured && p.status === 'Active')
    }

    return NextResponse.json({ products })
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()

        const product = addProduct({
            title: data.title,
            slug: data.slug || data.title.toLowerCase().replace(/\s+/g, '-'),
            category: data.category,
            description: data.description || '',
            shortDescription: data.shortDescription,
            specs: data.specs || {},
            images: data.images || ['/products/placeholder.jpg'],
            price: data.price,
            rentalPrice: data.rentalPrice,
            isNew: data.isNew || false,
            isFeatured: data.isFeatured || false,
            status: data.status || 'Active'
        })

        return NextResponse.json({ success: true, product }, { status: 201 })
    } catch (error) {
        console.error('Error adding product:', error)
        return NextResponse.json({ success: false, error: 'Failed to add product' }, { status: 500 })
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const data = await request.json()
        const { id, ...updates } = data

        const updated = updateProduct(id, updates)

        if (updated) {
            return NextResponse.json({ success: true, product: updated })
        }
        return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 })
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update' }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (id && deleteProduct(id)) {
            return NextResponse.json({ success: true })
        }
        return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 })
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 500 })
    }
}
