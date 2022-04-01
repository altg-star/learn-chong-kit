import { useEffect, useState } from 'react';
const breakpoints = {
    "xs": 0,
    "sm": 600,
    "md": 960,
    "lg": 1280,
    "xl": 1920
}

const useBreakpoint = () => {
  const [breakpoint, setBreakPoint] = useState<string>('');
  const [windowSize, setWindowSize] = useState<{ width?: number, height?: number }>({
    width: undefined,
    height: undefined,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    if(!windowSize || !windowSize.width) return;
    if (0 < windowSize.width && windowSize.width < breakpoints.xs) {
      setBreakPoint("xs");
    }
    if (breakpoints.xs < windowSize.width && windowSize.width < breakpoints.sm) {
      setBreakPoint("sm");
    }
    if (breakpoints.sm < windowSize.width && windowSize.width < breakpoints.md) {
      setBreakPoint("md");
    }
    if (breakpoints.md < windowSize.width && windowSize.width < breakpoints.lg) {
      setBreakPoint("lg");
    }
    if (windowSize.width >= breakpoints.xl) {
      setBreakPoint("xl");
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [windowSize.width]);
  return breakpoint;
};

export default useBreakpoint;