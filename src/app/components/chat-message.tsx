import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
      className={`${message.role === Role.USER ? "max-w-[90%] lg:max-w-[80%] self-end bg-primary text-primary-foreground" : "border-none shadow-none"}`}
    >
      <CardContent className='flex gap-4 p-4'>
        {message.role === Role.ASSISTANT && (
          <Avatar>
            <AvatarImage src='https://github.com/jatnerubia.png' alt='avatar' />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        )}
        <p className='whitespace-pre text-wrap'>{message.content}</p>
      </CardContent>
    </Card>
  )
})
