import { useState, useEffect } from 'react';

export default function useWindowScroll(id) {
  const [windowScroll, setWindowScroll] = useState({ offset: 0, scrollEnd: 0 });

  useEffect(() => {
    const element = document.querySelector(id);
    if (!element) return undefined;

    const updateScroll = () => {
      const offset = element.scrollTop;
      const scrollEnd = element.scrollHeight - element.clientHeight;
      setWindowScroll((current) => (
        current.offset === offset && current.scrollEnd === scrollEnd
          ? current
          : { offset, scrollEnd }
      ));
    };

    element.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll);
    const resizeObserver = typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver(updateScroll);
    resizeObserver?.observe(element);
    updateScroll();

    return () => {
      element.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
      resizeObserver?.disconnect();
    };
  }, [id]);

  return windowScroll;
}
