"use client"

import { ChatForm } from "@/app/components/chat-form"
import { ChatList } from "@/app/components/chat-list"
import { ChatSuggestions } from "@/app/components/chat-suggestions"
import { useUserTokenStore } from "@/stores/use-user-token.store"
import { useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

export const Chat = () => {
  const userToken = useUserTokenStore((state) => state.userToken)
  const setUserToken = useUserTokenStore((state) => state.setUserToken)

  useEffect(() => {
    if (userToken === null) {
      setUserToken(uuidv4())
    }
  }, [userToken, setUserToken])

  return (
    <div className='h-full flex flex-col gap-6 pt-14 pb-4'>
      <ChatList />
      <ChatSuggestions />
      <ChatForm />
    </div>
  )
}
