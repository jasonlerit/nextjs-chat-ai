import { z } from "zod"

export const suggestionSchema = z.object({
  task: z.string(),
  detail: z.string(),
})

export const suggestionListSchema = z.object({
  data: z.array(suggestionSchema),
})
