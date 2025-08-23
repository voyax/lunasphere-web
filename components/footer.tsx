'use client'

import { Link } from '@heroui/link'
import { Github, Mail } from 'lucide-react'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='w-full border-t border-divider bg-background'>
      <div className='container mx-auto px-6 py-6'>
        <div className='flex flex-col items-center justify-center space-y-4'>
          {/* Links */}
          <div className='flex items-center space-x-4'>
            <Link
              isExternal
              className='text-default-600 hover:text-primary transition-colors'
              href='https://github.com/voyax/baby-head-web'
              aria-label='Visit our GitHub repository'
            >
              <Github className='w-4 h-4' />
            </Link>
            <Link
              className='text-default-600 hover:text-primary transition-colors'
              href='mailto:hi@melolib.com'
              aria-label='Send us an email'
            >
              <Mail className='w-4 h-4' />
            </Link>
          </div>

          {/* Copyright */}
          <p className='text-sm text-default-500'>
            © {currentYear} LunaSphere
          </p>
        </div>
      </div>
    </footer>
  )
}
