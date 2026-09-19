import { useEffect, useRef, useState } from 'react';
import { useInView, animate, useReducedMotion } from 'motion/react';

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  className?: string;
}

/**
 * Odômetro / Contador numérico dinâmico
 * Faz o número subir suavemente de 0 até o valor final ao entrar na viewport
 */
export function AnimatedCounter({
  value,
  duration = 1.6,
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const shouldReduceMotion = useReducedMotion();

  // Decompõe números com prefixo ou sufixo (ex.: "40+", "100%", "15")
  const match = value.match(/(\D*)(\d+)(\D*)/);
  const prefix = match ? match[1] : '';
  const targetNumber = match ? parseInt(match[2], 10) : 0;
  const suffix = match ? match[3] : '';

  const [displayNumber, setDisplayNumber] = useState(0);

  useEffect(() => {
    if (!isInView || shouldReduceMotion || isNaN(targetNumber)) {
      return;
    }

    const controls = animate(0, targetNumber, {
      duration,
      ease: [0.16, 1, 0.3, 1], // Ease out exponencial
      onUpdate: (latest) => {
        setDisplayNumber(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, targetNumber, duration, shouldReduceMotion]);

  if (isNaN(targetNumber)) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  const numberToRender = shouldReduceMotion ? targetNumber : displayNumber;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {numberToRender}
      {suffix}
    </span>
  );
}
