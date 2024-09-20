import { useEffect, useState } from 'react';

export interface Breakpoints {
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export type BreakpointName = keyof Breakpoints | 'xs';

export const defaultBreakpoints: Breakpoints = {
  sm: 600,
  md: 768,
  lg: 992,
  xl: 1200,
};

/**
 * Determines and returns the breakpoint for the current window width. The breakpoint is updated
 * automatically with window resizes. This hook will trigger a re-render only when the breakpoint
 * changes.
 *
 * If your app uses breakpoints that differ from the defaults, consider making your own light wrapper `useAppBreakpoint`.
 * See the examples for more info.
 *
 * @param breakpoints - (Optional, defaults to {@link defaultBreakpoints}) The breakpoints to use to determine what
 * breakpoint the current window width falls into.
 *
 * @returns The breakpoint the current window width falls into. This comparison is inclusive,
 * so if the window's width is exactly on the breakpoint for `lg`, for example, then the breakpoint
 * will be `lg`.
 *
 * @example
 * ```ts
 * // Assuming the default breakpoints are used.
 *
 * // window width is 800px
 * useBreakpoint() // returns 'md'
 *
 * // window width is 768px (directly on md breakpoint)
 * useBreakpoint() // returns 'md'
 *
 * // window width is 300px
 * useBreakpoint() // returns 'xs'
 * ```
 *
 * @example
 * ```ts
 * // Custom app breakpoints
 * export const useAppBreakpoint = () => useBreakpoint({
 *    sm: 400,
 *    md: 600,
 *    lg: 900,
 *    xl: 1500,
 * });
 * ```
 */
export function useBreakpoint(
  breakpoints: Breakpoints = defaultBreakpoints
): BreakpointName {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<BreakpointName>(
    getBreakpoint(window?.innerWidth ?? 0)
  );

  useEffect(() => {
    const handleResize = () => {
      setCurrentBreakpoint(getBreakpoint(window.innerWidth, breakpoints));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return currentBreakpoint;
}

/**
 * @param breakpoint - The breakpoint to base the comparison on.
 * @param otherBreakpoint - The other breakpoint to compare `breakpoint` to.
 *
 * @returns Whether `breakpoint` is smaller than `otherBreakpoint`.
 */
export function isBreakpointSmallerThan(
  breakpoint: BreakpointName,
  otherBreakpoint: BreakpointName
) {
  return compareBreakpoints(breakpoint, otherBreakpoint) < 0;
}

/**
 * @param breakpoint - The breakpoint to base the comparison on.
 * @param otherBreakpoint - The other breakpoint to compare `breakpoint` to.
 *
 * @returns Whether `breakpoint` is bigger than `otherBreakpoint`.
 */
export function isBreakpointBiggerThan(
  breakpoint: BreakpointName,
  otherBreakpoint: BreakpointName
) {
  return compareBreakpoints(breakpoint, otherBreakpoint) > 0;
}

/**
 *
 * @param breakpoint - The breakpoint to base the comparison on.
 * @param otherBreakpoint - The other breakpoint to compare `breakpoint` to.
 *
 * @returns Whether `breakpoint`s is the same as `otherBreakpoint`.
 */
export function isBreakpointWithin(
  breakpoint: BreakpointName,
  otherBreakpoint: BreakpointName
) {
  return compareBreakpoints(breakpoint, otherBreakpoint) === 0;
}

/**
 * Compares the two breakpoints. The result is based on the first breakpoint supplied. For example,
 * if the result is less than 0, that means that `breakpoint1` is smaller than `breakpoint2`.
 *
 * @param breakpoint1 - The breakpoint to base the comparison on.
 * @param breakpoint2 - The breakpoint to compare to.
 *
 * @returns A number denoting whether the first breakpoint is less than, equal to,
 * or greater than the second breakpoint. A negative number means it's smaller, 0 means
 * they're equal, and a positive number means it's bigger.
 *
 * @example compareBreakpoints('lg', 'xs') // => result will be greater than 0, indicating that 'lg' is bigger than 'xs'.
 */
function compareBreakpoints(
  breakpoint1: BreakpointName,
  breakpoint2: BreakpointName
): number {
  const breakpointComparisonReference: Record<BreakpointName, number> = {
    xs: 0,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
  };

  return (
    breakpointComparisonReference[breakpoint1] -
    breakpointComparisonReference[breakpoint2]
  );
}

function getBreakpoint(
  width: number,
  breakpoints = defaultBreakpoints
): BreakpointName {
  // Ensure an order for the breakpoints before we iterate through them.
  // Ordered in descending order by the number for the breakpoint.
  const sortedBreakpointsEntries = Object.entries(breakpoints).sort(
    ([key1, val1], [key2, val2]) => {
      return val2 - val1;
    }
  );

  for (const [breakpointName, breakpointWidth] of sortedBreakpointsEntries) {
    if (width >= breakpointWidth) {
      return breakpointName as BreakpointName;
    }
  }

  // If the width wasn't >= any of the breakpoints, it must be smaller than the smallest
  // breakpoint, so default to xs.
  return 'xs';
}
