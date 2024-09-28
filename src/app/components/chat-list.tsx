"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useChatStore } from "@/stores/use-chat.store"
import { Role } from "@/types/role.type"

export const ChatList = () => {
  const messages = useChatStore((state) => state.messages)

  return (
    <div className='flex-1 overflow-y-auto'>
      <div className='container mx-auto lg:max-w-4xl flex flex-col gap-8 px-4'>
        {messages.map((message, index) => (
          <Card
            key={index}
            className={`w-11/12 lg:w-3/4 ${message.role === Role.USER ? "self-end bg-primary text-primary-foreground" : "border-none shadow-none"}`}
          >
            <CardContent className='p-4'>
              <p className='whitespace-pre text-wrap'>{message.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
