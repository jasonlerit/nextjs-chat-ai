import { create } from "zustand"

interface UserToken {
  userToken: string | null
  setUserToken: (value: string) => void
}

export const useUserTokenStore = create<UserToken>()((set) => ({
  userToken: null,
  setUserToken: (value: string) => set({ userToken: value }),
}))
