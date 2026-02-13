"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "/month",
    description: "For individuals just getting started",
    features: ["100 replies/month", "1 connected inbox", "Basic tone settings", "Email support"],
    current: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    description: "For growing teams and businesses",
    features: [
      "5,000 replies/month",
      "5 connected inboxes",
      "All tone presets + custom",
      "Priority support",
      "CRM integrations",
      "Analytics dashboard",
    ],
    current: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations",
    features: [
      "Unlimited replies",
      "Unlimited inboxes",
      "Custom AI training",
      "Dedicated account manager",
      "SLA guarantee",
      "SSO & SAML",
      "Custom integrations",
    ],
    current: false,
  },
]

const invoices = [
  { id: "INV-001", date: "Feb 1, 2026", amount: "$49.00", status: "Paid" },
  { id: "INV-002", date: "Jan 1, 2026", amount: "$49.00", status: "Paid" },
  { id: "INV-003", date: "Dec 1, 2025", amount: "$49.00", status: "Paid" },
  { id: "INV-004", date: "Nov 1, 2025", amount: "$29.00", status: "Paid" },
]

export function BillingView() {
  return (
    <div className="flex-1 overflow-auto p-4 lg:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">Billing</h2>
        <p className="text-sm text-muted-foreground">
          Manage your subscription and billing information
        </p>
      </div>

      <div className="flex flex-col gap-6 max-w-4xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "bg-card border-border relative",
                plan.current && "border-primary"
              )}
            >
              {plan.current && (
                <Badge className="absolute -top-2.5 left-4 bg-primary text-primary-foreground text-[10px] px-2">
                  Current Plan
                </Badge>
              )}
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-foreground">{plan.name}</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  {plan.description}
                </CardDescription>
                <div className="mt-2">
                  <span className="text-2xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-2" role="list">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.current ? "outline" : "default"}
                  size="sm"
                  className={cn(
                    "mt-4 w-full text-xs",
                    plan.current
                      ? "border-border bg-secondary text-foreground hover:bg-muted"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  {plan.current ? "Current Plan" : plan.name === "Enterprise" ? "Contact Sales" : "Upgrade"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-foreground">Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-14 items-center justify-center rounded-md bg-secondary border border-border">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-foreground font-medium">{"Visa ending in 4242"}</p>
                <p className="text-xs text-muted-foreground">{"Expires 12/2027"}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="ml-auto border-border bg-secondary text-foreground hover:bg-muted text-xs"
              >
                Update
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-foreground">Billing History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-2 text-left text-xs font-medium text-muted-foreground">Invoice</th>
                    <th className="pb-2 text-left text-xs font-medium text-muted-foreground">Date</th>
                    <th className="pb-2 text-left text-xs font-medium text-muted-foreground">Amount</th>
                    <th className="pb-2 text-left text-xs font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-border last:border-0">
                      <td className="py-3 text-sm text-foreground font-mono">{invoice.id}</td>
                      <td className="py-3 text-sm text-muted-foreground">{invoice.date}</td>
                      <td className="py-3 text-sm text-foreground">{invoice.amount}</td>
                      <td className="py-3">
                        <Badge variant="outline" className="bg-chart-1/15 text-chart-1 border-chart-1/20 text-[10px]">
                          {invoice.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
