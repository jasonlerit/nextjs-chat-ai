import { Card, CardContent } from "@/components/ui/card"
import { Message } from "@/types/message.type"
import { Role } from "@/types/role.type"
import { memo } from "react"

interface Props {
  message: Message
}

export const ChatMessage = memo(function ChatMessage({ message }: Props) {
  return (
    <Card
      className={`w-11/12 lg:w-3/4 ${message.role === Role.USER ? "self-end bg-primary text-primary-foreground" : "border-none shadow-none"}`}
    >
      <CardContent className='p-4'>
        <p className='whitespace-pre text-wrap'>{message.content}</p>
      </CardContent>
    </Card>
  )
})
