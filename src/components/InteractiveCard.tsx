import { useState, useRef, useEffect } from 'react';
import type { ReactNode, PointerEvent } from 'react';
import { motion } from 'framer-motion';

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  glowColor?: string;
  borderColor?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

export default function InteractiveCard({
  children,
  className = '',
  style = {},
  glowColor = 'rgba(16, 185, 129, 0.2)',
  borderColor = 'rgba(255, 255, 255, 0.08)',
  onClick,
  ariaLabel,
}: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Touch & Reduced Motion Detection
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleChange);
    return () => motionQuery.removeEventListener('change', handleChange);
  }, []);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (isTouchDevice || reducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center (-1 to 1)
    const mouseX = (e.clientX - rect.left - width / 2) / (width / 2);
    const mouseY = (e.clientY - rect.top - height / 2) / (height / 2);

    // Max 7 degrees tilt angle
    const maxTilt = 7;
    const rotateY = mouseX * maxTilt;
    const rotateX = -mouseY * maxTilt;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={ariaLabel}
      className={`glass-panel ${className}`}
      style={{
        position: 'relative',
        cursor: onClick ? 'pointer' : 'default',
        transformStyle: 'preserve-3d',
        perspective: 1000,
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateY(${isHovered ? '-6px' : '0px'}) scale(${isHovered ? 1.02 : 1.0})`,
        transition: 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease, border-color 0.3s ease',
        borderColor: isHovered ? borderColor : 'rgba(255, 255, 255, 0.08)',
        boxShadow: isHovered
          ? `0 25px 50px rgba(0, 0, 0, 0.6), 0 0 35px ${glowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.2)`
          : '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        outline: 'none',
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
