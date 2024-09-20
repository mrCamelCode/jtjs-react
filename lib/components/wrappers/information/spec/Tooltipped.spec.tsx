import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { Tooltipped, TooltippedProps } from '../Tooltipped';

export function delay<T>(ms: number, resolution?: T): Promise<T | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(resolution), ms);
  });
}

const tooltipText = 'Test Tooltip';

const renderTooltipped = (props: Partial<TooltippedProps> = {}) => {
  const defaultProps: TooltippedProps = {
    tooltip: tooltipText,
    showDelayMs: 1,
    hideDelayMs: 1,
  };

  return render(<Tooltipped {...defaultProps} {...props} />);
};

describe('Tooltipped', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe('hiding/showing', () => {
    test('tootip should show on mouse over', async () => {
      const { container } = renderTooltipped();

      const wrapper = container.querySelector('.jtjs-tooltip-container') as HTMLDivElement;

      await act(async () => {
        await userEvent.hover(wrapper);
      });

      await waitFor(() => screen.getByTestId('tooltip-container'));
      await delay(20);

      expect(container.querySelector('.jtjs-tooltip[aria-hidden="false"]')).not.toBeNull();
    });

    test('tooltip should show on focus', async () => {
      const { container } = renderTooltipped();

      const wrapper = container.querySelector('.jtjs-tooltip-container') as HTMLDivElement;

      act(() => {
        fireEvent.focus(wrapper);
      });

      await waitFor(() => screen.getByTestId('tooltip-container'));
      await delay(20);

      expect(container.querySelector('.jtjs-tooltip[aria-hidden="false"]')).not.toBeNull();
    });

    test('tooltip should disappear on mouse leave', async () => {
      const { container } = renderTooltipped();

      const wrapper = container.querySelector('.jtjs-tooltip-container') as HTMLDivElement;

      await act(async () => {
        await userEvent.hover(wrapper);
      });

      await act(async () => {
        await userEvent.unhover(wrapper);
      });

      await waitFor(() => screen.getByTestId('tooltip-container'));
      await delay(20);

      expect(container.querySelector('.jtjs-tooltip[aria-hidden="true"]')).not.toBeNull();
    });

    test('tooltip should disappear on blur', async () => {
      const { container } = renderTooltipped();

      const wrapper = container.querySelector('.jtjs-tooltip-container') as HTMLDivElement;

      act(() => {
        fireEvent.focus(wrapper);
      });

      act(() => {
        fireEvent.blur(wrapper);
      });

      await waitFor(() => screen.getByTestId('tooltip-container'));
      await delay(20);

      expect(container.querySelector('.jtjs-tooltip[aria-hidden="true"]')).not.toBeNull();
    });

    test('tooltip should not be visible without user event', () => {
      const { container } = renderTooltipped();

      expect(container.querySelector('.jtjs-tooltip[aria-hidden="true"]')).not.toBeNull();
    });
  });

  describe('wrapper swapping', () => {
    test('is div by default', () => {
      const { container } = renderTooltipped();

      expect(container.querySelector('div.jtjs-tooltip-container')).not.toBeNull();
    });

    test('is span if inline === true', () => {
      const { container } = renderTooltipped({
        inline: true,
      });

      expect(container.querySelector('span.jtjs-tooltip-container')).not.toBeNull();
    });
  });
});
