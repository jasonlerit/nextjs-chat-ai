"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useSendChatMutation } from "@/hooks/use-send-chat-mutation"
import { useChatStore } from "@/stores/use-chat.store"
import { Role } from "@/types/role.type"
import { useForm } from "@tanstack/react-form"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { LuLoader2, LuSend } from "react-icons/lu"
import z from "zod"

export const ChatForm = () => {
  const addMessage = useChatStore((state) => state.addMessage)

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

  const mutation = useSendChatMutation()

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
