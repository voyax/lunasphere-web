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
              href='https://github.com/your-username/head-start'
            >
              <Github className='w-4 h-4' />
            </Link>
            <Link
              className='text-default-600 hover:text-primary transition-colors'
              href='mailto:contact@example.com'
            >
              <Mail className='w-4 h-4' />
            </Link>
          </div>

          {/* Copyright */}
          <p className='text-sm text-default-500'>
            © {currentYear} Head Start
          </p>
        </div>
      </div>
    </footer>
  )
}
