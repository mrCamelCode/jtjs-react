import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Label, LabelProps } from '../Label';

const renderLabel = (props: Partial<LabelProps> = {}) => {
  const defaultProps: LabelProps = {};

  return render(<Label {...defaultProps} {...props} />);
};

describe('Label', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('the text of the label is visible', () => {
    renderLabel({
      children: 'lab',
    });

    expect(screen.getByText('lab')).toBeDefined();
  });
});
