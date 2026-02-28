'use client'

import { FC, useState, useEffect } from 'react'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { SwitchProps, useSwitch } from '@heroui/switch'
import { useTheme } from 'next-themes'
import clsx from 'clsx'

import { SunFilledIcon, MoonFilledIcon } from '@/components/icons'

export interface ThemeSwitchProps {
  className?: string
  classNames?: SwitchProps['classNames']
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
}) => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const onChange = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: theme === 'light' || !mounted,
    'aria-label': `Switch to ${theme === 'light' || !mounted ? 'dark' : 'light'} mode`,
    onChange,
  })

  // Avoid hydration mismatch by rendering placeholder until mounted
  if (!mounted) {
    return (
      <div
        className={clsx(
          'w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center',
          'rounded-xl',
          className,
          classNames?.base
        )}
      >
        <SunFilledIcon size={20} className="text-default-500" />
      </div>
    )
  }

  return (
    <Component
      {...getBaseProps({
        className: clsx(
          // Standard touch target for navbar (36px mobile, 40px desktop)
          'w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center',
          'transition-opacity hover:opacity-80 active:opacity-60 cursor-pointer touch-manipulation',
          'rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50',
          className,
          classNames?.base
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              'w-auto h-auto',
              'bg-transparent',
              'rounded-lg',
              'flex items-center justify-center',
              'group-data-[selected=true]:bg-transparent',
              '!text-default-500',
              'pt-px',
              'px-0',
              'mx-0',
            ],
            classNames?.wrapper
          ),
        })}
      >
        {!isSelected ? (
          <SunFilledIcon size={20} />
        ) : (
          <MoonFilledIcon size={20} />
        )}
      </div>
    </Component>
  )
}
