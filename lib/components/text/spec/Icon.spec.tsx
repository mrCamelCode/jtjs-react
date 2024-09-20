import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { Icon, IconProps } from '../Icon';

const renderIcon = (props: Partial<IconProps> = {}) => {
  const defaultProps: IconProps = {
    icon: 'check',
  };

  return render(<Icon {...defaultProps} {...props} />);
};

describe('Icon', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe('has correct FontAwesome class prefix based on iconType', () => {
    test('solid', () => {
      const { container } = renderIcon({
        iconType: 'solid',
      });

      expect(container.querySelector('.fas')).not.toBeNull();
    });
    test('brand', () => {
      const { container } = renderIcon({
        iconType: 'brand',
      });

      expect(container.querySelector('.fab')).not.toBeNull();
    });
    test('regular', () => {
      const { container } = renderIcon({
        iconType: 'regular',
      });

      expect(container.querySelector('.far')).not.toBeNull();
    });
  });
});
