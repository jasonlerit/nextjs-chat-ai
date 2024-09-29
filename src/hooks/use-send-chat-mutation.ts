import { toast } from "@/hooks/use-toast"
import { useChatStore } from "@/stores/use-chat.store"
import { sendChat } from "@/utils/api"
import { useMutation } from "@tanstack/react-query"

export const useSendChatMutation = () => {
  const setLastMessage = useChatStore((state) => state.setLastMessage)

  return useMutation({
    mutationKey: ["prompt"],
    mutationFn: sendChat,
    onError: () => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
      setLastMessage("Uh oh! Something went wrong.")
    },
    onSuccess: async (data) => {
      if (data !== null) {
        const reader = data.getReader()
        while (true) {
          const { value, done } = await reader.read()
          if (done) break
          const chunk = new TextDecoder().decode(value)
          setLastMessage(chunk)
        }
      }
    },
  })
}
