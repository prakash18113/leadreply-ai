"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  Settings,
  CreditCard,
  Zap,
} from "lucide-react"

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "billing", label: "Billing", icon: CreditCard },
]

interface SidebarNavProps {
  activeView: string
  onNavigate: (view: string) => void
}

export function SidebarNav({ activeView, onNavigate }: SidebarNavProps) {
  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-sidebar">
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-border">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Zap className="h-4 w-4 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-sidebar-accent-foreground tracking-tight">
            LeadReply AI
          </h1>
          <p className="text-[11px] text-sidebar-foreground">Auto-reply engine</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="flex flex-col gap-1" role="list">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeView === item.id
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className={cn("h-4 w-4", isActive && "text-primary")} />
                  {item.label}
                  {item.id === "messages" && (
                    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">
                      12
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="border-t border-border px-4 py-4">
        <div className="rounded-lg bg-secondary p-3">
          <p className="text-xs font-medium text-foreground">Pro Plan</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            2,847 / 5,000 replies used
          </p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: "57%" }}
            />
          </div>
        </div>
      </div>
    </aside>
  )
}
