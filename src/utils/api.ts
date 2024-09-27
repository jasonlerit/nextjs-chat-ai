import { FormData } from "@/types/form-data.type"

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
