import { useState, useEffect } from 'react';

function getWindowScroll(offset, scrollEnd) {
  return {
    offset,
    scrollEnd
  };
}

export default function useWindowScroll(id) {
  const [windowScroll, setWindowScroll] = useState(getWindowScroll(0, 0));

  useEffect(() => {
    function handleScroll(event) {
      setWindowScroll(getWindowScroll(event.target.scrollTop, event.target.scrollHeight - event.target.offsetHeight));
    }

    document.querySelector(id).addEventListener('scroll', handleScroll);
    return () => document.querySelector(id).removeEventListener('scroll', handleScroll);
  }, []);

  return windowScroll;
}