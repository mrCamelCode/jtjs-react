import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { CarouselWithFullView, CarouselWithFullViewProps } from '../CarouselWithFullView';

const defaultItems = ['test 1', 'test 2', 'test 3'];

const renderCarouselWithFullView = (props: Partial<CarouselWithFullViewProps<string>> = {}) => {
  const defaultProps: CarouselWithFullViewProps<string> = {
    items: defaultItems,
    renderFullView: (item) => <p>ACTIVE {item}</p>,
    getItemKey: (item) => item,
    renderItem: (item) => <p>{item}</p>,
    // @ts-ignore
    getItemContainerProps: (item) => ({
      'data-testid': item,
    }),
  };

  return render(<CarouselWithFullView {...defaultProps} {...props} />);
};

describe('CarouselWithFullView', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  test('renders nothing when there is no active item and no placeholder.', () => {
    const { queryByText } = renderCarouselWithFullView();

    expect(queryByText('ACTIVE')).toBeNull();
  });
  test(`renders the placeholder when there is no active but renderPlaceholderFullView is specified`, () => {
    const { queryByText } = renderCarouselWithFullView({
      renderPlaceholderFullView: () => <p>PLACEHOLDER</p>,
    });

    expect(queryByText('PLACEHOLDER')).toBeDefined();
  });
  test('renders the full view for active item.', async () => {
    const { queryByTestId, queryByText } = renderCarouselWithFullView();

    const input = queryByTestId('item 3');

    await userEvent.click(input!);

    expect(queryByText('ACTIVE item 3')).toBeDefined();
  });
  test('the full view changes when the active item does', async () => {
    const { queryByTestId, queryByText } = renderCarouselWithFullView();

    const input = queryByTestId('item 3');

    await userEvent.click(input!);

    expect(queryByText('ACTIVE item 3')).toBeDefined();

    await userEvent.click(queryByTestId('item 1')!);

    expect(queryByText('ACTIVE item 1')).toBeDefined();
  });
});
