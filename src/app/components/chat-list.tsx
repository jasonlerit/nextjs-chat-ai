import { ChatMessage } from "@/app/components/chat-message"
import { useChatStore } from "@/stores/use-chat.store"
import { useEffect, useRef } from "react"

export const ChatList = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const messages = useChatStore((state) => state.messages)

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        block: "start",
        behavior: "smooth",
      })
    }
  }, [messages])

  return (
    <div className='flex-1 pt-8 overflow-y-auto'>
      <div className='container mx-auto lg:max-w-4xl flex flex-col gap-8 px-4'>
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            messageRef={messages.length - 1 === index ? ref : undefined}
            message={message}
          />
        ))}
      </div>
    </div>
  )
}
