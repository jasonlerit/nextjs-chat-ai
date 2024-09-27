import { create } from "zustand"

interface Chat {
  messages: string[]
  setMessages: (value: string[]) => void
  addMessage: (value: string) => void
  setLastMessage: (value: string) => void
}

export const useChatStore = create<Chat>()((set) => ({
  messages: [],
  setMessages: (value: string[]) => set({ messages: value }),
  addMessage: (value: string) =>
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
      return {
        messages: [...state.messages.slice(0, lastIndex), state.messages[lastIndex].concat(value)],
      }
    }),
}))
