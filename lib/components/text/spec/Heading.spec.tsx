import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { Heading, HeadingProps } from '../Heading';

const renderHeading = (props: Partial<HeadingProps> = {}) => {
  const defaultProps: HeadingProps = {};

  return render(<Heading {...defaultProps} {...props} />);
};

describe('Heading', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe('renders correct h tag based on importance', () => {
    test('1', () => {
      const { container } = renderHeading({
        importance: 1,
      });

      expect(container.querySelector('h1')).not.toBeNull();
    });
    test('2', () => {
      const { container } = renderHeading({
        importance: 2,
      });

      expect(container.querySelector('h2')).not.toBeNull();
    });
    test('3', () => {
      const { container } = renderHeading({
        importance: 3,
      });

      expect(container.querySelector('h3')).not.toBeNull();
    });
    test('4', () => {
      const { container } = renderHeading({
        importance: 4,
      });

      expect(container.querySelector('h4')).not.toBeNull();
    });
    test('5', () => {
      const { container } = renderHeading({
        importance: 5,
      });

      expect(container.querySelector('h5')).not.toBeNull();
    });
    test('6', () => {
      const { container } = renderHeading({
        importance: 6,
      });

      expect(container.querySelector('h6')).not.toBeNull();
    });
  });
});
