import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Home, User } from "lucide-react"
// import { ScrollArea } from "@/registry/new-york/ui/scroll-area"


interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          {/* <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
           Menu
          </h2> */}
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start">
              <Home className="mr-2 h-4 w-4"/>
              Inicio
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <User className="mr-2 h-4 w-4"/>
              Perfil
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
