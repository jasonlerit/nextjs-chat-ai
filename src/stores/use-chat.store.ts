import { Message } from "@/types/message.type"
import { create } from "zustand"

interface Chat {
  messages: Message[]
  setMessages: (value: Message[]) => void
  addMessage: (value: Message) => void
  setLastMessage: (value: string) => void
}

export const useChatStore = create<Chat>()((set) => ({
  messages: [],
  setMessages: (value: Message[]) => set({ messages: value }),
  addMessage: (value: Message) =>
    set((state) => ({
      messages: [...state.messages, value],
    })),
  setLastMessage: (value: string) =>
    set((state) => {
      const lastIndex = state.messages.length - 1
      if (lastIndex < 0) {
        return {
          messages: [],
        }
      }
      const lastMessage = state.messages[lastIndex]
      return {
        messages: [
          ...state.messages.slice(0, lastIndex),
          {
            ...lastMessage,
            content: lastMessage.content.concat(value),
          },
        ],
      }
    }),
}))
