"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoResize?: boolean
  maxHeight?: number
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, autoResize = false, maxHeight, ...props }, ref) => {
    const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null)

    React.useImperativeHandle(ref, () => textAreaRef.current!)

    React.useEffect(() => {
      if (textAreaRef.current && autoResize) {
        if (maxHeight && textAreaRef.current.scrollHeight > maxHeight) {
          return
        }
        textAreaRef.current.style.height = "auto"
        textAreaRef.current.style.height = textAreaRef.current?.scrollHeight + "px"
      }
    }, [props.value, textAreaRef, autoResize, maxHeight])

    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={textAreaRef}
        {...props}
      />
    )
  }
)

Textarea.displayName = "Textarea"

export { Textarea }
