import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Text, TextProps } from '../Text';

const renderText = (props: Partial<TextProps> = {}) => {
  const defaultProps: TextProps = {
    children: 'Empty Text',
  };

  return render(<Text {...defaultProps} {...props} />);
};

describe('Text', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('will display its plain text contents', () => {
    renderText({
      children: 'Hello World!',
    });

    expect(screen.getByText('Hello World!')).toBeDefined();
  });

  it("will display its context when it isn't just plain text", () => {
    renderText({
      children: <a href="google.com">Google</a>,
    });

    expect(screen.getByText('Google')).toBeDefined();
  });
});
