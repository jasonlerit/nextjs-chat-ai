"use client"

import { useChatStore } from "@/stores/use-chat.store"

export const ChatList = () => {
  const messages = useChatStore((state) => state.messages)

  return (
    <div className='flex-1 overflow-y-auto'>
      <div className='container mx-auto lg:max-w-4xl flex flex-col gap-4 px-4'>
        {messages.map((message, index) => (
          <div key={index}>
            <p className='whitespace-pre text-wrap'>{message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
