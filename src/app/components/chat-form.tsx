"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useChatStore } from "@/stores/use-chat-store"
import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { LuLoader2, LuSend } from "react-icons/lu"
import z from "zod"

interface FormData {
  prompt: string
}

async function sendChat(formData: FormData) {
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

export const ChatForm = () => {
  const addMessage = useChatStore((state) => state.addMessage)
  const setLastMessage = useChatStore((state) => state.setLastMessage)

  const form = useForm({
    defaultValues: {
      prompt: "",
    },
    onSubmit: async ({ value }) => {
      addMessage(value.prompt)
      addMessage("")
      form.reset()
      mutation.mutate(value)
    },
    validatorAdapter: zodValidator(),
  })

  const mutation = useMutation({
    mutationKey: ["prompt"],
    mutationFn: sendChat,
    onError: (error) => {
      console.log("error", error)
    },
    onSuccess: async (data) => {
      if (data !== null) {
        const reader = data.getReader()
        while (true) {
          const { value, done } = await reader.read()
          if (done) break
          const chunk = new TextDecoder().decode(value)
          setLastMessage(chunk)
        }
      }
    },
  })

  return (
    <form
      className='container mx-auto lg:max-w-4xl flex items-start gap-2 px-4'
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <form.Field
        name='prompt'
        validators={{
          onChange: z.string().min(1, { message: "Must be at least 1 character." }).max(2000, {
            message: "Must be no more than 2000 characters.",
          }),
        }}
      >
        {(field) => (
          <div className='w-full flex flex-col gap-1'>
            <Textarea
              className='w-full resize-none'
              name={field.name}
              value={field.state.value}
              placeholder='How can I help you?'
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              disabled={mutation.isPending}
            />
          </div>
        )}
      </form.Field>
      <form.Subscribe selector={(state) => [state.canSubmit, state.isTouched, state.isSubmitting]}>
        {([canSubmit, isTouched, isSubmitting]) => (
          <Button
            type='submit'
            disabled={!canSubmit || !isTouched || mutation.isPending}
            aria-label='submit button'
          >
            {isSubmitting || mutation.isPending ? (
              <LuLoader2 className='animate-spin' />
            ) : (
              <LuSend />
            )}
          </Button>
        )}
      </form.Subscribe>
    </form>
  )
}
