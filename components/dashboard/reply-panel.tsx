"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RefreshCw, Send, Pencil, Sparkles, Copy, Check } from "lucide-react"
import type { Message } from "./message-list"

interface ReplyPanelProps {
  message: Message | null
}

export function ReplyPanel({ message }: ReplyPanelProps) {
  const [tone, setTone] = useState("professional")
  const [isEditing, setIsEditing] = useState(false)
  const [editedReply, setEditedReply] = useState("")
  const [copied, setCopied] = useState(false)
  const [sending, setSending] = useState(false)
  const [aiReply, setAiReply] = useState("")

  /* ================= AUTO GENERATE ================= */

  useEffect(() => {
    if (!message) return

    const generate = async () => {
      try {
        setSending(true)

        const res = await fetch("/api/reply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: message.fullMessage,
            tone,
          }),
        })

        if (!res.ok) {
          setAiReply("Error generating reply.")
          return
        }

        const data = await res.json()
        setAiReply(data.reply || "No reply generated.")
      } catch (err) {
        console.error(err)
        setAiReply("Failed to generate reply.")
      } finally {
        setSending(false)
      }
    }

    generate()
  }, [message, tone])

  /* ================= LOGIC ================= */

  const generatedReply = isEditing ? editedReply : aiReply

  const handleEdit = () => {
    setEditedReply(aiReply)
    setIsEditing(true)
  }

  const handleRegenerate = async () => {
    if (!message) return

    try {
      setSending(true)
      setIsEditing(false)
      setEditedReply("")

      const res = await fetch("/api/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message.fullMessage,
          tone,
        }),
      })

      if (!res.ok) {
        setAiReply("Error regenerating reply.")
        return
      }

      const data = await res.json()
      setAiReply(data.reply || "No reply generated.")
    } catch (err) {
      console.error(err)
      setAiReply("Failed to regenerate reply.")
    } finally {
      setSending(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReply)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSend = () => {
    setSending(true)
    setTimeout(() => setSending(false), 1500)
  }

  /* ================= EMPTY STATE ================= */

  if (!message) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="text-center">
          <Sparkles className="mx-auto h-6 w-6 opacity-50" />
          <p className="mt-3 text-sm font-medium">No message selected</p>
          <p className="text-xs opacity-60">
            Select a message to generate AI reply
          </p>
        </div>
      </div>
    )
  }

  /* ================= UI ================= */

  return (
    <div className="flex flex-1 flex-col">

      {/* HEADER */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div>
          <h3 className="text-sm font-semibold">{message.sender}</h3>
          <p className="text-xs opacity-60">{message.timestamp}</p>
        </div>

        <Select
          value={tone}
          onValueChange={(v) => {
            setTone(v)
            setIsEditing(false)
          }}
        >
          <SelectTrigger className="h-8 w-[140px] text-xs">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="professional">Professional</SelectItem>
            <SelectItem value="friendly">Friendly</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* BODY */}
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-4 max-w-2xl">

          {/* MESSAGE */}
          <div>
            <label className="text-xs opacity-60 uppercase">
              Original Message
            </label>

            <div className="rounded-lg border p-4 mt-2">
              <p className="text-sm whitespace-pre-line">
                {message.fullMessage}
              </p>
            </div>
          </div>

          {/* REPLY */}
          <div>
            <label className="text-xs opacity-60 uppercase flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              AI Generated Reply
            </label>

            {isEditing ? (
              <Textarea
                value={editedReply}
                onChange={(e) => setEditedReply(e.target.value)}
                className="min-h-[200px] mt-2"
              />
            ) : (
              <div className="rounded-lg border p-4 mt-2">
                <p className="text-sm whitespace-pre-line">
                  {sending ? "Generating reply..." : generatedReply}
                </p>
              </div>
            )}
          </div>

        </div>
      </ScrollArea>

      {/* FOOTER */}
      <div className="flex flex-wrap items-center gap-2 border-t px-4 py-3">

        <Button size="sm" variant="outline" onClick={handleRegenerate}>
          <RefreshCw className="mr-1 h-3.5 w-3.5" />
          Regenerate
        </Button>

        <Button size="sm" variant="outline" onClick={handleEdit}>
          <Pencil className="mr-1 h-3.5 w-3.5" />
          Edit
        </Button>

        <Button size="sm" variant="outline" onClick={handleCopy}>
          {copied ? <Check className="mr-1 h-3.5 w-3.5" /> : <Copy className="mr-1 h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </Button>

        <Button size="sm" onClick={handleSend} disabled={sending} className="ml-auto">
          <Send className="mr-1 h-3.5 w-3.5" />
          {sending ? "Sending..." : "Send Reply"}
        </Button>

      </div>
    </div>
  )
}
