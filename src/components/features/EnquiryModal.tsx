"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { Loader2, CheckCircle2, Send, User, Building2, Mail, Phone, MessageSquare, Sparkles, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface EnquiryFormData {
    name: string
    email: string
    phone: string
    company?: string
    message?: string
}

interface EnquiryModalProps {
    trigger?: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

export function EnquiryModal({ trigger, open, onOpenChange }: EnquiryModalProps) {
    const [isLoading, setIsLoading] = React.useState(false)
    const [isSuccess, setIsSuccess] = React.useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm<EnquiryFormData>()

    const onSubmit = async (data: EnquiryFormData) => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    source: 'quote_modal',
                    createdAt: new Date().toISOString()
                })
            })

            if (response.ok) {
                setIsSuccess(true)
                reset()
                setTimeout(() => {
                    setIsSuccess(false)
                    if (onOpenChange) onOpenChange(false)
                }, 3000)
            }
        } catch (error) {
            console.error('Submission error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden border-0 shadow-2xl">
                {/* Header with gradient and decorative elements */}
                <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-cyan-900 p-8 text-white relative overflow-hidden">
                    {/* Decorative circles */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl"></div>

                    <DialogHeader className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                                <Sparkles className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <DialogTitle className="text-2xl font-bold text-white">Get a Free Quote</DialogTitle>
                                <DialogDescription className="text-cyan-200 mt-1">
                                    Quick response within 2 hours
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>
                </div>

                <div className="p-6 bg-gradient-to-b from-slate-50 to-white">
                    {isSuccess ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30 animate-bounce">
                                <CheckCircle2 className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-navy-900 mb-2">Request Submitted!</h3>
                            <p className="text-slate-600 max-w-xs">
                                Our team will contact you shortly with a customized quote.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-navy-900 font-medium flex items-center gap-2">
                                        <User className="h-4 w-4 text-slate-400" />
                                        Full Name *
                                    </Label>
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        {...register("name", { required: "Name is required" })}
                                        className={`h-11 bg-white border-slate-200 focus:border-cyan-500 ${errors.name ? "border-red-500" : ""}`}
                                    />
                                    {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="company" className="text-navy-900 font-medium flex items-center gap-2">
                                        <Building2 className="h-4 w-4 text-slate-400" />
                                        Company
                                    </Label>
                                    <Input
                                        id="company"
                                        placeholder="Your Company"
                                        {...register("company")}
                                        className="h-11 bg-white border-slate-200 focus:border-cyan-500"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-navy-900 font-medium flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-slate-400" />
                                        Email *
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email"
                                            }
                                        })}
                                        className={`h-11 bg-white border-slate-200 focus:border-cyan-500 ${errors.email ? "border-red-500" : ""}`}
                                    />
                                    {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-navy-900 font-medium flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-slate-400" />
                                        Phone *
                                    </Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="+91 98765 43210"
                                        {...register("phone", { required: "Phone is required" })}
                                        className={`h-11 bg-white border-slate-200 focus:border-cyan-500 ${errors.phone ? "border-red-500" : ""}`}
                                    />
                                    {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message" className="text-navy-900 font-medium flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4 text-slate-400" />
                                    Your Requirements
                                </Label>
                                <Textarea
                                    id="message"
                                    placeholder="Tell us about the products or services you're interested in..."
                                    className="min-h-[100px] resize-none bg-white border-slate-200 focus:border-cyan-500"
                                    {...register("message")}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 h-12 text-base font-semibold shadow-lg shadow-cyan-500/30 rounded-xl"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <Send className="mr-2 h-5 w-5" />
                                        Get My Free Quote
                                    </>
                                )}
                            </Button>
                            <div className="flex items-center justify-center gap-2 text-sm text-slate-500 pt-1">
                                <Clock className="h-4 w-4" />
                                <span>Average response time: 2 hours</span>
                            </div>
                        </form>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
