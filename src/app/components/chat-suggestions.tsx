"use client"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useSendChatMutation } from "@/hooks/use-send-chat-mutation"
import { toast } from "@/hooks/use-toast"
import { useChatStore } from "@/stores/use-chat.store"
import { Role } from "@/types/role.type"
import { Suggestion } from "@/types/suggestion.type"
import { getSuggestions } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

export const ChatSuggestions = () => {
  const messages = useChatStore((state) => state.messages)
  const addMessage = useChatStore((state) => state.addMessage)

  const { isPending, data, error } = useQuery({
    queryKey: ["suggestions"],
    queryFn: getSuggestions,
  })

  const mutation = useSendChatMutation()

  useEffect(() => {
    if (error !== null) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to retrieve suggestions.",
      })
    }
  }, [error])

  const handleSendSuggestion = (suggestion: Suggestion) => {
    const prompt = `${suggestion.task} ${suggestion.detail}`
    addMessage({
      role: Role.USER,
      content: prompt,
    })
    addMessage({
      role: Role.ASSISTANT,
      content: "",
    })
    mutation.mutate({
      prompt,
    })
  }

  return messages.length === 0 ? (
    <div className='container mx-auto lg:max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-2 px-4'>
      {isPending &&
        Array.from(Array(4)).map((_, index) => (
          <div key={index} className='flex flex-col gap-2 p-4 rounded-md border'>
            <Skeleton className='h-2 w-1/2' />
            <Skeleton className='h-2 w-3/4' />
          </div>
        ))}
      {data?.map((suggestion, index) => (
        <Button
          key={index}
          variant='outline'
          className='h-auto flex flex-col text-left'
          onClick={() => handleSendSuggestion(suggestion)}
          disabled={mutation.isPending}
        >
          <div className='w-full overflow-hidden font-semibold'>{suggestion.task}</div>
          <div className='w-full text-muted-foreground text-wrap'>{suggestion.detail}</div>
        </Button>
      ))}
    </div>
  ) : null
}
