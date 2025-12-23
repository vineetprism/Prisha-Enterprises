
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const product = await prisma.product.findFirst({
        where: {
            title: {
                contains: 'Test'
            }
        }
    })

    if (!product) {
        console.log('Test product not found, creating one...')
        await prisma.product.create({
            data: {
                title: "Dell PowerEdge R740 Server",
                slug: "dell-poweredge-r740",
                category: "Servers",
                imageUrl: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?w=800&q=80",
                rentalPrice: "4500",
                shortDescription: "Enterprise-grade rack server for heavy workloads",
                description: "The Dell PowerEdge R740 is designed to accelerate application performance... [Full description content]",
                status: "Available",
                isNew: true,
                isFeatured: true,
                specsJson: JSON.stringify({
                    "Processor": "Intel Xeon Gold 6248R",
                    "RAM": "64GB DDR4 ECC",
                    "Storage": "2x 960GB SSD NVMe"
                })
            }
        })
    } else {
        console.log(`Updating product ${product.id}...`)
        await prisma.product.update({
            where: { id: product.id },
            data: {
                imageUrl: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?w=800&q=80",
                rentalPrice: "12500",
                title: "Dell PowerEdge R740 Server",
                // Keep slug if you want, or update it. Let's keep it consistent
                // slug: "dell-poweredge-r740-updated", 
                shortDescription: "High-performance 2U rack server optimized for workload acceleration.",
                description: "The PowerEdge R740 was designed to accelerate application performance leveraging accelerator cards and storage scalability. The 2-socket, 2U platform has the optimum balance of resources to power the most demanding environments.",
                status: "Available",
                isNew: true,
                isFeatured: true,
                specsJson: JSON.stringify({
                    "Processor": "2x Intel Xeon Gold",
                    "Memory": "128GB DDR4",
                    "Storage": "4TB SSD RAID 10",
                    "Network": "10GbE Dual Port"
                })
            }
        })
    }
    console.log('Product updated successfully!')
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
