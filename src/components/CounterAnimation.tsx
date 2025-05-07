
import { useEffect, useState, useRef } from 'react';

interface CounterAnimationProps {
  end: number;
  duration?: number;
  className?: string;
  suffix?: string;
}

const CounterAnimation = ({ 
  end, 
  duration = 2000,
  className = "",
  suffix = ""
}: CounterAnimationProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  
  useEffect(() => {
    // Reset when end changes
    countRef.current = 0;
    startTimeRef.current = null;
    
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      
      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuad = (t: number) => t * (2 - t);
      const easedProgress = easeOutQuad(percentage);
      
      const currentCount = Math.floor(easedProgress * end);
      
      if (currentCount !== countRef.current) {
        countRef.current = currentCount;
        setCount(currentCount);
      }
      
      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    // Start animation when element is in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });
    
    const counterElement = document.getElementById(`counter-${end}`);
    if (counterElement) {
      observer.observe(counterElement);
    }
    
    return () => observer.disconnect();
  }, [end, duration]);
  
  return (
    <span id={`counter-${end}`} className={className}>
      {count}{suffix}
    </span>
  );
};

export default CounterAnimation;
