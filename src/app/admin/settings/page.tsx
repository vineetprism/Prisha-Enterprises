"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Settings, Building2, User, Lock, Loader2, CheckCircle2, Mail, Phone, MapPin, Globe, Shield } from "lucide-react"

interface CompanyData {
    name: string
    email: string
    phone: string
    gst: string
    address: string
    website: string
}

interface ProfileData {
    fullName: string
    email: string
    username: string
    role: string
}

interface PasswordData {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}

export default function AdminSettingsPage() {
    const [profileSaving, setProfileSaving] = useState(false)
    const [profileSaved, setProfileSaved] = useState(false)
    const [passwordSaving, setPasswordSaving] = useState(false)
    const [passwordSaved, setPasswordSaved] = useState(false)
    const [companySaving, setCompanySaving] = useState(false)
    const [companySaved, setCompanySaved] = useState(false)

    const companyForm = useForm<CompanyData>({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            gst: "",
            address: "",
            website: ""
        }
    })

    // Fetch initial settings
    useEffect(() => {
        fetch('/api/settings', { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    companyForm.reset(data)
                }
            })
            .catch(err => console.error("Failed to fetch settings", err))
    }, [companyForm])

    const profileForm = useForm<ProfileData>({
        defaultValues: {
            fullName: "Admin User",
            email: "admin@prishaenterprises.in",
            username: "admin",
            role: "Administrator"
        }
    })

    const passwordForm = useForm<PasswordData>({
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        }
    })

    const handleCompanySave = async (data: CompanyData) => {
        setCompanySaving(true)
        try {
            const res = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (res.ok) {
                setCompanySaved(true)
                setTimeout(() => setCompanySaved(false), 3000)
            } else {
                alert("Failed to save settings")
            }
        } catch (error) {
            console.error(error)
            alert("Error saving settings")
        } finally {
            setCompanySaving(false)
        }
    }

    const handleProfileSave = async (data: ProfileData) => {
        setProfileSaving(true)
        await new Promise(r => setTimeout(r, 1000))
        setProfileSaving(false)
        setProfileSaved(true)
        setTimeout(() => setProfileSaved(false), 3000)
    }

    const handlePasswordChange = async (data: PasswordData) => {
        if (data.newPassword !== data.confirmPassword) {
            alert("Passwords don't match!")
            return
        }
        if (data.newPassword.length < 6) {
            alert("Password must be at least 6 characters!")
            return
        }
        setPasswordSaving(true)
        try {
            const res = await fetch('/api/auth/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            const responseData = await res.json()

            if (res.ok && responseData.success) {
                setPasswordSaved(true)
                passwordForm.reset()
                setTimeout(() => setPasswordSaved(false), 3000)
            } else {
                alert(responseData.error || "Failed to change password")
            }
        } catch (error) {
            console.error("Error changing password:", error)
            alert("An error occurred while changing password")
        } finally {
            setPasswordSaving(false)
        }
    }

    return (
        <div className="space-y-6 pt-14 lg:pt-0 pb-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-navy-900 flex items-center gap-3">
                        <Settings className="h-8 w-8 text-cyan-500" />
                        Settings
                    </h1>
                    <p className="text-slate-500 mt-1">Manage your account and company settings</p>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Company Information */}
                <Card className="shadow-lg border-slate-200 overflow-hidden lg:col-span-2">
                    <CardHeader className="bg-gradient-to-r from-navy-900 to-navy-800 text-white">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Building2 className="h-5 w-5" />
                            Company Information
                        </CardTitle>
                        <CardDescription className="text-navy-200">
                            Update your company details displayed on the website
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form onSubmit={companyForm.handleSubmit(handleCompanySave)} className="space-y-6">
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Building2 className="h-4 w-4 text-slate-400" />
                                        Company Name
                                    </Label>
                                    <Input {...companyForm.register("name")} className="h-11" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-slate-400" />
                                        Contact Email
                                    </Label>
                                    <Input type="email" {...companyForm.register("email")} className="h-11" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-slate-400" />
                                        Phone Number
                                    </Label>
                                    <Input {...companyForm.register("phone")} className="h-11" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Shield className="h-4 w-4 text-slate-400" />
                                        GST Number
                                    </Label>
                                    <Input {...companyForm.register("gst")} className="h-11" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Globe className="h-4 w-4 text-slate-400" />
                                        Website
                                    </Label>
                                    <Input {...companyForm.register("website")} className="h-11" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-slate-400" />
                                        Address
                                    </Label>
                                    <Input {...companyForm.register("address")} className="h-11" />
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button
                                    type="submit"
                                    disabled={companySaving}
                                    className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 shadow-lg shadow-cyan-500/30"
                                >
                                    {companySaving ? (
                                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
                                    ) : companySaved ? (
                                        <><CheckCircle2 className="mr-2 h-4 w-4" /> Saved!</>
                                    ) : (
                                        'Save Changes'
                                    )}
                                </Button>
                                {companySaved && <span className="text-sm text-emerald-600">Changes saved successfully!</span>}
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Admin Profile */}
                <Card className="shadow-lg border-slate-200 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-cyan-600 to-cyan-500 text-white">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <User className="h-5 w-5" />
                            Admin Profile
                        </CardTitle>
                        <CardDescription className="text-cyan-100">
                            Your personal account settings
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form onSubmit={profileForm.handleSubmit(handleProfileSave)} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Full Name</Label>
                                <Input {...profileForm.register("fullName")} className="h-11" />
                            </div>
                            <div className="space-y-2">
                                <Label>Username</Label>
                                <Input {...profileForm.register("username")} className="h-11" />
                            </div>
                            <div className="space-y-2">
                                <Label>Email Address</Label>
                                <Input type="email" {...profileForm.register("email")} className="h-11" />
                            </div>
                            <div className="space-y-2">
                                <Label>Role</Label>
                                <div className="flex items-center gap-2">
                                    <Input {...profileForm.register("role")} disabled className="h-11 bg-slate-50" />
                                    <Badge className="bg-emerald-500 shrink-0">Active</Badge>
                                </div>
                            </div>
                            <Button
                                type="submit"
                                disabled={profileSaving}
                                className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 shadow-lg shadow-cyan-500/30"
                            >
                                {profileSaving ? (
                                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
                                ) : profileSaved ? (
                                    <><CheckCircle2 className="mr-2 h-4 w-4" /> Saved!</>
                                ) : (
                                    'Update Profile'
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Change Password */}
                <Card className="shadow-lg border-slate-200 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-600 text-white">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Lock className="h-5 w-5" />
                            Change Password
                        </CardTitle>
                        <CardDescription className="text-slate-300">
                            Update your account password
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form onSubmit={passwordForm.handleSubmit(handlePasswordChange)} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Current Password</Label>
                                <Input type="password" {...passwordForm.register("currentPassword")} className="h-11" />
                            </div>
                            <div className="space-y-2">
                                <Label>New Password</Label>
                                <Input type="password" {...passwordForm.register("newPassword")} className="h-11" />
                            </div>
                            <div className="space-y-2">
                                <Label>Confirm New Password</Label>
                                <Input type="password" {...passwordForm.register("confirmPassword")} className="h-11" />
                            </div>
                            <Button
                                type="submit"
                                disabled={passwordSaving}
                                className="w-full bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-800 hover:to-slate-700"
                            >
                                {passwordSaving ? (
                                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...</>
                                ) : passwordSaved ? (
                                    <><CheckCircle2 className="mr-2 h-4 w-4" /> Updated!</>
                                ) : (
                                    'Change Password'
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
