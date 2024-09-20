import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, vi, it, afterAll } from 'vitest';
import {
  isBreakpointBiggerThan,
  isBreakpointSmallerThan,
  isBreakpointWithin,
  useBreakpoint,
} from '../use-breakpoint.hook';

// let mockGetWindowWidth = vi.fn();
// vi.mock('../use-window-dimensions.hook', () => {
//   const originalModule = vi.requireActual('../use-window-dimensions.hook');

//   return {
//     __esModule: true,
//     ...originalModule,
//     useWindowDimensions: vi.fn(() => ({
//       height: 0,
//       width: mockGetWindowWidth(),
//     })),
//   };
// });

// Since `useBreakpoint` uses state, we need a component that uses the hook to be able to test it (otherwise useState
// breaks).
const TestComponent = () => {
  const currentBreakpoint = useBreakpoint();

  return <p>breakpoint: {currentBreakpoint}</p>;
};

const renderTestComponent = () => {
  return render(<TestComponent />);
};

describe('use-breakpoint.hook', () => {
  describe('useBreakpoint', () => {
    const originalWindow = window;
    // let mockWindow = {
    //   innerWidth: 1920,
    // };
    // // @ts-ignore
    // window = mockWindow;

    afterEach(() => {
      vi.clearAllMocks();
      cleanup();
    });
    afterAll(() => {
      window = originalWindow;
    });

    it('will return the correct breakpoint for the xl breakpoint', () => {
      window.innerWidth = 1920;

      renderTestComponent();

      expect(screen.getByText('breakpoint: xl')).toBeDefined();
    });
    it('will return the correct breakpoint for the xs breakpoint', () => {
      window.innerWidth = 480;

      renderTestComponent();

      expect(screen.getByText('breakpoint: xs')).toBeDefined();
    });
    it('will return the correct breakpoint for the md breakpoint', () => {
      window.innerWidth = 800;

      renderTestComponent();

      expect(screen.getByText('breakpoint: md')).toBeDefined();
    });
    it('will return the correct breakpoint when the width is on a breakpoint', () => {
      window.innerWidth = 992;

      renderTestComponent();

      expect(screen.getByText('breakpoint: lg')).toBeDefined();
    });
    it('will return the correct breakpoint when the width is one less than a breakpoint', () => {
      window.innerWidth = 767;

      renderTestComponent();

      expect(screen.getByText('breakpoint: sm')).toBeDefined();
    });
    it('will return the correct breakpoint when the width is one greater than a breakpoint', () => {
      window.innerWidth = 769;

      renderTestComponent();

      expect(screen.getByText('breakpoint: md')).toBeDefined();
    });
  });
  describe('isBreakpointSmallerThan', () => {
    it('should be correct when the base breakpoint is smaller', () => {
      expect(isBreakpointSmallerThan('xs', 'md')).toBe(true);
    });
    it('should be correct when the base breakpoint is bigger', () => {
      expect(isBreakpointSmallerThan('xl', 'sm')).toBe(false);
    });
    it('should be correct when the breakpoints match', () => {
      expect(isBreakpointSmallerThan('sm', 'sm')).toBe(false);
    });
  });
  describe('isBreakpointBiggerThan', () => {
    it('should be correct when the base breakpoint is smaller', () => {
      expect(isBreakpointBiggerThan('xs', 'md')).toBe(false);
    });
    it('should be correct when the base breakpoint is bigger', () => {
      expect(isBreakpointBiggerThan('xl', 'sm')).toBe(true);
    });
    it('should be correct when the breakpoints match', () => {
      expect(isBreakpointBiggerThan('sm', 'sm')).toBe(false);
    });
  });
  describe('isBreakpointWithin', () => {
    it('should be correct when the base breakpoint is smaller', () => {
      expect(isBreakpointWithin('xs', 'md')).toBe(false);
    });
    it('should be correct when the base breakpoint is bigger', () => {
      expect(isBreakpointWithin('xl', 'sm')).toBe(false);
    });
    it('should be correct when the breakpoints match', () => {
      expect(isBreakpointWithin('sm', 'sm')).toBe(true);
    });
  });
});
