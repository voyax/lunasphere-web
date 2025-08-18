'use client'

import ProfileViewComparison from './components/ProfileViewComparison'

export default function ProfileMatchPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950'>
      <div className='container mx-auto px-4 py-8'>
        <ProfileViewComparison />
      </div>
    </div>
  )
}