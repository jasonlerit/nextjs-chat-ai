import { SuggestionListSchema } from "@/utils/schema"
import OpenAI from "openai"
import { zodResponseFormat } from "openai/helpers/zod"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function GET() {
  const completions = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
          Generate a list of four actionable suggestions that an AI can help with. Each suggestion should include:
            1. Task: A brief description
            2. Detail: A specific context (keep it short)
          Make sure each suggestion is practical and can be completed with AI assistance. For example:
            Task: Write a thank-you note
            Detail: to my interviewer within 24 hours.
            Task: Provide tips
            Detail: to overcome procrastination while working from home.
            Task: Create a recipe
            Detail: using leftover ingredients from my kitchen.
            Task: Plan a trip
            Detail: to explore local culture and cuisine in Seoul.
            Task: Tell me a fun fact
            Detail: about the Roman Empire
        `,
      },
    ],
    response_format: zodResponseFormat(SuggestionListSchema, "suggestions"),
  })

  const result = completions.choices[0].message.parsed

  return Response.json(result)
}
