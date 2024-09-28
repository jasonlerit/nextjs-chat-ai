import { z } from "zod"

export const SuggestionSchema = z.object({
  task: z.string(),
  detail: z.string(),
})

export const SuggestionListSchema = z.object({
  data: z.array(SuggestionSchema),
})
