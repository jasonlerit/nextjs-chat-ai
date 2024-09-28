import { ChatForm } from "@/app/components/chat-form"
import { ChatList } from "@/app/components/chat-list"
import { ChatSuggestions } from "@/app/components/chat-suggestions"

export const Chat = () => {
  return (
    <div className='h-full flex flex-col gap-6 pt-14 pb-4'>
      <ChatList />
      <ChatSuggestions />
      <ChatForm />
    </div>
  )
}
