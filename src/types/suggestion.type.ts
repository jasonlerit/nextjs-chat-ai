import { SuggestionSchema } from "@/utils/schema"
import z from "zod"

export type Suggestion = z.infer<typeof SuggestionSchema>
