"use client"

import { ChatMessage } from "@/app/components/chat-message"
import { useChatStore } from "@/stores/use-chat.store"

export const ChatList = () => {
  const messages = useChatStore((state) => state.messages)

  return (
    <div className='flex-1 overflow-y-auto'>
      <div className='container mx-auto lg:max-w-4xl flex flex-col gap-8 px-4'>
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </div>
    </div>
  )
}
