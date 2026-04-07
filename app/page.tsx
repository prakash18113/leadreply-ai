"use client"

import { useMemo, useState } from "react"
import { SidebarNav } from "@/components/dashboard/sidebar-nav"
import { HeaderBar } from "@/components/dashboard/header-bar"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { MessagesView } from "@/components/dashboard/messages-view"
import { AnalyticsView } from "@/components/dashboard/analytics-view"
import { SettingsView } from "@/components/dashboard/settings-view"
import { BillingView } from "@/components/dashboard/billing-view"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  Settings,
  CreditCard,
  Shield,
  Rocket,
  Cloud,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react"

const appNavItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "billing", label: "Billing", icon: CreditCard },
] as const

const trustLogos = ["Stripe", "HubSpot", "Notion", "Slack", "Shopify", "Zapier"]

const highlights = [
  {
    title: "Mobile-first command center",
    description: "Run your revenue workflows from phone, tablet, or desktop with adaptive layouts.",
    icon: Smartphone,
  },
  {
    title: "Secure by design",
    description: "Role-based access, API key controls, and encrypted data flow by default.",
    icon: Shield,
  },
  {
    title: "Cloud autoscaling",
    description: "Deploy on modern cloud primitives with edge caching and low-latency response APIs.",
    icon: Cloud,
  },
  {
    title: "Speed tuned",
    description: "Fast loading dashboards and instant AI replies designed to convert leads quickly.",
    icon: Rocket,
  },
]

export default function Page() {
  const [experience, setExperience] = useState<"landing" | "app">("landing")
  const [activeView, setActiveView] = useState<string>("messages")

  const ActiveView = useMemo(() => {
    switch (activeView) {
      case "dashboard":
        return <DashboardOverview />
      case "messages":
        return <MessagesView />
      case "analytics":
        return <AnalyticsView />
      case "settings":
        return <SettingsView />
      case "billing":
        return <BillingView />
      default:
        return <MessagesView />
    }
  }, [activeView])

  if (experience === "app") {
    return (
      <div className="flex h-screen overflow-hidden bg-background">
        <SidebarNav activeView={activeView} onNavigate={setActiveView} />

        <div className="flex flex-1 flex-col overflow-hidden pb-14 lg:pb-0">
          <HeaderBar activeView={activeView} onNavigate={setActiveView} />
          <main className="flex flex-1 overflow-hidden">{ActiveView}</main>
        </div>

        <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur lg:hidden">
          <ul className="grid grid-cols-5 gap-1 p-1.5">
            {appNavItems.map((item) => {
              const Icon = item.icon
              const isActive = activeView === item.id

              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveView(item.id)}
                    className={cn(
                      "flex w-full flex-col items-center justify-center gap-0.5 rounded-md px-1 py-1.5 text-[10px]",
                      isActive ? "bg-secondary text-foreground" : "text-muted-foreground"
                    )}
                  >
                    <Icon className={cn("h-4 w-4", isActive && "text-primary")} />
                    {item.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold">LeadReply Cloud</p>
            <p className="text-xs text-muted-foreground">AI revenue autopilot</p>
          </div>
        </div>
        <Button onClick={() => setExperience("app")} className="bg-primary text-primary-foreground">
          Launch SaaS App
        </Button>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-16 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-border bg-card p-6 sm:p-10">
          <Badge className="mb-4 bg-primary/20 text-primary hover:bg-primary/20">
            Built for speed, security, and scale
          </Badge>
          <h1 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            Convert leads into paying customers with an always-on AI sales team.
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
            LeadReply Cloud is a mobile-adaptive SaaS platform that captures inbound messages,
            drafts personalized replies, tracks conversions, and monetizes via tiered subscriptions.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => setExperience("app")}>Start free trial</Button>
            <Button variant="outline" className="border-border bg-secondary/40">
              View pricing
            </Button>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {trustLogos.map((logo) => (
            <div
              key={logo}
              className="rounded-xl border border-border bg-card px-3 py-4 text-center text-xs font-medium text-muted-foreground"
            >
              {logo}
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {highlights.map((item) => {
            const Icon = item.icon
            return (
              <Card key={item.title} className="border-border bg-card">
                <CardContent className="flex gap-4 p-5">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold">{item.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold">Revenue model included</p>
              <p className="text-sm text-muted-foreground">
                Freemium + Pro + Enterprise plans with usage caps, invoices, and upgrade flows.
              </p>
            </div>
            <Button onClick={() => setExperience("app")}>
              <Sparkles className="mr-1.5 h-4 w-4" />
              Open monetization dashboard
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
