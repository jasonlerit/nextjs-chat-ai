import * as React from "react"

export const useAutoResizeTextarea = (
  ref: React.ForwardedRef<HTMLTextAreaElement>,
  autoResize: boolean,
  maxHeight?: number
) => {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null)

  React.useImperativeHandle(ref, () => textAreaRef.current!)

  React.useEffect(() => {
    const ref = textAreaRef?.current

    const updateTextareaHeight = () => {
      if (ref && autoResize) {
        if (maxHeight && ref.scrollHeight > maxHeight) {
          return
        }
        ref.style.height = "auto"
        ref.style.height = ref?.scrollHeight + "px"
      }
    }

    updateTextareaHeight()

    ref?.addEventListener("input", updateTextareaHeight)

    return () => ref?.removeEventListener("input", updateTextareaHeight)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { textAreaRef }
}