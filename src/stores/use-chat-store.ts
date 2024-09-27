import { create } from "zustand"

interface Chat {
  messages: string[]
  setMessages: (value: string[]) => void
}

export const useChatStore = create<Chat>()((set) => ({
  messages: [],
  setMessages: (value: string[]) => set({ messages: value }),
}))
