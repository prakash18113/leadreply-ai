"use client"

import { useState } from "react"
import { MessageList, sampleMessages } from "./message-list"
import { ReplyPanel } from "./reply-panel"
import type { Message } from "./message-list"

export function MessagesView() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(sampleMessages[0])

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="w-full md:w-80 lg:w-96 shrink-0">
        <MessageList
          messages={sampleMessages}
          selectedId={selectedMessage?.id ?? null}
          onSelect={setSelectedMessage}
        />
      </div>
      <div className="hidden md:flex flex-1">
        <ReplyPanel message={selectedMessage} />
      </div>
    </div>
  )
}
