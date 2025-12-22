import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://prishaenterprises.com' // Replace with actual domain

    // Static routes
    const routes = [
        '',
        '/about',
        '/contact',
        '/services',
        '/products/all',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
    }))

    // Mock dynamic routes (would fetch from DB in real app)
    const products = [
        'dell-poweredge-r740',
        'macbook-pro-16-m3',
    ].map((slug) => ({
        url: `${baseUrl}/product/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [...routes, ...products]
}
