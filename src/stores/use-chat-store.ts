import { create } from "zustand"

interface Chat {
  messages: string[]
  setMessages: (value: string[]) => void
  addMessage: (value: string) => void
}

export const useChatStore = create<Chat>()((set) => ({
  messages: [],
  setMessages: (value: string[]) => set({ messages: value }),
  addMessage: (value: string) =>
    set((state) => ({
      messages: [...state.messages, value],
    })),
}))
