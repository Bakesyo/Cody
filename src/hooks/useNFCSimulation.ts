import { useEffect, useRef, useState } from 'react';

interface NFCParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

interface UseNFCSimulationProps {
  fieldRadius?: number;
  particleCount?: number;
}

export function useNFCSimulation({
  fieldRadius = 150,
  particleCount = 50
}: UseNFCSimulationProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [particles, setParticles] = useState<NFCParticle[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeParticles();
    };

    const initializeParticles = () => {
      const newParticles: NFCParticle[] = [];
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          color: `hsla(${220 + Math.random() * 40}, 70%, 60%, 0.8)`
        });
      }
      setParticles(newParticles);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [particleCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          const dx = mousePosition.current.x - particle.x;
          const dy = mousePosition.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < fieldRadius && isActive) {
            const angle = Math.atan2(dy, dx);
            particle.x += Math.cos(angle) * 2;
            particle.y += Math.sin(angle) * 2;
          } else {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
          }

          return particle;
        })
      );

      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [fieldRadius, isActive, particles]);

  const handleInteraction = (x: number, y: number) => {
    mousePosition.current = { x, y };
    if (!isActive) {
      setIsActive(true);
    }
  };

  return {
    canvasRef,
    isActive,
    handleInteraction
  };
} 