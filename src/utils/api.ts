import { FormData } from "@/types/form-data.type"
import { Suggestion } from "@/types/suggestion.type"
import { SuggestionListSchema } from "@/utils/schema"

export const getSuggestions = async (): Promise<Suggestion[]> => {
  const response = await fetch("/api/suggestions")
  if (!response.ok) {
    throw new Error("Something went wrong")
  }
  const result = await response.json()
  SuggestionListSchema.parse(result)
  return result.data
}

export const sendChat = async (formData: FormData) => {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
  if (!response.ok) {
    throw new Error("Something went wrong")
  }
  return response.body
}
