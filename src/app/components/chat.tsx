import { ChatForm } from "@/app/components/chat-form"
import { ChatList } from "@/app/components/chat-list"

export const Chat = () => {
  return (
    <div className='h-full flex flex-col gap-4 pt-14 pb-4'>
      <ChatList />
      <ChatForm />
    </div>
  )
}
