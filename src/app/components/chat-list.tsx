"use client"

import { useChatStore } from "@/stores/use-chat-store"

export const ChatList = () => {
  const messages = useChatStore((state) => state.messages)

  return (
    <div className='bg-slate-100 flex-1 flex flex-col gap-4 overflow-y-auto'>
      {messages.map((message, index) => (
        <div key={index}>
          <p className='whitespace-pre'>{message}</p>
        </div>
      ))}
    </div>
  )
}
