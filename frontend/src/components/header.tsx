import { Film } from 'lucide-react'

import { Separator } from './ui/separator'
import { ThemeToggle } from './theme/theme-toggle'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Film className="h-6 w-6" />

        <Separator orientation="vertical" className="h-6" />

        <span className="font-semibold">Favorite Movies</span>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}