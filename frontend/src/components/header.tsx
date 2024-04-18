import { ArrowRight, Film } from 'lucide-react'

import { Separator } from './ui/separator'
import { ThemeToggle } from './theme/theme-toggle'
import { Button } from './ui/button'
import { useAuth } from '@/contexts/authContext'
import { useNavigate } from 'react-router-dom'

export function Header() {
  const {logout} = useAuth();
  const navigate = useNavigate();

  
  const handleLogout = () => {
    logout(); 
    navigate('/sign-in');
  };
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Film className="h-6 w-6" />

        <Separator orientation="vertical" className="h-6" />

        <span className="font-semibold">Favorite Movies</span>

        <div className="ml-auto flex items-center gap-2">
          
          <Button variant="outline" onClick={handleLogout} >
            <ArrowRight  className='w-4 h-4'/>
          </Button>

          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}