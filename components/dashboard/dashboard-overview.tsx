"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Send, Clock, TrendingUp, ArrowUp, ArrowDown } from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

const stats = [
  {
    title: "Total Messages",
    value: "2,847",
    change: "+12.5%",
    trend: "up" as const,
    icon: MessageSquare,
  },
  {
    title: "Replies Sent",
    value: "2,134",
    change: "+8.2%",
    trend: "up" as const,
    icon: Send,
  },
  {
    title: "Avg Response Time",
    value: "1.2s",
    change: "-23%",
    trend: "up" as const,
    icon: Clock,
  },
  {
    title: "Conversion Rate",
    value: "34.2%",
    change: "+4.1%",
    trend: "up" as const,
    icon: TrendingUp,
  },
]

const areaData = [
  { name: "Mon", messages: 320, replies: 280 },
  { name: "Tue", messages: 450, replies: 400 },
  { name: "Wed", messages: 380, replies: 350 },
  { name: "Thu", messages: 520, replies: 470 },
  { name: "Fri", messages: 480, replies: 440 },
  { name: "Sat", messages: 200, replies: 180 },
  { name: "Sun", messages: 150, replies: 130 },
]

const barData = [
  { name: "Professional", count: 820 },
  { name: "Friendly", count: 640 },
  { name: "Sales", count: 520 },
  { name: "Custom", count: 154 },
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

export function DashboardOverview() {
  return (
    <div className="flex-1 overflow-auto p-4 lg:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Overview of your auto-reply performance this week
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <span
                    className={`flex items-center gap-0.5 text-xs font-medium ${
                      stat.trend === "up" ? "text-chart-1" : "text-destructive"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUp className="h-3 w-3" />
                    ) : (
                      <ArrowDown className="h-3 w-3" />
                    )}
                    {stat.change}
                  </span>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold text-foreground tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-7">
        <Card className="bg-card border-border xl:col-span-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Messages & Replies
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData}>
                  <defs>
                    <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(152, 60%, 52%)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(152, 60%, 52%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorReplies" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(200, 70%, 50%)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(200, 70%, 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
                  <XAxis dataKey="name" tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="messages"
                    stroke="hsl(152, 60%, 52%)"
                    fill="url(#colorMessages)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="replies"
                    stroke="hsl(200, 70%, 50%)"
                    fill="url(#colorReplies)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border xl:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Replies by Tone
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" horizontal={false} />
                  <XAxis type="number" tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    width={85}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="count"
                    fill="hsl(152, 60%, 52%)"
                    radius={[0, 4, 4, 0]}
                    barSize={24}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
