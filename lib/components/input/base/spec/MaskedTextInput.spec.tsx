import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { MaskedTextInput, MaskedTextInputProps } from '../MaskedTextInput';

let value = '';
let rawValue = '';
const onChangeText = vi.fn((maskedText: string, rawText: string) => {
  value = maskedText;
  rawValue = rawText;
});

const renderMaskedTextInput = (props: Partial<MaskedTextInputProps> = {}) => {
  const defaultProps: MaskedTextInputProps = {
    onChangeText,
  };

  return render(<MaskedTextInput {...defaultProps} {...props} />);
};

describe('MaskedTextInput', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe('controlled', () => {
    test('will apply a mask', () => {
      renderMaskedTextInput({
        mask: /\d/,
        value,
      });

      fireEvent.change(screen.getByTestId('masked-text-input'), {
        target: {
          value: 'abc123d678',
        },
      });

      expect(value).toBe('123678');
      expect(rawValue).toBe('abc123d678');
    });
  });

  describe('uncontrolled', () => {
    test('will apply a mask', () => {
      const { container } = renderMaskedTextInput({
        mask: /\d/,
      });

      fireEvent.change(screen.getByTestId('masked-text-input'), {
        target: {
          value: 'abc123d678',
        },
      });

      expect(value).toBe('123678');
      expect(rawValue).toBe('abc123d678');

      expect(container.querySelector('[value="123678"]')).toBeDefined();
    });
  });
});
