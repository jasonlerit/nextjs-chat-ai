"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "@tanstack/react-form"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { useState } from "react"
import { LuLoader2, LuSend } from "react-icons/lu"
import z from "zod"

export default function Home() {
  const [messages, setMessages] = useState<string[]>([])
  const [message, setMessage] = useState<string>("")

  const form = useForm({
    defaultValues: {
      prompt: "",
    },
    onSubmit: async ({ value }) => {
      if (message.length !== 0) {
        setMessages((pv) => [...pv, message])
        setMessage("")
      }

      setMessages((pv) => [...pv, value.prompt])

      form.reset()

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: value.prompt,
        }),
      })

      if (!response.ok) {
        throw new Error("Something went wrong")
      }

      if (response.body !== null) {
        const reader = response.body.getReader()
        while (true) {
          const { value, done } = await reader.read()
          if (done) break
          const chunk = new TextDecoder().decode(value)
          setMessage((pv) => pv.concat(chunk))
        }
      }
    },
    validatorAdapter: zodValidator(),
  })

  return (
    <main className='h-dvh'>
      <div className='h-full flex flex-col'>
        <div className='bg-slate-100 flex-1 flex flex-col gap-4 overflow-y-auto'>
          {messages.map((message, index) => (
            <div key={index}>
              <p className='whitespace-pre'>{message}</p>
            </div>
          ))}
          <p className='whitespace-pre'>{message}</p>
        </div>
        <form
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
                />
              </div>
            )}
          </form.Field>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isTouched, state.isSubmitting]}
          >
            {([canSubmit, isTouched, isSubmitting]) => (
              <Button type='submit' disabled={!canSubmit || !isTouched} aria-label='submit button'>
                {isSubmitting ? <LuLoader2 className='animate-spin' /> : <LuSend />}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </div>
    </main>
  )
}
