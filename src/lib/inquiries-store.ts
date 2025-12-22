// Shared mock data store for inquiries
// In production, this would be replaced with a database

export interface Inquiry {
    id: string
    name: string
    email: string
    phone: string
    message: string
    company?: string
    source: 'contact_page' | 'quote_modal' | 'product_inquiry'
    product?: string
    status: 'new' | 'responded' | 'closed'
    date: string
}

// Initial mock data
const initialInquiries: Inquiry[] = [
    { id: "1", name: "Rahul Sharma", email: "rahul.sharma@techcorp.com", phone: "+91 98765 43210", message: "I'm interested in renting 20 Dell laptops for our training program.", source: "quote_modal", product: "Dell Laptop", status: "new", date: "2024-12-05 14:30" },
    { id: "2", name: "Priya Patel", email: "priya@globalfinance.com", phone: "+91 87654 32109", message: "Need a quote for 5 HP Z8 workstations for our design team.", source: "contact_page", status: "new", date: "2024-12-05 11:15" },
    { id: "3", name: "Amit Kumar", email: "amit.kumar@startupindia.io", phone: "+91 76543 21098", message: "Looking for CCTV installation for our new office.", source: "quote_modal", product: "CCTV System", status: "responded", date: "2024-12-04 16:45" },
    { id: "4", name: "Sunita Reddy", email: "sunita@datadrive.com", phone: "+91 65432 10987", message: "Require 2 Dell PowerEdge servers for our data center.", source: "contact_page", status: "responded", date: "2024-12-04 09:00" },
    { id: "5", name: "Vikram Singh", email: "vikram@cloudnet.systems", phone: "+91 54321 09876", message: "Need networking equipment - switches and routers.", source: "quote_modal", product: "Networking", status: "closed", date: "2024-12-03 13:20" },
]

// In-memory store (simulates database)
let inquiriesStore: Inquiry[] = [...initialInquiries]

// Get all inquiries
export function getInquiries(): Inquiry[] {
    return inquiriesStore
}

// Add new inquiry
export function addInquiry(data: Omit<Inquiry, 'id' | 'status' | 'date'>): Inquiry {
    const newInquiry: Inquiry = {
        id: `INQ-${Date.now()}`,
        ...data,
        status: 'new',
        date: new Date().toLocaleString('en-IN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        })
    }
    inquiriesStore = [newInquiry, ...inquiriesStore]
    return newInquiry
}

// Update inquiry status
export function updateInquiryStatus(id: string, status: Inquiry['status']): Inquiry | null {
    const index = inquiriesStore.findIndex(i => i.id === id)
    if (index !== -1) {
        inquiriesStore[index] = { ...inquiriesStore[index], status }
        return inquiriesStore[index]
    }
    return null
}

// Delete inquiry
export function deleteInquiry(id: string): boolean {
    const initialLength = inquiriesStore.length
    inquiriesStore = inquiriesStore.filter(i => i.id !== id)
    return inquiriesStore.length < initialLength
}
