'use client'
import Link from 'next/link'

const SkipNav = () => {
  const handleSkipNav = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault() // Prevent default anchor behavior
    const content = document.getElementById('content')
    if (content) {
      content.setAttribute('tabindex', '-1') // Make it temporarily focusable
      content.setAttribute('role', 'main') // Add role for better focus handling
      content.focus() // Move focus to the content
      content.removeAttribute('tabindex') // Remove tabindex for accessibility
    }
  }

  return (
    <Link
      href="#content"
      className="ring-primary absolute -top-10 left-8 z-50 rounded-lg bg-white/50 p-4 text-lg text-black opacity-0 backdrop-blur-lg transition-all duration-500 ease-in-out outline-none focus:top-16 focus:opacity-100 focus:ring-2"
      onClick={handleSkipNav}
    >
      Skip to Main Content
    </Link>
  )
}

export default SkipNav
