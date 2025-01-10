'use client'
import { motion, animate } from 'motion/react'
import Image from 'next/image'
import bestThree from '@/assets/images/lionsgategaragedoorsltd-surrey-small.png'
import { useEffect } from 'react'
import Link from 'next/link'

const FooterBrag = () => {
  useEffect(() => {
    animate('#best-three-seal', { x: '0%' }, { delay: 2 })
    setTimeout(() => {
      animate('#best-three-seal', { x: '110%' })
    }, 16000)
  })
  return (
    <motion.div
      className="fixed bottom-4 right-4 z-10"
      id="best-three-seal"
      initial={{ x: '110%' }}
    >
      <Link
        href={'/blog/best-garage-door-repair-in-surrey-3-years-running-2025'}
      >
        <Image
          src={bestThree}
          alt="Best Business of 2025 Three Best Rated Seal of Excellence for Lions Gate Garage Doors, Ltd. Best Garage Door Repair in Surrey, BC."
          width={150}
        />
      </Link>
    </motion.div>
  )
}

export default FooterBrag
