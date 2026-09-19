import React, { useRef, useState, ReactNode, MouseEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

/**
 * Card com efeito de iluminação dinâmica (Spotlight Cursor)
 * Segue a posição do ponteiro do mouse, iluminando a borda e fundo do card
 */
export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(241, 179, 1, 0.18)',
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`spotlight-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      style={
        {
          '--spotlight-x': `${coords.x}px`,
          '--spotlight-y': `${coords.y}px`,
          '--spotlight-opacity': isHovered ? '1' : '0',
          '--spotlight-color': spotlightColor,
        } as React.CSSProperties
      }
    >
      <div className="spotlight-overlay" aria-hidden="true" />
      {children}
    </motion.div>
  );
}
