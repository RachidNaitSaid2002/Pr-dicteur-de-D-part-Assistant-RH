import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Filter, MoreHorizontal, Shield, Plus, X, Briefcase, GraduationCap, Users, TrendingUp, Loader2, Activity, Delete, RemoveFormattingIcon, Trash } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Employee {
    id: number
    Age: number
    BusinessTravel: string
    Department: string
    Education: number
    EducationField: string
    EnvironmentSatisfaction: number
    JobInvolvement: number
    JobLevel: number
    JobRole: string
    JobSatisfaction: number
    MaritalStatus: string
    MonthlyIncome: number
    OverTime: string
    PerformanceRating: number
    TotalWorkingYears: number
    TrainingTimesLastYear: number
    WorkLifeBalance: number
    YearsAtCompany: number
    YearsInCurrentRole: number
    YearsWithCurrManager: number
    Attrition: string
    id_user: number
}

export default function AgentNetworkPage() {
    const [selectedAgent, setSelectedAgent] = useState<Employee | null>(null)
    const [employees, setEmployees] = useState<Employee[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    const [Age, setAge] = useState()
    const [BusinessTravel, setBusinessTravel] = useState("")
    const [Department, setDepartment] = useState("Research & Development")
    const [Education, setEducation] = useState("")
    const [EducationField, setEducationField] = useState("Life Sciences")
    const [EnvironmentSatisfaction, setEnvironmentSatisfaction] = useState("")
    const [JobInvolvement, setJobInvolvement] = useState("")
    const [JobLevel, setJobLevel] = useState("")
    const [JobRole, setJobRole] = useState("Research Scientist")
    const [JobSatisfaction, setJobSatisfaction] = useState("")
    const [MaritalStatus, setMaritalStatus] = useState("Single")
    const [MonthlyIncome, setMonthlyIncome] = useState("")
    const [OverTime, setOverTime] = useState("No")
    const [PerformanceRating, setPerformanceRating] = useState("")
    const [TotalWorkingYears, setTotalWorkingYears] = useState("")
    const [TrainingTimesLastYear, setTrainingTimesLastYear] = useState("")
    const [WorkLifeBalance, setWorkLifeBalance] = useState("")
    const [YearsAtCompany, setYearsAtCompany] = useState("")
    const [YearsInCurrentRole, setYearsInCurrentRole] = useState("")
    const [YearsWithCurrManager, setYearsWithCurrManager] = useState("")

    // console.log(Age)
    // console.log(BusinessTravel)
    // console.log(Department)
    // console.log(Education)
    // console.log(EducationField)
    // console.log(EnvironmentSatisfaction)
    // console.log(JobInvolvement)
    // console.log(JobLevel)
    // console.log(JobRole)
    // console.log(JobSatisfaction)
    // console.log(MaritalStatus)
    // console.log(MonthlyIncome)
    // console.log(OverTime)
    // console.log(PerformanceRating)
    // console.log(TotalWorkingYears)
    // console.log(TrainingTimesLastYear)
    // console.log(WorkLifeBalance)
    // console.log(YearsAtCompany)
    // console.log(YearsInCurrentRole)
    // console.log(YearsWithCurrManager)

    const fetchEmployees = async () => {
        setIsLoading(true)
        try {
            const token = localStorage.getItem("token")
            if (!token) return

            const response = await fetch("http://127.0.0.1:8000/employees", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (response.ok) {
                const data = await response.json()
                setEmployees(data)
            }
        } catch (error) {
            console.error("Failed to fetch employees:", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchEmployees()
    }, [])

    const DataEmployee = {
        Age,
        BusinessTravel,
        Department,
        Education,
        EducationField,
        EnvironmentSatisfaction,
        JobInvolvement,
        JobLevel,
        JobRole,
        JobSatisfaction,
        MaritalStatus,
        MonthlyIncome,
        OverTime,
        PerformanceRating,
        TotalWorkingYears,
        TrainingTimesLastYear,
        WorkLifeBalance,
        YearsAtCompany,
        YearsInCurrentRole,
        YearsWithCurrManager,
    }

    const handleAddEmployee = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            const token = localStorage.getItem("token")
            if (!token) {
                alert("You must be logged in to add an employee")
                return
            }

            const payload = [DataEmployee]

            const response = await fetch("http://127.0.0.1:8000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            })

            console.log(payload)

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.detail || "Failed to add employee")
            }

            await fetchEmployees()
            setIsAddModalOpen(false)
        } catch (error: any) {
            console.error("Error adding employee:", error)
            alert(error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async (e: React.MouseEvent | React.FormEvent, id: number) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem("token")
            if (!token) {
                alert("You must be logged in to delete an employee")
                return
            }

            const response = await fetch(`http://127.0.0.1:8000/employees/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.detail || "Failed to delete employee")
            }

            await fetchEmployees()
            setSelectedAgent(null)
        } catch (error: any) {
            console.error("Error deleting employee:", error)
            alert(error.message)
        }
    }

    const filteredAgents = employees.filter(
        (agent) =>
            agent.JobRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
            agent.Department.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    const handleGrowth = async (id: number) => {
        try {
            const token = localStorage.getItem("token")
            if (!token) {
                alert("You must be logged in to delete an employee")
                return
            }

            setIsLoading(true)

            const response = await fetch(`http://127.0.0.1:8000/GrowthPlan/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })

            

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.detail || "Failed to generate growth plan")
                setIsLoading(false)
            } else {
                const data = await response.json()
                console.log(data)
                setIsLoading(false)
            }

        } catch (error: any) {
            console.error("generating growth plan error : ", error)
            alert(error.message)
        }
    }

    return (
        <div className="p-6 space-y-8 min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-100 font-sans selection:bg-orange-500/30">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 backdrop-blur-md bg-white/5 p-6 rounded-2xl border border-white/10 shadow-2xl"
            >
                <div>
                    <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                        Retention<span className="text-orange-500">.AI</span>
                    </h1>
                    <p className="text-neutral-400 mt-1 font-medium tracking-wide text-sm">WORKFORCE INTELLIGENCE SYSTEM</p>
                </div>
                <div className="flex gap-3">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white shadow-lg shadow-orange-900/20 border-0"
                            onClick={() => setIsAddModalOpen(true)}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            New Operative
                        </Button>
                    </motion.div>
                </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                {[
                    { title: "TOTAL OPERATIVES", value: employees.length, icon: Users, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
                    { title: "ATTRITION RISK", value: employees.filter(e => e.Attrition === "Yes" || e.Attrition === "yes").length, icon: Activity, color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" },
                    { title: "HIGH SATISFACTION", value: employees.filter(e => e.Attrition === "No" || e.Attrition === "no").length, icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" }
                ].map((stat, index) => (
                    <motion.div key={index} variants={itemVariants} whileHover={{ y: -5 }}>
                        <Card className={`bg-neutral-900/50 backdrop-blur-sm border ${stat.border} overflow-hidden relative group`}>
                            <div className={`absolute inset-0 ${stat.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                            <CardContent className="p-6 relative z-10">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold text-neutral-400 tracking-widest mb-1">{stat.title}</p>
                                        <p className="text-4xl font-black text-white tracking-tight">{stat.value}</p>
                                    </div>
                                    <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>

            {/* Search & Filter */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex gap-4"
            >
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <Input
                        placeholder="Search operatives by role or department..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 h-12 bg-neutral-900/50 border-neutral-800 text-white placeholder-neutral-500 focus:border-orange-500/50 focus:ring-orange-500/20 rounded-xl backdrop-blur-sm transition-all"
                    />
                </div>
                <Button variant="outline" className="h-12 px-6 border-neutral-800 bg-neutral-900/50 text-neutral-300 hover:bg-neutral-800 hover:text-white rounded-xl">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                </Button>
            </motion.div>

            {/* Employee List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <Card className="bg-neutral-900/40 border-neutral-800 backdrop-blur-sm overflow-hidden rounded-2xl shadow-2xl">
                    <CardHeader className="border-b border-neutral-800/50 bg-neutral-900/50">
                        <CardTitle className="text-sm font-bold text-neutral-400 tracking-widest flex items-center gap-2">
                            <Shield className="w-4 h-4 text-orange-500" />
                            PERSONNEL DATABASE
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-neutral-800/50 bg-neutral-900/30">
                                        <th className="text-left py-4 px-6 text-xs font-bold text-neutral-500 tracking-wider">ID</th>
                                        <th className="text-left py-4 px-6 text-xs font-bold text-neutral-500 tracking-wider">ROLE</th>
                                        <th className="text-left py-4 px-6 text-xs font-bold text-neutral-500 tracking-wider">DEPARTMENT</th>
                                        <th className="text-left py-4 px-6 text-xs font-bold text-neutral-500 tracking-wider">EDUCATION</th>
                                        <th className="text-left py-4 px-6 text-xs font-bold text-neutral-500 tracking-wider">SATISFACTION</th>
                                        <th className="text-left py-4 px-6 text-xs font-bold text-neutral-500 tracking-wider">RISK LEVEL</th>
                                        <th className="text-right py-4 px-6 text-xs font-bold text-neutral-500 tracking-wider">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan={7} className="text-center py-12 text-neutral-500 animate-pulse">Scanning database...</td>
                                        </tr>
                                    ) : filteredAgents.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="text-center py-12 text-neutral-500">No operatives found matching criteria.</td>
                                        </tr>
                                    ) : (
                                        filteredAgents.map((agent, index) => (
                                            <motion.tr
                                                key={agent.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="border-b border-neutral-800/50 hover:bg-white/5 transition-colors cursor-pointer group"
                                                onClick={() => setSelectedAgent(agent)}
                                            >
                                                <td className="py-4 px-6 text-sm text-neutral-500 font-mono group-hover:text-white transition-colors">#{agent.id.toString().padStart(4, '0')}</td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-400 group-hover:bg-orange-500/20 group-hover:text-orange-500 transition-colors">
                                                            <Briefcase className="w-4 h-4" />
                                                        </div>
                                                        <span className="text-sm font-medium text-neutral-200 group-hover:text-white">{agent.JobRole}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-sm text-neutral-400">{agent.Department}</td>
                                                <td className="py-4 px-6 text-sm text-neutral-400">{agent.EducationField}</td>
                                                <td className="py-4 px-6">
                                                    <div className="flex gap-1">
                                                        {[...Array(4)].map((_, i) => (
                                                            <div
                                                                key={i}
                                                                className={`w-1.5 h-4 rounded-full ${i < agent.JobSatisfaction ? 'bg-emerald-500' : 'bg-neutral-800'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span
                                                        className={`text-xs px-3 py-1 rounded-full font-bold tracking-wide border ${agent.Attrition === "Yes" || agent.Attrition === "yes"
                                                            ? "bg-red-500/10 text-red-500 border-red-500/20"
                                                            : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                                            }`}
                                                    >
                                                        {agent.Attrition === "Yes" || agent.Attrition === "yes" ? "CRITICAL" : "STABLE"}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <Button variant="ghost" size="icon" className="text-neutral-500 hover:text-white hover:bg-neutral-800 rounded-lg">
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </Button>
                                                </td>
                                            </motion.tr>
                                        )))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Add Employee Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="w-full max-w-4xl"
                        >
                            <Card className="bg-neutral-900 border-neutral-800 shadow-2xl overflow-hidden">
                                <CardHeader className="flex flex-row items-center justify-between border-b border-neutral-800 bg-neutral-950 p-6">
                                    <div>
                                        <CardTitle className="text-xl font-black text-white tracking-wider flex items-center gap-3">
                                            <div className="p-2 bg-orange-500/10 rounded-lg">
                                                <Plus className="w-5 h-5 text-orange-500" />
                                            </div>
                                            NEW OPERATIVE ENTRY
                                        </CardTitle>
                                        <p className="text-neutral-500 text-sm mt-1 ml-12">Enter personnel details for analysis</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full w-10 h-10 p-0"
                                    >
                                        <X className="w-5 h-5" />
                                    </Button>
                                </CardHeader>
                                <CardContent className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                                    <form onSubmit={handleAddEmployee} className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {/* Personal Info */}
                                            <div className="col-span-full mb-2">
                                                <h3 className="text-sm font-bold text-orange-500 tracking-widest uppercase border-b border-orange-500/20 pb-2 mb-4">Personal Data</h3>
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Age</Label>
                                                <Input type="number" name="Age" value={Age} onChange={(e) => setAge(e.target.value)} className="bg-neutral-800 border-neutral-700 text-white focus:border-orange-500" required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Marital Status</Label>
                                                <select name="MaritalStatus" value={MaritalStatus} onChange={(e) => setMaritalStatus(e.target.value)} className="w-full h-10 px-3 rounded-md bg-neutral-800 border border-neutral-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all">
                                                    <option value="Single">Single</option>
                                                    <option value="Married">Married</option>
                                                    <option value="Divorced">Divorced</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Education Level (1-5)</Label>
                                                <Input type="number" name="Education" min="1" max="5" value={Education} onChange={(e) => setEducation(e.target.value)} className="bg-neutral-800 border-neutral-700 text-white focus:border-orange-500" required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Education Field</Label>
                                                <select name="EducationField" value={EducationField} onChange={(e) => setEducationField(e.target.value)} className="w-full h-10 px-3 rounded-md bg-neutral-800 border border-neutral-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all">
                                                    <option value="Life Sciences">Life Sciences</option>
                                                    <option value="Medical">Medical</option>
                                                    <option value="Marketing">Marketing</option>
                                                    <option value="Technical Degree">Technical Degree</option>
                                                    <option value="Human Resources">Human Resources</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>

                                            {/* Job Info */}
                                            <div className="col-span-full mt-4 mb-2">
                                                <h3 className="text-sm font-bold text-orange-500 tracking-widest uppercase border-b border-orange-500/20 pb-2 mb-4">Role Configuration</h3>
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Department</Label>
                                                <select name="Department" value={Department} onChange={(e) => setDepartment(e.target.value)} className="w-full h-10 px-3 rounded-md bg-neutral-800 border border-neutral-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all">
                                                    <option value="Research & Development">Research & Development</option>
                                                    <option value="Sales">Sales</option>
                                                    <option value="Human Resources">Human Resources</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Job Role</Label>
                                                <select name="JobRole" value={JobRole} onChange={(e) => setJobRole(e.target.value)} className="w-full h-10 px-3 rounded-md bg-neutral-800 border border-neutral-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all">
                                                    <option value="Research Scientist">Research Scientist</option>
                                                    <option value="Sales Executive">Sales Executive</option>
                                                    <option value="Laboratory Technician">Laboratory Technician</option>
                                                    <option value="Manufacturing Director">Manufacturing Director</option>
                                                    <option value="Healthcare Representative">Healthcare Representative</option>
                                                    <option value="Manager">Manager</option>
                                                    <option value="Sales Representative">Sales Representative</option>
                                                    <option value="Research Director">Research Director</option>
                                                    <option value="Human Resources">Human Resources</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Job Level (1-5)</Label>
                                                <Input type="number" name="JobLevel" min="1" max="5" value={JobLevel} onChange={(e) => setJobLevel(e.target.value)} className="bg-neutral-800 border-neutral-700 text-white focus:border-orange-500" required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Monthly Income</Label>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                                                    <Input type="number" name="MonthlyIncome" value={MonthlyIncome} onChange={(e) => setMonthlyIncome(e.target.value)} className="pl-6 bg-neutral-800 border-neutral-700 text-white focus:border-orange-500" required />
                                                </div>
                                            </div>

                                            {/* Work Details */}
                                            <div className="col-span-full mt-4 mb-2">
                                                <h3 className="text-sm font-bold text-orange-500 tracking-widest uppercase border-b border-orange-500/20 pb-2 mb-4">Performance Metrics</h3>
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Business Travel</Label>
                                                <select name="BusinessTravel" value={BusinessTravel} onChange={(e) => setBusinessTravel(e.target.value)} className="w-full h-10 px-3 rounded-md bg-neutral-800 border border-neutral-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all">
                                                    <option value="Travel_Rarely">Travel_Rarely</option>
                                                    <option value="Travel_Frequently">Travel_Frequently</option>
                                                    <option value="Non-Travel">Non-Travel</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-neutral-400 text-xs font-bold uppercase tracking-wider">OverTime</Label>
                                                <select name="OverTime" value={OverTime} onChange={(e) => setOverTime(e.target.value)} className="w-full h-10 px-3 rounded-md bg-neutral-800 border border-neutral-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all">
                                                    <option value="No">No</option>
                                                    <option value="Yes">Yes</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Total Working Years</Label>
                                                <Input type="number" name="TotalWorkingYears" value={TotalWorkingYears} onChange={(e) => setTotalWorkingYears(e.target.value)} className="bg-neutral-800 border-neutral-700 text-white focus:border-orange-500" required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Years At Company</Label>
                                                <Input type="number" name="YearsAtCompany" value={YearsAtCompany} onChange={(e) => setYearsAtCompany(e.target.value)} className="bg-neutral-800 border-neutral-700 text-white focus:border-orange-500" required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Years In Current Role</Label>
                                                <Input type="number" name="YearsInCurrentRole" value={YearsInCurrentRole} onChange={(e) => setYearsInCurrentRole(e.target.value)} className="bg-neutral-800 border-neutral-700 text-white focus:border-orange-500" required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Years With Curr Manager</Label>
                                                <Input type="number" name="YearsWithCurrManager" value={YearsWithCurrManager} onChange={(e) => setYearsWithCurrManager(e.target.value)} className="bg-neutral-800 border-neutral-700 text-white focus:border-orange-500" required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Training Times Last Year</Label>
                                                <Input type="number" name="TrainingTimesLastYear" value={TrainingTimesLastYear} onChange={(e) => setTrainingTimesLastYear(e.target.value)} className="bg-neutral-800 border-neutral-700 text-white focus:border-orange-500" required />
                                            </div>

                                            {/* Satisfaction & Ratings */}
                                            <div className="col-span-full mt-4 mb-2">
                                                <h3 className="text-sm font-bold text-orange-500 tracking-widest uppercase border-b border-orange-500/20 pb-2 mb-4">Psychometric Evaluation</h3>
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Environment Satisfaction (1-4)</Label>
                                                <Input type="number" name="EnvironmentSatisfaction" min="1" max="4" value={EnvironmentSatisfaction} onChange={(e) => setEnvironmentSatisfaction(e.target.value)} className="bg-neutral-800 border-neutral-700 text-white focus:border-orange-500" required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Job Involvement (1-4)</Label>
                                                <Input type="number" name="JobInvolvement" min="1" max="4" value={JobInvolvement} onChange={(e) => setJobInvolvement(e.target.value)} className="bg-neutral-800 border-neutral-700 text-white focus:border-orange-500" required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Job Satisfaction (1-4)</Label>
                                                <Input type="number" name="JobSatisfaction" min="1" max="4" value={JobSatisfaction} onChange={(e) => setJobSatisfaction(e.target.value)} className="bg-neutral-800 border-neutral-700 text-white focus:border-orange-500" required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Performance Rating (1-4)</Label>
                                                <Input type="number" name="PerformanceRating" min="1" max="4" value={PerformanceRating} onChange={(e) => setPerformanceRating(e.target.value)} className="bg-neutral-800 border-neutral-700 text-white focus:border-orange-500" required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Work Life Balance (1-4)</Label>
                                                <Input type="number" name="WorkLifeBalance" min="1" max="4" value={WorkLifeBalance} onChange={(e) => setWorkLifeBalance(e.target.value)} className="bg-neutral-800 border-neutral-700 text-white focus:border-orange-500" required />
                                            </div>
                                        </div>

                                        <div className="flex justify-end pt-8 border-t border-neutral-800 gap-4">
                                            <Button type="button" variant="ghost" onClick={() => setIsAddModalOpen(false)} className="text-neutral-400 hover:text-white hover:bg-neutral-800">Cancel</Button>
                                            <Button type="submit" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white shadow-lg shadow-orange-900/20 border-0 px-8" disabled={isSubmitting}>
                                                {isSubmitting ? "Processing..." : "Confirm Entry"}
                                            </Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Agent Detail Modal */}
            <AnimatePresence>
                {selectedAgent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                    >
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            className="w-full max-w-2xl"
                        >
                            <Card className="bg-neutral-900 border-neutral-800 shadow-2xl overflow-hidden">
                                <CardHeader className="flex flex-row items-center justify-between border-b border-neutral-800 bg-neutral-950 p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white shadow-lg shadow-orange-900/20">
                                            <Briefcase className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl font-black text-white tracking-wider">{selectedAgent.JobRole}</CardTitle>
                                            <p className="text-sm text-neutral-400 font-mono mt-1">ID: #{selectedAgent.id.toString().padStart(4, '0')}</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        onClick={() => setSelectedAgent(null)}
                                        className="text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full w-10 h-10 p-0"
                                    >
                                        <X className="w-5 h-5" />
                                    </Button>
                                </CardHeader>
                                <CardContent className="p-8 space-y-8">
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Department</p>
                                            <p className="text-lg font-medium text-white">{selectedAgent.Department}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Education</p>
                                            <p className="text-lg font-medium text-white">{selectedAgent.EducationField}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Tenure</p>
                                            <p className="text-lg font-medium text-white font-mono">{selectedAgent.YearsAtCompany} Years</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Status</p>
                                            <span
                                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold tracking-wide border ${selectedAgent.Attrition === "Yes" || selectedAgent.Attrition === "yes"
                                                    ? "bg-red-500/10 text-red-500 border-red-500/20"
                                                    : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                                    }`}
                                            >
                                                {selectedAgent.Attrition === "Yes" || selectedAgent.Attrition === "yes" ? "AT RISK" : "STABLE"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-neutral-800 flex gap-3">
                                        {
                                            (selectedAgent.Attrition === "Yes"|| selectedAgent.Attrition === "yes") ? (
                                                <Button onClick={() => handleGrowth(selectedAgent.id)} className="flex-[5] h-14 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white border-0 font-black tracking-widest uppercase shadow-lg shadow-orange-900/20 transition-all active:scale-95 cursor-pointer">
                                                   {isLoading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : "Generate Growth Plan"}
                                                </Button>
                                            ) : null
                                        }
                                        <Button 
                                            variant="outline"
                                            onClick={(e) => selectedAgent?.id && handleDelete(e, selectedAgent.id)}
                                            className="flex-[1] h-14 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white border-0 font-black tracking-widest uppercase shadow-lg shadow-orange-900/20 transition-all active:scale-95 cursor-pointer"
                                        >
                                            <Trash className="text-white" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
