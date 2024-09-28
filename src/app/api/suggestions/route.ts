import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function GET() {
  const completions = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
          Generate a list of four actionable suggestions that an AI can help with. Each suggestion should include:
            1. Task: A brief description of the task.
            2. Detail: Specific details or context related to the task.
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
          Format the output in JSON as follows:
          {
            suggestions: [
              {
                task: "Task 1",
                detail: "Detail 1"
              },
              {
                task: "Task 2",
                detail: "Detail 2"
              },
              {
                task: "Task 3",
                detail: "Detail 3"
              },
              {
                task: "Task 4",
                detail: "Detail 4"
              }
            ]
          }
        `,
      },
    ],
    response_format: {
      type: "json_object",
    },
  })

  return Response.json(completions.choices[0].message.content)
}
