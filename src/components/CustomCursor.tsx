
import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if cursor is over a clickable element
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') || 
        target.closest('a') ||
        getComputedStyle(target).cursor === 'pointer';
        
      setIsPointer(isClickable);
    };
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <style jsx="true">{`
        body {
          cursor: none;
        }
        
        a, button, [role="button"], [class*="btn"], [type="button"], [type="submit"] {
          cursor: none;
        }
      `}</style>

      <div
        className={`hidden sm:block fixed pointer-events-none z-50 mix-blend-difference transition-transform duration-150 ${isClicking ? 'scale-75' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className={`rounded-full bg-white ${isPointer ? 'w-8 h-8 opacity-30' : 'w-5 h-5 opacity-70'} transition-all duration-200`} />
      </div>
      <div
        className="hidden sm:block fixed pointer-events-none z-50 mix-blend-difference transition-transform duration-300"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="rounded-full border border-white w-10 h-10 opacity-70" />
      </div>
    </>
  );
};

export default CustomCursor;
