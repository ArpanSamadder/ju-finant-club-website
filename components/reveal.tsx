'use client';

import { motion } from '@/components/motion';
import type { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
  className?: string;
};

export function Reveal({ children, delay = 0, direction = 'up', className = '' }: RevealProps) {
  const offset = direction === 'up' ? { y: 34, x: 0 } : direction === 'left' ? { x: -42, y: 0 } : { x: 42, y: 0 };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-90px' }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
