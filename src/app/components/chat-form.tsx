"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { useChatStore } from "@/stores/use-chat.store"
import { Role } from "@/types/role.type"
import { sendChat } from "@/utils/api"
import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { LuLoader2, LuSend } from "react-icons/lu"
import z from "zod"

export const ChatForm = () => {
  const addMessage = useChatStore((state) => state.addMessage)
  const setLastMessage = useChatStore((state) => state.setLastMessage)

  const form = useForm({
    defaultValues: {
      prompt: "",
    },
    onSubmit: async ({ value }) => {
      addMessage({
        role: Role.USER,
        content: value.prompt,
      })
      addMessage({
        role: Role.ASSISTANT,
        content: "",
      })
      form.reset()
      mutation.mutate(value)
    },
    validatorAdapter: zodValidator(),
  })

  const mutation = useMutation({
    mutationKey: ["prompt"],
    mutationFn: sendChat,
    onError: () => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
      setLastMessage("Uh oh! Something went wrong.")
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

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      form.handleSubmit()
    }
  }

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
              className='w-full resize-none min-h-10'
              name={field.name}
              value={field.state.value}
              placeholder='How can I help you?'
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              onKeyDown={handleOnKeyDown}
              disabled={mutation.isPending}
              rows={1}
              autoResize
              maxHeight={116}
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
