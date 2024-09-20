import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { describe, afterEach,vi, test, expect } from 'vitest';
import {
  MaskedMultilineTextInput,
  MaskedMultilineTextInputProps,
} from '../MaskedMultilineTextInput';

let value = '';
let rawValue = '';
const onChangeText = vi.fn((maskedText: string, rawText: string) => {
  value = maskedText;
  rawValue = rawText;
});

const renderMaskedMultilineTextInput = (
  props: Partial<MaskedMultilineTextInputProps> = {}
) => {
  const defaultProps: MaskedMultilineTextInputProps = {
    onChangeText,
  };

  return render(<MaskedMultilineTextInput {...defaultProps} {...props} />);
};

describe('MaskedMultilineTextInput', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe('controlled', () => {
    test('will apply a mask', () => {
      renderMaskedMultilineTextInput({
        mask: /\d/,
        value,
      });

      let original = 'ab\nc123\nd67\n8';

      fireEvent.change(screen.getByTestId('masked-multiline-text-input'), {
        target: {
          value: original,
        },
      });

      const expected = '123\n67\n8';

      expect(value).toBe(expected);
      expect(rawValue).toBe(original);
    });
  });

  describe('uncontrolled', () => {
    test('will apply a mask', () => {
      const { container } = renderMaskedMultilineTextInput({
        mask: /\d/,
      });

      let original = 'ab\nc123\nd67\n8';

      fireEvent.change(screen.getByTestId('masked-multiline-text-input'), {
        target: {
          value: original,
        },
      });

      const expected = '123\n67\n8';

      expect(value).toBe(expected);
      expect(rawValue).toBe(original);
      expect(container.querySelector(`[value="${expected}"]`)).toBeDefined();
    });
  });
});
