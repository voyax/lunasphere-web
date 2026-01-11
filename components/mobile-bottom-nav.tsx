'use client'

import { useTranslations } from 'next-intl'
import { Home, BookOpen, Scan, HelpCircle } from 'lucide-react'
import { Link, usePathname } from '@/i18n/routing'
import { useHapticFeedback } from '@/hooks/useHapticFeedback'

interface NavItemProps {
  href: '/' | '/learn' | '/profile-match' | '/faq'
  icon: React.ReactNode
  label: string
  isActive: boolean
}

const NavItem = ({ href, icon, label, isActive }: NavItemProps) => {
  const { hapticLight } = useHapticFeedback()

  return (
    <Link
      href={href}
      onClick={hapticLight}
      className={`
        relative flex flex-col items-center justify-center flex-1 py-2 min-h-[56px]
        transition-all duration-200 ease-out
        touch-manipulation select-none
        ${isActive 
          ? 'text-orange-500 dark:text-orange-400' 
          : 'text-gray-400 dark:text-gray-500 active:text-gray-600 dark:active:text-gray-400'
        }
      `}
    >
      {/* Active indicator pill */}
      <div
        className={`
          absolute top-1 w-12 h-1 rounded-full
          transition-all duration-300 ease-out
          ${isActive 
            ? 'bg-orange-400 dark:bg-orange-500 opacity-100 scale-100' 
            : 'bg-transparent opacity-0 scale-75'
          }
        `}
      />
      
      {/* Icon container with scale animation */}
      <div
        className={`
          relative transition-transform duration-200 ease-out
          ${isActive ? 'scale-110' : 'scale-100 active:scale-95'}
        `}
      >
        {icon}
        
        {/* Glow effect for active state */}
        {isActive && (
          <div className="absolute inset-0 blur-md bg-orange-400/30 dark:bg-orange-500/20 -z-10" />
        )}
      </div>
      
      {/* Label */}
      <span
        className={`
          mt-1 text-[10px] font-semibold tracking-tight
          transition-all duration-200
          ${isActive ? 'opacity-100' : 'opacity-70'}
        `}
      >
        {label}
      </span>
    </Link>
  )
}

export function MobileBottomNav() {
  const pathname = usePathname()
  const t = useTranslations('nav')

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  const navItems: Omit<NavItemProps, 'isActive'>[] = [
    {
      href: '/',
      icon: <Home className="w-5 h-5" strokeWidth={2} />,
      label: t('home'),
    },
    {
      href: '/learn',
      icon: <BookOpen className="w-5 h-5" strokeWidth={2} />,
      label: t('learn'),
    },
    {
      href: '/profile-match',
      icon: <Scan className="w-5 h-5" strokeWidth={2} />,
      label: t('profileMatch'),
    },
    {
      href: '/faq',
      icon: <HelpCircle className="w-5 h-5" strokeWidth={2} />,
      label: t('faq'),
    },
  ]

  return (
    <>
      {/* Spacer to prevent content from being hidden behind the nav */}
      <div className="md:hidden h-[72px]" />
      
      {/* Bottom Navigation Bar */}
      <nav
        className="
          md:hidden fixed bottom-0 left-0 right-0 z-50
          bg-white/80 dark:bg-gray-900/80
          backdrop-blur-xl backdrop-saturate-150
          border-t border-gray-200/50 dark:border-gray-700/50
          pb-safe
        "
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent dark:from-gray-900/50 pointer-events-none" />
        
        <div className="relative flex items-stretch justify-around max-w-lg mx-auto px-2">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              {...item}
              isActive={isActive(item.href)}
            />
          ))}
        </div>
      </nav>
    </>
  )
}
