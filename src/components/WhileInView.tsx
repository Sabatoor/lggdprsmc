import React, { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

interface WhileInViewProps {
  children: ReactNode
  direction?: 'left' | 'up' | 'right' | 'down' | 'none'
}

const WhileInView: React.FC<WhileInViewProps> = ({
  children,
  direction = 'none',
}) => {
  const shouldReduce = useReducedMotion()
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: 0, y: 0 },
        none: { opacity: 0, x: 0, y: 0 },
        left: { opacity: 0, x: 75, y: 0 },
        right: { opacity: 0, x: -75, y: 0 },
        up: { opacity: 0, x: 0, y: 75 },
        down: { opacity: 0, x: 0, y: -75 },
        visible: { opacity: 1, x: 0, y: 0 },
      }}
      initial={shouldReduce ? 'hidden' : direction}
      // transition={{ duration }}
      whileInView={'visible'}
      viewport={{ margin: '-20%', once: true }}
    >
      {children}
    </motion.div>
  )
}

export default WhileInView
