import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Button, ButtonProps } from '../Button';

const renderButton = (props: Partial<ButtonProps> = {}) => {
  const defaultProps: ButtonProps = {};

  return render(<Button {...defaultProps} {...props} />);
};

describe('Button', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('invokes the click handler when clicked and shows up properly', async () => {
    const onClick = vi.fn();

    renderButton({
      children: 'Click Me',
      onClick,
    });

    expect(onClick).not.toHaveBeenCalled();

    await userEvent.click(screen.getByText('Click Me'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
