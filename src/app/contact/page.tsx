"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, Phone, Loader2, CheckCircle2, Send, Clock, MessageSquare, Building2, Sparkles } from "lucide-react"

interface ContactFormData {
    firstName: string
    lastName: string
    email: string
    phone: string
    company: string
    message: string
}

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [settings, setSettings] = useState({
        phone: "+91 98765 43210",
        email: "contact@prishaenterprises.in",
        address: "B-123, Sector 63, Noida",
        gst: "07AADCP1234F1Z5"
    })
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>()

    useEffect(() => {
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => {
                if (data && data.phone) {
                    setSettings(data)
                }
            })
            .catch(err => console.error(err))
    }, [])

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true)
        try {
            const response = await fetch('/api/inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: `${data.firstName} ${data.lastName}`,
                    email: data.email,
                    phone: data.phone,
                    company: data.company,
                    message: data.message,
                    source: 'contact_page',
                    createdAt: new Date().toISOString()
                })
            })

            if (response.ok) {
                setIsSuccess(true)
                reset()
                setTimeout(() => setIsSuccess(false), 5000)
            }
        } catch (error) {
            console.error("Submission error:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-cyan-900 text-white py-20 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full text-sm mb-6">
                        <Sparkles className="h-4 w-4" />
                        <span>We'd love to hear from you</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Get in Touch</h1>
                    <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
                        Have a question or need a custom quote? Our team is ready to help you find the perfect IT solution.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white border-0 shadow-xl shadow-cyan-500/20 overflow-hidden">
                            <CardContent className="p-6">
                                <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-5">
                                    <Phone className="h-7 w-7" />
                                </div>
                                <h3 className="text-lg font-bold mb-2">Call Us</h3>
                                <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="text-2xl font-semibold hover:underline block mb-2">
                                    {settings.phone}
                                </a>
                                <p className="text-cyan-100 text-sm">Mon-Sat, 9:00 AM - 7:00 PM IST</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-navy-800 to-navy-900 text-white border-0 shadow-xl overflow-hidden">
                            <CardContent className="p-6">
                                <div className="w-14 h-14 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center mb-5">
                                    <Mail className="h-7 w-7" />
                                </div>
                                <h3 className="text-lg font-bold mb-2">Email Us</h3>
                                <a href={`mailto:${settings.email}`} className="text-xl font-semibold hover:underline block mb-2">
                                    {settings.email}
                                </a>
                                <p className="text-slate-300 text-sm">We reply within 24 hours</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white border-slate-200 shadow-lg overflow-hidden">
                            <CardContent className="p-6">
                                <div className="w-14 h-14 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mb-5">
                                    <MapPin className="h-7 w-7 text-navy-900" />
                                </div>
                                <h3 className="text-lg font-bold text-navy-900 mb-2">Visit Us</h3>
                                <p className="text-slate-600 mb-3 whitespace-pre-line">
                                    {settings.address}
                                </p>
                                <div className="pt-3 border-t border-slate-100">
                                    <p className="text-sm text-slate-500">
                                        <Building2 className="h-4 w-4 inline mr-1" />
                                        GSTIN: {settings.gst}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <Card className="shadow-2xl border-0 overflow-hidden">
                            <div className="bg-gradient-to-r from-navy-900 to-navy-800 text-white p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                                        <MessageSquare className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold">Send us a Message</h2>
                                        <p className="text-navy-200 text-sm">Fill out the form and we'll get back to you shortly</p>
                                    </div>
                                </div>
                            </div>

                            <CardContent className="p-8">
                                {isSuccess ? (
                                    <div className="flex flex-col items-center justify-center py-16 text-center">
                                        <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30 animate-bounce">
                                            <CheckCircle2 className="w-12 h-12 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-navy-900 mb-2">Message Sent Successfully!</h3>
                                        <p className="text-slate-600 max-w-sm">
                                            Thank you for contacting us. Our team will review your inquiry and get back to you within 24 hours.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName" className="text-navy-900 font-medium">First Name *</Label>
                                                <Input
                                                    id="firstName"
                                                    placeholder="John"
                                                    {...register("firstName", { required: "First name is required" })}
                                                    className={`h-12 bg-slate-50 border-slate-200 focus:bg-white ${errors.firstName ? "border-red-500" : ""}`}
                                                />
                                                {errors.firstName && (
                                                    <span className="text-xs text-red-500">{errors.firstName.message}</span>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName" className="text-navy-900 font-medium">Last Name *</Label>
                                                <Input
                                                    id="lastName"
                                                    placeholder="Doe"
                                                    {...register("lastName", { required: "Last name is required" })}
                                                    className={`h-12 bg-slate-50 border-slate-200 focus:bg-white ${errors.lastName ? "border-red-500" : ""}`}
                                                />
                                                {errors.lastName && (
                                                    <span className="text-xs text-red-500">{errors.lastName.message}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-navy-900 font-medium">Email Address *</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="john@example.com"
                                                    {...register("email", {
                                                        required: "Email is required",
                                                        pattern: {
                                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                            message: "Invalid email address"
                                                        }
                                                    })}
                                                    className={`h-12 bg-slate-50 border-slate-200 focus:bg-white ${errors.email ? "border-red-500" : ""}`}
                                                />
                                                {errors.email && (
                                                    <span className="text-xs text-red-500">{errors.email.message}</span>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone" className="text-navy-900 font-medium">Phone Number *</Label>
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    placeholder="+91 98765 43210"
                                                    {...register("phone", { required: "Phone number is required" })}
                                                    className={`h-12 bg-slate-50 border-slate-200 focus:bg-white ${errors.phone ? "border-red-500" : ""}`}
                                                />
                                                {errors.phone && (
                                                    <span className="text-xs text-red-500">{errors.phone.message}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="company" className="text-navy-900 font-medium">Company (Optional)</Label>
                                            <Input
                                                id="company"
                                                placeholder="Your company name"
                                                {...register("company")}
                                                className="h-12 bg-slate-50 border-slate-200 focus:bg-white"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="message" className="text-navy-900 font-medium">Your Message *</Label>
                                            <Textarea
                                                id="message"
                                                placeholder="Tell us about your requirements, the products you're interested in, or any questions you have..."
                                                className={`min-h-[150px] resize-none bg-slate-50 border-slate-200 focus:bg-white ${errors.message ? "border-red-500" : ""}`}
                                                {...register("message", { required: "Message is required" })}
                                            />
                                            {errors.message && (
                                                <span className="text-xs text-red-500">{errors.message.message}</span>
                                            )}
                                        </div>
                                        <Button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white h-14 text-base font-semibold shadow-lg shadow-cyan-500/30 rounded-xl"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                    Sending your message...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="mr-2 h-5 w-5" />
                                                    Send Message
                                                </>
                                            )}
                                        </Button>
                                        <div className="text-center text-sm text-slate-500 flex items-center justify-center gap-2 pt-2">
                                            <Clock className="h-4 w-4" />
                                            <span>Average response time: 2-4 hours during business hours</span>
                                        </div>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Google Map */}
                <div className="mt-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-navy-900 mb-2">Find Us On Map</h2>
                        <p className="text-slate-500">Visit our office for a face-to-face consultation</p>
                    </div>
                    <div className="w-full h-96 rounded-2xl border overflow-hidden shadow-xl">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.5513!2d77.0266!3d28.4595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18c!2sAshok%20Vihar%2C%20Gurgaon%2C%20Haryana!5e0!3m2!1sen!2sin!4v1"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Prisha Enterprises Location"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
