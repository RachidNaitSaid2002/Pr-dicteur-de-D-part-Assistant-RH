"use client"

import { useState, useEffect } from "react"
import { ChevronRight, Monitor, Settings, Shield, Target, Users, Bell, RefreshCw, LogOut, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import AgentNetworkPage from "../../components/employee/page"
import { useRouter } from "next/navigation"
import {GrowthPlanList} from "@/components/GrowthPlan/GrowthPlanList"
import { DotScreenShader } from "@/components/ui/dot-shader-background";


export default function TacticalDashboard() {
    const [activeSection, setActiveSection] = useState("overview")
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    const Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user_id")
        localStorage.removeItem("userId")
        window.location.href = "/login"
    }

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            router.push("/login")
        } else {
            setIsAuthenticated(true)
        }
    }, [router])

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div
                className={`${sidebarCollapsed ? "w-16" : "w-70"} bg-neutral-900 border-r border-neutral-700 transition-all duration-300 fixed md:relative z-50 md:z-auto h-full md:h-auto ${!sidebarCollapsed ? "md:block" : ""}`}
            >
                <div className="p-4">
                    <div className="flex items-center justify-between mb-8">
                        <div className={`${sidebarCollapsed ? "hidden" : "block"}`}>
                            <h1 className="text-orange-500 font-bold text-lg tracking-wider">RetentionAI</h1>
                            <p className="text-neutral-500 text-xs">v1.0.0</p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                            className="text-neutral-400 hover:text-orange-500"
                        >
                            <ChevronRight
                                className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${sidebarCollapsed ? "" : "rotate-180"}`}
                            />
                        </Button>
                    </div>

                    <nav className="space-y-2">
                        {[
                            { id: "Employees", icon: Monitor, label: "EMPLOYEES" },
                            {id : "GrowthPlan", icon: Monitor, label: "GROWTH PLANS"}
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                className={`w-full flex items-center gap-3 p-3 rounded transition-colors cursor-pointer ${activeSection === item.id
                                    ? "bg-[#cc3802] text-white"
                                    : "text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
                                    }`}
                            >
                                <item.icon className="w-5 h-5 md:w-5 md:h-5 sm:w-6 sm:h-6" />
                                {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                            </button>
                        ))}
                    </nav>


                </div>
            </div>

            {/* Mobile Overlay */}
            {!sidebarCollapsed && (
                <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarCollapsed(true)} />
            )}

            {/* Main Content */}
            <div className={`flex-1 flex flex-col ${!sidebarCollapsed ? "md:ml-0" : ""}`}>
                {/* Top Toolbar */}
                <div className="h-16 bg-neutral-800 border-b border-neutral-700 flex items-center justify-between px-6">
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-neutral-400">
                            {activeSection}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-orange-500 cursor-pointer" onClick={Logout}>
                            <LogOut className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="flex-1 overflow-auto bg-black">
                    {activeSection !== "Employees" && activeSection !== "GrowthPlan" && 
                        <div className="h-[100%] flex flex-col gap-8 items-center justify-center relative">
                            <div className="absolute inset-0">
                                <DotScreenShader />
                            </div>
                            <h1 className="text-6xl md:text-7xl font-light tracking-tight mix-blend-exclusion text-white whitespace-nowrap pointer-events-none">
                                Welcome to RetentionAI
                            </h1>
                            <p className="text-lg md:text-xl font-light text-center text-white mix-blend-exclusion max-w-2xl leading-relaxed pointer-events-none">
                                Welcome to RetentionAI, your AI-powered retention assistant. We help you improve employee retention by providing personalized retention strategies and insights.
                            </p>
                        </div>
                    }
                    {activeSection === "Employees" && <AgentNetworkPage />}
                    {activeSection === "GrowthPlan" && <GrowthPlanList />}
                </div>
            </div>

        </div>
    )
}
