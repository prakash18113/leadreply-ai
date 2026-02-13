"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  MessageSquare,
  Send,
  Clock,
  TrendingUp,
  Users,
  Target,
  Zap,
  BarChart3,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const metrics = [
  { title: "Total Messages", value: "12,847", icon: MessageSquare, description: "All time" },
  { title: "Replies Sent", value: "10,234", icon: Send, description: "All time" },
  { title: "Avg Response Time", value: "1.2s", icon: Clock, description: "This month" },
  { title: "Conversion Rate", value: "34.2%", icon: TrendingUp, description: "This month" },
  { title: "Active Leads", value: "847", icon: Users, description: "Current" },
  { title: "Reply Accuracy", value: "96.8%", icon: Target, description: "AI score" },
  { title: "Auto-replies", value: "8,421", icon: Zap, description: "Automated" },
  { title: "Manual Edits", value: "1,813", icon: BarChart3, description: "User modified" },
]

const lineData = [
  { name: "Week 1", messages: 1200, replies: 1050, conversions: 380 },
  { name: "Week 2", messages: 1450, replies: 1320, conversions: 450 },
  { name: "Week 3", messages: 1380, replies: 1250, conversions: 420 },
  { name: "Week 4", messages: 1720, replies: 1580, conversions: 540 },
]

const pieData = [
  { name: "Email", value: 45, color: "hsl(152, 60%, 52%)" },
  { name: "LinkedIn", value: 28, color: "hsl(200, 70%, 50%)" },
  { name: "Web Form", value: 18, color: "hsl(35, 90%, 56%)" },
  { name: "Other", value: 9, color: "hsl(215, 12%, 40%)" },
]

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string; color: string }>; label?: string }) {
  if (active && payload?.length) {
    return (
      <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
        <p className="text-xs font-medium text-foreground mb-1">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} className="text-xs text-muted-foreground">
            <span className="inline-block h-2 w-2 rounded-full mr-1.5" style={{ backgroundColor: entry.color }} />
            {entry.dataKey}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function AnalyticsView() {
  return (
    <div className="flex-1 overflow-auto p-4 lg:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">Analytics</h2>
        <p className="text-sm text-muted-foreground">
          Deep dive into your auto-reply performance metrics
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.title} className="bg-card border-border">
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-[11px] text-muted-foreground">{metric.description}</span>
                </div>
                <p className="mt-2 text-xl font-bold text-foreground tracking-tight">
                  {metric.value}
                </p>
                <p className="text-[11px] text-muted-foreground">{metric.title}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="bg-card border-border xl:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Monthly Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
                  <XAxis dataKey="name" tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="messages" stroke="hsl(152, 60%, 52%)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="replies" stroke="hsl(200, 70%, 50%)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="conversions" stroke="hsl(35, 90%, 56%)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Lead Sources
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2">
              {pieData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-1.5">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-[11px] text-muted-foreground">
                    {entry.name} ({entry.value}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
