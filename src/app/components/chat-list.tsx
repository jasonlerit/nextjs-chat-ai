"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useChatStore } from "@/stores/use-chat.store"

export const ChatList = () => {
  const messages = useChatStore((state) => state.messages)

  return (
    <div className='flex-1 overflow-y-auto'>
      <div className='container mx-auto lg:max-w-4xl flex flex-col gap-4 px-4'>
        {messages.map((message, index) => (
          <Card key={index} className='w-11/12 lg:w-3/4'>
            <CardContent className='p-4'>
              <p className='whitespace-pre text-wrap'>{message}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
