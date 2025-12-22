// Shared mock data store for products
// In production, this would be replaced with a database

export interface Product {
    id: string
    title: string
    slug: string
    category: string
    description: string
    shortDescription?: string
    specs: Record<string, string>
    images: string[]
    price?: string
    rentalPrice?: string
    isNew?: boolean
    isFeatured?: boolean
    status: 'Active' | 'Low Stock' | 'Out of Stock'
    createdAt: string
}

// Initial mock data
const initialProducts: Product[] = [
    {
        id: "1",
        title: "Dell PowerEdge R740 Server",
        slug: "dell-poweredge-r740",
        category: "Servers",
        description: "The PowerEdge R740 was designed to accelerate application performance leveraging accelerator cards and storage scalability. The 2-socket, 2U platform has the optimum balance of resources to power the most demanding environments.",
        shortDescription: "High-performance 2U rack server for data centers",
        specs: {
            "Processor": "Intel Xeon Scalable (up to 28 cores)",
            "Memory": "Up to 3TB DDR4 RDIMM/LRDIMM",
            "Storage": "Up to 16 x 2.5\" SAS/SATA/SSD",
            "Form Factor": "2U Rack Server"
        },
        images: ["/products/server.jpg"],
        rentalPrice: "₹15,000/month",
        isNew: true,
        isFeatured: true,
        status: "Active",
        createdAt: "2024-01-15"
    },
    {
        id: "2",
        title: "MacBook Pro 16 M3 Max",
        slug: "macbook-pro-16-m3",
        category: "Laptops",
        description: "The most powerful MacBook Pro ever is here. With the blazing-fast M3 Max chip, massive battery life, and a stunning Liquid Retina XDR display, it's a pro laptop without equal.",
        shortDescription: "Professional laptop with M3 Max chip",
        specs: {
            "Chip": "Apple M3 Max (16-core CPU, 40-core GPU)",
            "Memory": "Up to 128GB Unified Memory",
            "Display": "16.2-inch Liquid Retina XDR",
            "Battery": "Up to 22 hours"
        },
        images: ["/products/macbook.jpg"],
        rentalPrice: "₹8,000/month",
        isFeatured: true,
        status: "Active",
        createdAt: "2024-02-10"
    },
    {
        id: "3",
        title: "Cisco Catalyst 9300 Switch",
        slug: "cisco-catalyst-9300",
        category: "Networking",
        description: "The Catalyst 9300 Series is the next generation of enterprise-class stackable access switches. Built for security, mobility, IoT, and cloud with enterprise-class features.",
        shortDescription: "Enterprise stackable access switch",
        specs: {
            "Ports": "24/48 Gigabit Ethernet ports",
            "Uplinks": "4x 1G/10G/25G modular uplinks",
            "Stacking": "Up to 8 switches",
            "PoE": "Up to 90W per port (UPOE+)"
        },
        images: ["/products/switch.jpg"],
        rentalPrice: "₹5,000/month",
        status: "Active",
        createdAt: "2024-01-20"
    },
    {
        id: "4",
        title: "HP Z8 G4 Workstation",
        slug: "hp-z8-g4",
        category: "Workstations",
        description: "The HP Z8 G4 is the ultimate workstation for demanding professionals. Extreme performance, expansion, and reliability for VR, AI, deep learning, and simulation workloads.",
        shortDescription: "Ultimate dual-Xeon workstation",
        specs: {
            "Processor": "Dual Intel Xeon (up to 56 cores total)",
            "Memory": "Up to 3TB DDR4 ECC",
            "Graphics": "Up to 3x NVIDIA Quadro RTX 8000",
            "Storage": "Up to 48TB total"
        },
        images: ["/products/workstation.jpg"],
        rentalPrice: "₹20,000/month",
        isNew: true,
        isFeatured: true,
        status: "Active",
        createdAt: "2024-03-01"
    },
    {
        id: "5",
        title: "Hikvision 4K NVR System",
        slug: "hikvision-4k-nvr",
        category: "CCTV",
        description: "Professional 4K Ultra HD Network Video Recorder with AI-powered analytics, smart event detection, and enterprise-grade storage management for comprehensive surveillance.",
        shortDescription: "32-channel 4K NVR with AI analytics",
        specs: {
            "Resolution": "4K Ultra HD (8MP)",
            "Channels": "32 IP Camera Channels",
            "Storage": "Up to 8 HDDs (80TB total)",
            "AI Features": "Face recognition, Object detection"
        },
        images: ["/products/cctv.jpg"],
        rentalPrice: "₹12,000/month",
        status: "Active",
        createdAt: "2024-02-15"
    },
    {
        id: "6",
        title: "Dell Latitude 7440 Laptop",
        slug: "dell-latitude-7440",
        category: "Laptops",
        description: "Business-class ultrabook with Intel 13th Gen processors, all-day battery life, and enterprise security features. Perfect for corporate deployments.",
        shortDescription: "Business ultrabook with enterprise features",
        specs: {
            "Processor": "Intel Core i7-1365U",
            "Memory": "16GB DDR5",
            "Storage": "512GB NVMe SSD",
            "Display": "14\" FHD+ Touch"
        },
        images: ["/products/laptop.jpg"],
        rentalPrice: "₹4,000/month",
        isNew: true,
        isFeatured: true,
        status: "Active",
        createdAt: "2024-03-10"
    },
    {
        id: "7",
        title: "HPE ProLiant DL380 Gen10 Server",
        slug: "hpe-proliant-dl380",
        category: "Servers",
        description: "Industry-leading 2U server with exceptional flexibility, performance, and reliability. Ideal for enterprise workloads and virtualization.",
        shortDescription: "Industry-standard 2U server platform",
        specs: {
            "Processor": "Intel Xeon Scalable Gen2",
            "Memory": "Up to 3TB DDR4",
            "Storage": "Up to 24 SFF drives",
            "Features": "HPE iLO 5, Flexible LOM"
        },
        images: ["/products/server2.jpg"],
        rentalPrice: "₹14,000/month",
        status: "Low Stock",
        createdAt: "2024-01-25"
    },
    {
        id: "8",
        title: "Lenovo ThinkStation P620",
        slug: "lenovo-thinkstation-p620",
        category: "Workstations",
        description: "The world's first AMD Threadripper PRO workstation. Unmatched multi-threaded performance for content creation, engineering, and data science.",
        shortDescription: "AMD Threadripper PRO workstation",
        specs: {
            "Processor": "AMD Threadripper PRO (64 cores)",
            "Memory": "Up to 1TB DDR4 ECC",
            "Graphics": "Up to 2x NVIDIA RTX A6000",
            "Storage": "Up to 20TB"
        },
        images: ["/products/workstation2.jpg"],
        rentalPrice: "₹18,000/month",
        status: "Active",
        createdAt: "2024-02-20"
    },
    {
        id: "9",
        title: "TP-Link Omada Business Router",
        slug: "tplink-omada-router",
        category: "Networking",
        description: "Enterprise-grade VPN router with cloud management. Features multi-WAN load balancing, advanced firewall, and centralized Omada SDN management.",
        shortDescription: "Business VPN router with cloud management",
        specs: {
            "WAN Ports": "2x Gigabit WAN",
            "LAN Ports": "4x Gigabit LAN",
            "VPN": "IPsec, OpenVPN, PPTP, L2TP",
            "Management": "Omada Cloud"
        },
        images: ["/products/router.jpg"],
        rentalPrice: "₹2,000/month",
        status: "Active",
        createdAt: "2024-03-05"
    },
    {
        id: "10",
        title: "Dahua 8-Channel PTZ Camera Kit",
        slug: "dahua-ptz-camera-kit",
        category: "CCTV",
        description: "Complete surveillance kit with 4MP PTZ cameras, 8-channel NVR, and 2TB storage. Features 25x optical zoom and smart tracking.",
        shortDescription: "PTZ camera kit with NVR included",
        specs: {
            "Cameras": "8x 4MP PTZ Cameras",
            "Zoom": "25x Optical Zoom",
            "NVR": "8-Channel with 2TB HDD",
            "Features": "Smart tracking, IR night vision"
        },
        images: ["/products/cctv2.jpg"],
        rentalPrice: "₹8,000/month",
        isNew: true,
        status: "Active",
        createdAt: "2024-03-15"
    }
]

