import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { Carousel, CarouselProps } from '../Carousel';

const defaultItems = ['test 1', 'test 2', 'test 3'];

const renderCarousel = (props: Partial<CarouselProps<string>> = {}) => {
  const defaultProps: CarouselProps<string> = {
    items: defaultItems,
    getItemKey: (item) => item,
    renderItem: (item) => <p>{item}</p>,
    // @ts-ignore
    getItemContainerProps: (item) => ({
      'data-testid': item,
    }),
  };

  return render(<Carousel {...defaultProps} {...props} />);
};

describe('Carousel', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  test('All items are visible', () => {
    const { queryByText } = renderCarousel();

    defaultItems.forEach((item) => {
      expect(queryByText(item)).not.toBeNull();
    });
  });

  describe('item activation', () => {
    const onChangeActiveItem = vi.fn();

    test('can activate with click', async () => {
      const { getByTestId } = renderCarousel({ onChangeActiveItem });

      const item2 = getByTestId('test 2');

      await userEvent.click(item2);

      expect(onChangeActiveItem).toHaveBeenCalledTimes(1);
      expect(onChangeActiveItem).toHaveBeenLastCalledWith('test 2');
    });
    test('can activate with Space', () => {});
    test('can activate with Enter', () => {});
  });
});
