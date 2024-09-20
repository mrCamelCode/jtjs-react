import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { TextInput, TextInputProps } from '../TextInput';

let value = '';
const onChangeText = vi.fn((text: string) => {
  value = text;
});

const renderTextInput = (props: Partial<TextInputProps> = {}) => {
  const defaultProps: TextInputProps = {
    onChangeText,
  };

  return render(<TextInput {...defaultProps} {...props} />);
};

describe('TextInput', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe('controlled', () => {
    describe('basic functionality', () => {
      test('user interaction updates the value of the input', () => {
        renderTextInput({
          value,
        });

        fireEvent.change(screen.getByTestId('text-input'), {
          target: {
            value: 'stuff',
          },
        });

        expect(value).toBe('stuff');
      });
    });

    describe('multiline', () => {
      test('does not allow newline characters', () => {
        renderTextInput({
          value,
        });

        const text = 'stuff\n and things\n yeah';

        fireEvent.change(screen.getByTestId('text-input'), {
          target: {
            value: text,
          },
        });

        expect(value).toBe('stuff and things yeah');
      });
    });
  });

  describe('uncontrolled', () => {
    describe('basic functionality', () => {
      test('user interaction updates the value of the input', () => {
        renderTextInput();

        fireEvent.change(screen.getByTestId('text-input'), {
          target: {
            value: 'stuff',
          },
        });

        expect(onChangeText).toHaveBeenCalledTimes(1);

        expect(value).toBe('stuff');
      });
    });

    describe('multiline', () => {
      test('does not allow newline characters in the input when multiline is disabled', () => {
        renderTextInput();

        const text = 'stuff\n and things\n yeah';

        fireEvent.change(screen.getByTestId('text-input'), {
          target: {
            value: text,
          },
        });

        const expectation = 'stuff and things yeah';

        expect(value).toBe(expectation);
      });
    });
  });
});