// In-memory store
let productsStore: Product[] = [...initialProducts]

// Get all products
export function getProducts(): Product[] {
    return productsStore
}

// Get product by slug
export function getProductBySlug(slug: string): Product | null {
    return productsStore.find(p => p.slug === slug) || null
}

// Get product by ID
export function getProductById(id: string): Product | null {
    return productsStore.find(p => p.id === id) || null
}

// Get featured products
export function getFeaturedProducts(): Product[] {
    return productsStore.filter(p => p.isFeatured && p.status === "Active")
}

// Get products by category
export function getProductsByCategory(category: string): Product[] {
    return productsStore.filter(p => p.category.toLowerCase() === category.toLowerCase())
}

// Add new product
export function addProduct(data: Omit<Product, 'id' | 'createdAt'>): Product {
    const newProduct: Product = {
        id: `${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString().split('T')[0]
    }
    productsStore = [newProduct, ...productsStore]
    return newProduct
}

// Update product
export function updateProduct(id: string, data: Partial<Product>): Product | null {
    const index = productsStore.findIndex(p => p.id === id)
    if (index !== -1) {
        productsStore[index] = { ...productsStore[index], ...data }
        return productsStore[index]
    }
    return null
}

// Delete product
export function deleteProduct(id: string): boolean {
    const initialLength = productsStore.length
    productsStore = productsStore.filter(p => p.id !== id)
    return productsStore.length < initialLength
}

// Get categories
export function getCategories(): string[] {
    return [...new Set(productsStore.map(p => p.category))]
}
