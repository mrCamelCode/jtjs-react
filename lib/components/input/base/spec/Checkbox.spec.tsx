import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Checkbox, CheckboxProps } from '../Checkbox';

let value = false;
let onChangeChecked = vi.fn((checked: boolean) => (value = checked));

const renderCheckbox = (props: Partial<CheckboxProps> = {}) => {
  const defaultProps: CheckboxProps = {
    checked: value,
    onChangeChecked,
  };

  return render(<Checkbox {...defaultProps} {...props} />);
};

describe('Checkbox', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('checked value updates correctly on interaction', async () => {
    renderCheckbox();

    expect(onChangeChecked).not.toHaveBeenCalled();

    await userEvent.click(screen.getByTestId('checkbox'));

    expect(onChangeChecked).toHaveBeenCalledTimes(1);
    expect(value).toBe(true);
  });
});
