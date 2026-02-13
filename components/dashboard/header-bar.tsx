"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  Bell,
  Menu,
  Zap,
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  Settings,
  CreditCard,
  User,
  LogOut,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const mobileNavItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "billing", label: "Billing", icon: CreditCard },
]

interface HeaderBarProps {
  activeView: string
  onNavigate: (view: string) => void
}

export function HeaderBar({ activeView, onNavigate }: HeaderBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="flex h-14 items-center gap-4 border-b border-border bg-card px-4 lg:px-6">
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden text-muted-foreground">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-sidebar border-border p-0">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="flex items-center gap-2.5 px-6 py-5 border-b border-border">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold text-sidebar-accent-foreground">
              LeadReply AI
            </span>
          </div>
          <nav className="px-3 py-4">
            <ul className="flex flex-col gap-1" role="list">
              {mobileNavItems.map((item) => {
                const Icon = item.icon
                const isActive = activeView === item.id
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        onNavigate(item.id)
                        setMobileOpen(false)
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
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
        </SheetContent>
      </Sheet>

      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search messages, contacts..."
          className="h-9 pl-9 bg-secondary border-border text-sm text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
          <span className="sr-only">Notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2 hover:bg-secondary">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:block text-sm font-medium text-foreground">
                Jane Doe
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-card border-border">
            <DropdownMenuItem className="text-foreground focus:bg-secondary">
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-foreground focus:bg-secondary">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem className="text-destructive focus:bg-secondary">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
