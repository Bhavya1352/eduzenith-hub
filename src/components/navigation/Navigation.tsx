import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { 
  BookOpen, 
  Home, 
  Trophy, 
  User, 
  Search,
  Menu,
  X,
  GraduationCap,
  BarChart3,
  Settings
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface NavigationProps {
  userRole?: 'student' | 'instructor' | 'admin'
}

const navigationItems = {
  student: [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Courses', href: '/courses', icon: BookOpen },
    { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
    { name: 'Profile', href: '/profile', icon: User },
  ],
  instructor: [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'My Courses', href: '/courses', icon: BookOpen },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Students', href: '/students', icon: GraduationCap },
    { name: 'Profile', href: '/profile', icon: User },
  ],
  admin: [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Courses', href: '/courses', icon: BookOpen },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Users', href: '/users', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]
}

export function Navigation({ userRole = 'student' }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navItems = navigationItems[userRole]

  const isActive = (href: string) => {
    return location.pathname === href
  }

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="hidden lg:flex items-center justify-between px-6 py-4 bg-card/80 backdrop-blur-lg border-b border-border/50 sticky top-0 z-50"
      >
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
              EduZenith
            </span>
          </Link>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.name} to={item.href}>
                <Button
                  variant={isActive(item.href) ? 'default' : 'ghost'}
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              className="pl-10 w-64"
            />
          </div>
          
          <Badge variant="secondary" className="bg-gradient-achievement text-achievement-gold">
            1,250 XP
          </Badge>
          
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="lg:hidden flex items-center justify-between px-4 py-3 bg-card/80 backdrop-blur-lg border-b border-border/50 sticky top-0 z-50"
      >
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-heading font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
            EduZenith
          </span>
        </Link>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </motion.nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden bg-card border-b border-border/50 px-4 py-6 space-y-4"
        >
          <div className="relative mb-4">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              className="pl-10"
            />
          </div>

          {navItems.map((item) => (
            <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)}>
              <Button
                variant={isActive(item.href) ? 'default' : 'ghost'}
                className="w-full justify-start space-x-2"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Button>
            </Link>
          ))}

          <div className="pt-4 border-t border-border/50 space-y-3">
            <Badge variant="secondary" className="bg-gradient-achievement text-achievement-gold w-full justify-center">
              1,250 XP
            </Badge>
            <Button variant="outline" className="w-full">
              Sign In
            </Button>
          </div>
        </motion.div>
      )}
    </>
  )
}