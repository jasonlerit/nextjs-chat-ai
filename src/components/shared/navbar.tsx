import { ModeToggle } from "@/components/shared/mode-toggle"

export const Navbar = () => {
  return (
    <header className='absolute w-full'>
      <nav className='container mx-auto h-14 flex justify-between items-center px-4'>
        <span className='font-bold'>Chat AI</span>
        <div className='flex items-center gap-1'>
          <ModeToggle />
        </div>
      </nav>
    </header>
  )
}
