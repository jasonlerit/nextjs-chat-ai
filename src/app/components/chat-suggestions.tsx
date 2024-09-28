import { Button } from "@/components/ui/button"

export const ChatSuggestions = () => {
  return (
    <div className='container mx-auto lg:max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-2 px-4'>
      <Button variant='outline' className='h-auto flex flex-col text-left'>
        <div className='w-full overflow-hidden font-semibold'>Task 1</div>
        <div className='w-full text-muted-foreground text-wrap'>Detail 1</div>
      </Button>
      <Button variant='outline' className='h-auto flex flex-col text-left'>
        <div className='w-full overflow-hidden font-semibold'>Task 2</div>
        <div className='w-full text-muted-foreground text-wrap'>Detail 2</div>
      </Button>
      <Button variant='outline' className='h-auto flex flex-col text-left'>
        <div className='w-full overflow-hidden font-semibold'>Task 3</div>
        <div className='w-full text-muted-foreground text-wrap'>Detail 3</div>
      </Button>
      <Button variant='outline' className='h-auto flex flex-col text-left'>
        <div className='w-full overflow-hidden font-semibold'>Task 4</div>
        <div className='w-full text-muted-foreground text-wrap'>Detail 4</div>
      </Button>
    </div>
  )
}
