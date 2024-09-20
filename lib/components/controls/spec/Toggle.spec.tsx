import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { Toggle, ToggleProps } from '../Toggle';

let isOn = true;
const onToggle = vi.fn((newIsOn: boolean, event) => (isOn = newIsOn));

const renderToggle = (props: Partial<ToggleProps> = {}) => {
  const defaultProps: ToggleProps = {
    onToggle,
  };

  return render(<Toggle {...defaultProps} {...props} />);
};

describe('Toggle', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe('controlled', () => {
    test('the value should update with user interaction, both by mouse and keyboard', async () => {
      const { rerender } = renderToggle({
        isOn,
      });

      expect(onToggle).not.toHaveBeenCalled();
      expect(isOn).toBe(true);

      const toggle = screen.getByTestId('toggle');

      await userEvent.click(toggle);

      expect(onToggle).toHaveBeenLastCalledWith(false, onToggle.mock.calls[0][1]);
      expect(isOn).toBe(false);

      rerender(<Toggle isOn={isOn} onToggle={onToggle} />);

      fireEvent.focus(toggle);
      await userEvent.keyboard(' ');

      expect(onToggle).toHaveBeenLastCalledWith(true, onToggle.mock.calls[1][1]);
      expect(isOn).toBe(true);
    });

    test('blocks user interaction when disabled', async () => {
      const { rerender } = renderToggle({ isOn, disabled: true });

      expect(onToggle).not.toHaveBeenCalled();
      expect(isOn).toBe(true);

      const toggle = screen.getByTestId('toggle');

      await userEvent.click(toggle);

      expect(onToggle).not.toHaveBeenCalled();
      expect(isOn).toBe(true);

      rerender(<Toggle isOn={isOn} onToggle={onToggle} disabled />);

      fireEvent.focus(toggle);
      await userEvent.keyboard(' ');

      expect(onToggle).not.toHaveBeenCalled();
      expect(isOn).toBe(true);
    });
  });

  describe('uncontrolled', () => {
    test('the value should update with user interaction, both by mouse and keyboard', async () => {
      renderToggle();

      expect(onToggle).not.toHaveBeenCalled();

      const toggle = screen.getByTestId('toggle');

      await userEvent.click(toggle);

      expect(onToggle).toHaveBeenLastCalledWith(true, onToggle.mock.calls[0][1]);

      fireEvent.focus(toggle);
      await userEvent.keyboard(' ');

      expect(onToggle).toHaveBeenLastCalledWith(false, onToggle.mock.calls[1][1]);
    });

    test('blocks user interaction when disabled', async () => {
      renderToggle({ disabled: true });

      expect(onToggle).not.toHaveBeenCalled();

      const toggle = screen.getByTestId('toggle');

      await userEvent.click(toggle);

      expect(onToggle).not.toHaveBeenCalled();

      fireEvent.focus(toggle);
      await userEvent.keyboard(' ');

      expect(onToggle).not.toHaveBeenCalled();
    });
  });
});
