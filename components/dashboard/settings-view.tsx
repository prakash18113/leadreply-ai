"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Save } from "lucide-react"

export function SettingsView() {
  const [showApiKey, setShowApiKey] = useState(false)
  const [autoReply, setAutoReply] = useState(true)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex-1 overflow-auto p-4 lg:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground">
          Configure your LeadReply AI preferences
        </p>
      </div>

      <div className="flex flex-col gap-6 max-w-2xl">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-foreground">API Configuration</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Manage your API key for external integrations
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="api-key" className="text-xs text-foreground">
                API Key
              </Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    id="api-key"
                    type={showApiKey ? "text" : "password"}
                    defaultValue="sk-lr-a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"
                    className="bg-secondary border-border text-sm font-mono text-foreground pr-10"
                  />
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    type="button"
                  >
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <Button variant="outline" size="default" className="border-border bg-secondary text-foreground hover:bg-muted text-sm">
                  Regenerate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-foreground">Auto-Reply Settings</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Control automatic response behavior
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-reply" className="text-sm text-foreground">
                  Enable Auto-Reply
                </Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Automatically generate and send replies to new messages
                </p>
              </div>
              <Switch
                id="auto-reply"
                checked={autoReply}
                onCheckedChange={setAutoReply}
              />
            </div>
            <Separator className="bg-border" />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="review-mode" className="text-sm text-foreground">
                  Review Before Sending
                </Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Queue replies for manual review instead of auto-sending
                </p>
              </div>
              <Switch id="review-mode" defaultChecked />
            </div>
            <Separator className="bg-border" />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notifications" className="text-sm text-foreground">
                  Email Notifications
                </Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Get notified when new messages arrive
                </p>
              </div>
              <Switch id="notifications" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-foreground">Business Information</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              This information is used to personalize AI-generated replies
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="company-name" className="text-xs text-foreground">
                  Company Name
                </Label>
                <Input
                  id="company-name"
                  defaultValue="LeadReply Inc."
                  className="bg-secondary border-border text-sm text-foreground"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="industry" className="text-xs text-foreground">
                  Industry
                </Label>
                <Input
                  id="industry"
                  defaultValue="SaaS / Technology"
                  className="bg-secondary border-border text-sm text-foreground"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="website" className="text-xs text-foreground">
                  Website
                </Label>
                <Input
                  id="website"
                  defaultValue="https://leadreply.ai"
                  className="bg-secondary border-border text-sm text-foreground"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="support-email" className="text-xs text-foreground">
                  Support Email
                </Label>
                <Input
                  id="support-email"
                  defaultValue="support@leadreply.ai"
                  className="bg-secondary border-border text-sm text-foreground"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description" className="text-xs text-foreground">
                Business Description
              </Label>
              <Textarea
                id="description"
                defaultValue="LeadReply AI is an intelligent auto-reply platform that helps businesses respond to leads faster with AI-generated, personalized responses."
                className="bg-secondary border-border text-sm text-foreground resize-none min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end pb-6">
          <Button
            onClick={handleSave}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Save className="mr-1.5 h-4 w-4" />
            {saved ? "Saved!" : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  )
}
