'use client'

import { useState } from 'react'
import { Tooltip } from '@heroui/tooltip'
import { Modal, ModalContent, ModalHeader, ModalBody } from '@heroui/modal'
import { Info } from 'lucide-react'

import { useIsMobile } from '@/hooks/useIsMobile'

interface ShootingTipsDisplayProps {
  t: (key: string) => string
}

const ShootingTipsDisplay = ({ t }: ShootingTipsDisplayProps) => {
  const isMobile = useIsMobile()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const tipsContent = (
    <div className='space-y-2'>
      <div className='flex items-start gap-2'>
        <span className='text-blue-500 font-bold text-xs mt-0.5'>1</span>
        <div>
          <p className='font-medium text-xs'>
            {t('detection.topView.shootingTips.tip1')}
          </p>
          <p className='text-xs text-gray-600 dark:text-gray-400'>
            {t('detection.topView.shootingTips.tip1Detail')}
          </p>
        </div>
      </div>
      <div className='flex items-start gap-2'>
        <span className='text-green-500 font-bold text-xs mt-0.5'>2</span>
        <div>
          <p className='font-medium text-xs'>
            {t('detection.topView.shootingTips.tip2')}
          </p>
          <p className='text-xs text-gray-600 dark:text-gray-400'>
            {t('detection.topView.shootingTips.tip2Detail')}
          </p>
        </div>
      </div>
      <div className='flex items-start gap-2'>
        <span className='text-yellow-500 font-bold text-xs mt-0.5'>3</span>
        <div>
          <p className='font-medium text-xs'>
            {t('detection.topView.shootingTips.tip3')}
          </p>
          <p className='text-xs text-gray-600 dark:text-gray-400'>
            {t('detection.topView.shootingTips.tip3Detail')}
          </p>
        </div>
      </div>
      <div className='flex items-start gap-2'>
        <span className='text-purple-500 font-bold text-xs mt-0.5'>4</span>
        <div>
          <p className='font-medium text-xs'>
            {t('detection.topView.shootingTips.tip4')}
          </p>
          <p className='text-xs text-gray-600 dark:text-gray-400'>
            {t('detection.topView.shootingTips.tip4Detail')}
          </p>
        </div>
      </div>
      <p className='text-xs text-red-600 dark:text-red-400 font-medium mt-3'>
        {t('detection.topView.shootingTips.safety')}
      </p>
    </div>
  )

  const triggerButton = (
    <span className='inline-flex items-center gap-1 px-2 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors duration-200 border border-blue-200/50 dark:border-blue-700/50'>
      <Info size={12} />
      {t('detection.topView.shootingTips.title')}
    </span>
  )

  if (isMobile) {
    return (
      <>
        <button
          aria-label={t('detection.topView.shootingTips.title')}
          className='bg-transparent border-none p-0 cursor-pointer'
          type='button'
          onClick={() => setIsModalOpen(true)}
        >
          {triggerButton}
        </button>
        <Modal
          isOpen={isModalOpen}
          placement='center'
          scrollBehavior='inside'
          size='lg'
          onClose={() => setIsModalOpen(false)}
        >
          <ModalContent>
            <ModalHeader className='flex flex-col gap-1'>
              <h3 className='text-lg font-semibold'>
                {t('detection.topView.shootingTips.title')}
              </h3>
            </ModalHeader>
            <ModalBody className='pb-6'>
              <div className='space-y-4'>
                <div className='flex items-start gap-3'>
                  <span className='text-blue-500 font-bold text-sm mt-0.5 min-w-[20px]'>
                    1
                  </span>
                  <div>
                    <p className='font-medium text-sm mb-1'>
                      {t('detection.topView.shootingTips.tip1')}
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      {t('detection.topView.shootingTips.tip1Detail')}
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <span className='text-green-500 font-bold text-sm mt-0.5 min-w-[20px]'>
                    2
                  </span>
                  <div>
                    <p className='font-medium text-sm mb-1'>
                      {t('detection.topView.shootingTips.tip2')}
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      {t('detection.topView.shootingTips.tip2Detail')}
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <span className='text-yellow-500 font-bold text-sm mt-0.5 min-w-[20px]'>
                    3
                  </span>
                  <div>
                    <p className='font-medium text-sm mb-1'>
                      {t('detection.topView.shootingTips.tip3')}
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      {t('detection.topView.shootingTips.tip3Detail')}
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <span className='text-purple-500 font-bold text-sm mt-0.5 min-w-[20px]'>
                    4
                  </span>
                  <div>
                    <p className='font-medium text-sm mb-1'>
                      {t('detection.topView.shootingTips.tip4')}
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      {t('detection.topView.shootingTips.tip4Detail')}
                    </p>
                  </div>
                </div>
                <div className='mt-4 p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200/50 dark:border-red-700/50'>
                  <p className='text-sm text-red-600 dark:text-red-400 font-medium'>
                    {t('detection.topView.shootingTips.safety')}
                  </p>
                </div>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }

  // Desktop version with Tooltip
  return (
    <Tooltip
      showArrow
      content={<div className='max-w-sm p-2'>{tipsContent}</div>}
      placement='bottom'
    >
      {triggerButton}
    </Tooltip>
  )
}

export default ShootingTipsDisplay
