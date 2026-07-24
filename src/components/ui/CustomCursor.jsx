import React, { useEffect, useState, useCallback, useRef } from 'react';

const SELECTOR = 'a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"])';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const trackedElements = useRef(new WeakSet());

  const handleHoverStart = useCallback(() => setIsHovering(true), []);
  const handleHoverEnd = useCallback(() => setIsHovering(false), []);

  const attachListeners = useCallback((el) => {
    if (trackedElements.current.has(el)) return;
    trackedElements.current.add(el);
    el.addEventListener('mouseenter', handleHoverStart);
    el.addEventListener('mouseleave', handleHoverEnd);
  }, [handleHoverStart, handleHoverEnd]);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouchDevice);
    if (isTouchDevice) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    document.addEventListener('mousemove', handleMouseMove);

    document.querySelectorAll(SELECTOR).forEach(attachListeners);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType !== 1) continue;
          if (node.matches(SELECTOR)) attachListeners(node);
          node.querySelectorAll?.(SELECTOR).forEach(attachListeners);
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, [attachListeners]);

  if (!isVisible || isTouchDevice) return null;

  return (
    <div
      className="custom-cursor"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div className={`cursor-circle ${isHovering ? 'expanded' : ''}`} />
      <div className={`cursor-dot ${isHovering ? 'hidden' : ''}`} />
    </div>
  );
};

export default React.memo(CustomCursor);
