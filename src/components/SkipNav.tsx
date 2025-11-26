'use client'
import Link from 'next/link'

const SkipNav = () => {
  return (
    <Link
      href="#content"
      className="absolute -top-10 left-8 z-50 rounded-lg bg-white/50 p-4 text-lg text-black opacity-0 ring-primary backdrop-blur-lg transition-all duration-500 ease-in-out outline-none focus:top-16 focus:opacity-100 focus:ring-2"
      onClick={() => {
        const mainContent = document.getElementById('content')
        if (mainContent) {
          mainContent.focus()
        }
      }}
      onBlur={e => {
        setTimeout(() => (e.target as HTMLAnchorElement).blur(), 100)
      }}
    >
      Skip to Main Content
    </Link>
  )
}

export default SkipNav
