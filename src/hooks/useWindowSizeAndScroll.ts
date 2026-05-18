import { useState, useEffect } from 'react';

const useWindowSizeAndScroll = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const [scrollPosition, setScrollPosition] = useState({
    scrollX: 0,
    scrollY: 0,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      const handleScroll = () => {
        setScrollPosition({
          scrollX: window.scrollX,
          scrollY: window.scrollY,
        });
      };

      handleResize();
      handleScroll();

      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return { windowSize, scrollPosition };
};

export default useWindowSizeAndScroll;
