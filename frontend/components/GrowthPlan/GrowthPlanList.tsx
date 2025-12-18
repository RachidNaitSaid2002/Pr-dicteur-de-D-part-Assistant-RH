"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Loader2, AlertCircle, TrendingUp, Shield, FileText, Target, MessageCircle } from "lucide-react"

interface GrowthPlan {
    id: number
    risk_assessment: string
    retention_strategy: any
    stay_interview_script: string
    growth_plan: string
    id_employee: number
    id_user: number
}

export function GrowthPlanList() {
    const [growthPlans, setGrowthPlans] = useState<GrowthPlan[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchGrowthPlans = async () => {
            try {
                const token = localStorage.getItem("token")
                if (!token) {
                    throw new Error("No authentication token found")
                }

                const response = await fetch("http://127.0.0.1:8000/GrowthPlans", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })

                if (!response.ok) {
                    throw new Error("Failed to fetch growth plans")
                }

                const data = await response.json()
                setGrowthPlans(data)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchGrowthPlans()
    }, [])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-4 rounded-lg">
                <AlertCircle className="h-5 w-5" />
                <p>{error}</p>
            </div>
        )
    }

    if (growthPlans.length === 0) {
        return (
            <div className="text-center text-white/60 py-12">
                <p>No growth plans found.</p>
            </div>
        )
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 p-10">
            {growthPlans.map((plan, index) => (
                <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-orange-500/30 transition-colors"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                            <TrendingUp className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">Plan #{plan.id}</h3>
                            <p className="text-sm text-white/40">Employee ID: {plan.id_employee}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-white/80">
                                <Shield className="h-4 w-4 text-orange-500" />
                                Risk Assessment
                            </div>
                            <p className="text-sm text-white/60 line-clamp-3">{plan.risk_assessment}</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-white/80">
                                <Target className="h-4 w-4 text-orange-500" />
                                Retention Strategy
                            </div>
                            <p className="text-sm text-white/60 line-clamp-3">
                                {plan.retention_strategy}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-white/80">
                                <MessageCircle className="h-4 w-4 text-orange-500" />
                                Stay Interview Script
                            </div>
                            <p className="text-sm text-white/60 line-clamp-3">
                                {plan.stay_interview_script}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-white/80">
                                <TrendingUp className="h-4 w-4 text-orange-500"/>
                                Growth Plan
                            </div>
                            <p className="text-sm text-white/60 line-clamp-3">
                                {plan.growth_plan}
                            </p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
