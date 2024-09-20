import { useEffect, useState } from 'react';

export interface WindowDimensions {
  height: number;
  width: number;
}

/**
 * @returns The dimensions of the window, based on the inner dimensions.
 */
export function useWindowDimensions(): WindowDimensions {
  const [height, setHeight] = useState(window?.innerHeight ?? 0);
  const [width, setWidth] = useState(window?.innerWidth ?? 0);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return {
    height,
    width,
  };
}
