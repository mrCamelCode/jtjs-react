import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChangeEvent } from 'react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { LabelledRadioGroup, LabelledRadioGroupProps, RadioOption } from '../LabelledRadioGroup';

let defaultOptions: RadioOption<string>[] = [
  {
    label: 'Radio 1',
    value: '1',
  },
  {
    label: 'Radio 2',
    value: '2',
  },
  {
    label: 'Radio 3',
    value: '3',
  },
];

let value = '';
let onChangeSelection = vi.fn((optionValue: string, event: ChangeEvent<HTMLInputElement>) => {
  value = optionValue;
});

const renderLabelledRadioGroup = (props: Partial<LabelledRadioGroupProps> = {}) => {
  const defaultProps: LabelledRadioGroupProps = {
    options: defaultOptions,
    onChangeSelection,
    name: 'test-group',
  };

  return render(<LabelledRadioGroup {...defaultProps} {...props} />);
};

describe('LabelledRadioGroup', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  describe('controlled', () => {
    test('should display the options given to it', () => {
      renderLabelledRadioGroup({
        value,
      });

      defaultOptions.forEach((option) => {
        expect(screen.getByText(option.label)).not.toBeNull();
      });
    });

    test('the selection should update upon user interaction', async () => {
      renderLabelledRadioGroup({
        value,
      });

      await userEvent.click(screen.getByLabelText('Radio 2'));

      expect(onChangeSelection).toHaveBeenCalledWith(
        '2',
        // Don't care about the value of the event.
        onChangeSelection.mock.calls[0][1]
      );
      expect(value).toBe('2');
    });

    test('should check the appropriate radio when given a default value', () => {
      renderLabelledRadioGroup({
        value: '3',
      });

      defaultOptions.forEach((option) => {
        const radio = screen.getByLabelText(option.label) as HTMLInputElement;

        expect(radio.checked).toBe(option.value === '3' ? true : false);
      });
    });

    test('no radio should be selected when the default value does not correspond to an option', () => {
      renderLabelledRadioGroup({
        value: 'jfkdjakf',
      });

      defaultOptions.forEach((option) => {
        const radio = screen.getByLabelText(option.label) as HTMLInputElement;

        expect(radio.checked).toBe(false);
      });
    });
  });

  describe('uncontrolled', () => {
    test('should display the options given to it', () => {
      renderLabelledRadioGroup();

      defaultOptions.forEach((option) => {
        expect(screen.getByText(option.label)).toBeDefined();
      });
    });

    test('the selection should update upon user interaction', async () => {
      renderLabelledRadioGroup();

      await userEvent.click(screen.getByLabelText('Radio 2'));

      expect(onChangeSelection).toHaveBeenCalledWith(
        '2',
        // Don't care about the value of the event.
        onChangeSelection.mock.calls[0][1]
      );
      expect(value).toBe('2');
    });

    test('should check the appropriate radio when given a default value', () => {
      renderLabelledRadioGroup({
        defaultValue: '3',
      });

      defaultOptions.forEach((option) => {
        const radio = screen.getByLabelText(option.label) as HTMLInputElement;

        expect(radio.checked).toBe(option.value === '3' ? true : false);
      });
    });

    test('no radio should be selected when the default value does not correspond to an option', () => {
      renderLabelledRadioGroup({
        defaultValue: 'jfkdjakf',
      });

      defaultOptions.forEach((option) => {
        const radio = screen.getByLabelText(option.label) as HTMLInputElement;

        expect(radio.checked).toBe(false);
      });
    });
  });
});
