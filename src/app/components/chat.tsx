import { ChatForm } from "@/app/components/chat-form"
import { ChatList } from "@/app/components/chat-list"

export const Chat = () => {
  return (
    <div className='h-full flex flex-col'>
      <ChatList />
      <ChatForm />
    </div>
  )
}
