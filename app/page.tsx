"use client"

import { useState } from "react"
import { SidebarNav } from "@/components/dashboard/sidebar-nav"
import { HeaderBar } from "@/components/dashboard/header-bar"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { MessagesView } from "@/components/dashboard/messages-view"
import { AnalyticsView } from "@/components/dashboard/analytics-view"
import { SettingsView } from "@/components/dashboard/settings-view"
import { BillingView } from "@/components/dashboard/billing-view"

export default function Page() {
  const [activeView, setActiveView] = useState("messages")

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SidebarNav activeView={activeView} onNavigate={setActiveView} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <HeaderBar activeView={activeView} onNavigate={setActiveView} />
        <main className="flex flex-1 overflow-hidden">
          {activeView === "dashboard" && <DashboardOverview />}
          {activeView === "messages" && <MessagesView />}
          {activeView === "analytics" && <AnalyticsView />}
          {activeView === "settings" && <SettingsView />}
          {activeView === "billing" && <BillingView />}
        </main>
      </div>
    </div>
  )
}
