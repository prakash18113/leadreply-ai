"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

export interface Message {
  id: string
  sender: string
  initials: string
  preview: string
  timestamp: string
  status: "new" | "replied" | "pending"
  fullMessage: string
}

export const sampleMessages: Message[] = [
  {
    id: "1",
    sender: "Alex Thompson",
    initials: "AT",
    preview: "Hi, I'm interested in your enterprise plan. Can we schedule a demo?",
    timestamp: "2 min ago",
    status: "new",
    fullMessage:
      "Hi there,\n\nI'm Alex Thompson, VP of Sales at Pinnacle Corp. I came across your product through a colleague's recommendation and I'm very interested in learning more about the enterprise plan.\n\nSpecifically, I'd love to understand:\n- Pricing for 50+ seats\n- Custom API integrations\n- SLA guarantees\n\nCould we schedule a demo this week? I'm available Tuesday or Thursday afternoon.\n\nBest regards,\nAlex Thompson",
  },
  {
    id: "2",
    sender: "Sarah Chen",
    initials: "SC",
    preview: "Following up on our conversation about the API integration...",
    timestamp: "15 min ago",
    status: "pending",
    fullMessage:
      "Hi,\n\nI wanted to follow up on our conversation last week regarding API integration possibilities. Our engineering team has reviewed the documentation and we have a few questions about rate limits and webhook configurations.\n\nCan you point us to the right technical contact?\n\nThanks,\nSarah Chen\nCTO, DataFlow Inc.",
  },
  {
    id: "3",
    sender: "Marcus Rivera",
    initials: "MR",
    preview: "Thanks for the quick response! We'd like to move forward with...",
    timestamp: "1 hr ago",
    status: "replied",
    fullMessage:
      "Hey,\n\nThanks for the quick response! We've reviewed the proposal and everything looks great. We'd like to move forward with the Professional plan starting next month.\n\nCan you send over the contract?\n\nCheers,\nMarcus Rivera",
  },
  {
    id: "4",
    sender: "Emily Watson",
    initials: "EW",
    preview: "Can you send me more details about pricing for our team of 20?",
    timestamp: "3 hrs ago",
    status: "new",
    fullMessage:
      "Hello,\n\nWe're a growing startup with about 20 team members, and we're looking for a solution to help with our lead management. Could you send me more details about your pricing, especially for teams of our size?\n\nAlso, do you offer any startup discounts?\n\nBest,\nEmily Watson\nCEO, GrowthStack",
  },
  {
    id: "5",
    sender: "James Park",
    initials: "JP",
    preview: "The integration with our CRM has been seamless. Quick question...",
    timestamp: "5 hrs ago",
    status: "replied",
    fullMessage:
      "Hi team,\n\nJust wanted to say the integration with our Salesforce CRM has been seamless so far. Quick question though - is there a way to customize the auto-reply templates based on lead source?\n\nThanks,\nJames Park",
  },
  {
    id: "6",
    sender: "Olivia Martinez",
    initials: "OM",
    preview: "We're evaluating several tools and would love a comparison...",
    timestamp: "Yesterday",
    status: "pending",
    fullMessage:
      "Hi there,\n\nWe're currently evaluating several auto-reply and lead management tools for our sales team. Would you be able to provide a comparison sheet or highlight what sets LeadReply AI apart from competitors?\n\nAlso interested in a trial period if available.\n\nRegards,\nOlivia Martinez\nHead of Sales Ops, NexGen Solutions",
  },
]

const statusConfig = {
  new: { label: "New", className: "bg-primary/15 text-primary border-primary/20" },
  replied: { label: "Replied", className: "bg-chart-2/15 text-chart-2 border-chart-2/20" },
  pending: { label: "Pending", className: "bg-chart-3/15 text-chart-3 border-chart-3/20" },
}

interface MessageListProps {
  messages: Message[]
  selectedId: string | null
  onSelect: (message: Message) => void
}

export function MessageList({ messages, selectedId, onSelect }: MessageListProps) {
  return (
    <div className="flex flex-col border-r border-border bg-card h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h2 className="text-sm font-semibold text-foreground">Inbox</h2>
        <span className="text-xs text-muted-foreground">{messages.length} messages</span>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col">
          {messages.map((message) => {
            const status = statusConfig[message.status]
            const isSelected = selectedId === message.id
            return (
              <button
                key={message.id}
                onClick={() => onSelect(message)}
                className={cn(
                  "flex items-start gap-3 px-4 py-3.5 text-left transition-colors border-b border-border",
                  isSelected
                    ? "bg-secondary"
                    : "hover:bg-secondary/50"
                )}
              >
                <Avatar className="h-9 w-9 shrink-0 mt-0.5">
                  <AvatarFallback
                    className={cn(
                      "text-[11px] font-semibold",
                      message.status === "new"
                        ? "bg-primary/15 text-primary"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {message.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className={cn(
                      "text-sm truncate",
                      message.status === "new" ? "font-semibold text-foreground" : "font-medium text-foreground"
                    )}>
                      {message.sender}
                    </span>
                    <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                      {message.timestamp}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground truncate leading-relaxed">
                    {message.preview}
                  </p>
                  <Badge
                    variant="outline"
                    className={cn("mt-1.5 text-[10px] px-1.5 py-0 h-5 border", status.className)}
                  >
                    {status.label}
                  </Badge>
                </div>
              </button>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
