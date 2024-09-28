"use client"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/hooks/use-toast"
import { useChatStore } from "@/stores/use-chat.store"
import { getSuggestions } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

export const ChatSuggestions = () => {
  const messages = useChatStore((state) => state.messages)

  const { isPending, data, error } = useQuery({
    queryKey: ["suggestions"],
    queryFn: getSuggestions,
  })

  useEffect(() => {
    if (error !== null) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to retrieve suggestions.",
      })
    }
  }, [error])

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
        <Button key={index} variant='outline' className='h-auto flex flex-col text-left'>
          <div className='w-full overflow-hidden font-semibold'>{suggestion.task}</div>
          <div className='w-full text-muted-foreground text-wrap'>{suggestion.detail}</div>
        </Button>
      ))}
    </div>
  ) : null
}
