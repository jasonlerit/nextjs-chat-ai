import { Role } from "@/types/role.type"
import { getCache, setCache } from "@/utils/redis"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  const { userToken, prompt } = await req.json()

  const chatHistory = await getCache(userToken)

  chatHistory.push({
    role: Role.USER,
    content: prompt,
  })

  const stream = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: "You are a helpful assistant." }, ...chatHistory],
    stream: true,
  })

  const readableStream = new ReadableStream({
    async start(controller) {
      let response = ""
      for await (const chunk of stream) {
        const content = chunk.choices[0].delta.content ?? ""
        controller.enqueue(content)
        response = response.concat(content)
      }
      controller.close()

      chatHistory.push({
        role: Role.ASSISTANT,
        content: response,
      })

      await setCache(userToken, chatHistory)
    },
  })

  return new Response(readableStream)
}
