import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChangeEvent } from 'react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { CheckboxOption, LabelledCheckboxGroup, LabelledCheckboxGroupProps } from '../LabelledCheckboxGroup';

const defaultOptions: CheckboxOption[] = [
  {
    label: 'Checkbox 1',
    name: '1',
  },
  {
    label: 'Checkbox 2',
    name: '2',
  },
  {
    label: 'Checkbox 3',
    name: '3',
  },
];

let value: string[] = [];
const onChangeSelection = vi.fn(
  (selectedValues: string[], selectedValue: string, event: ChangeEvent<HTMLInputElement>) => {
    value = selectedValues;
  }
);

const renderLabelledCheckboxGroup = (props: Partial<LabelledCheckboxGroupProps> = {}) => {
  const defaultProps: LabelledCheckboxGroupProps = {
    options: defaultOptions,
    onChangeSelection,
  };

  return render(<LabelledCheckboxGroup {...defaultProps} {...props} />);
};

describe('LabelledCheckboxGroup', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe('controlled', () => {
    test('should display the options given to it', () => {
      renderLabelledCheckboxGroup({
        value,
      });

      defaultOptions.forEach((option) => {
        expect(screen.getByText(option.label)).not.toBeNull();
      });
    });

    test('the selections should update upon user interaction', async () => {
      renderLabelledCheckboxGroup({
        value,
      });

      await userEvent.click(screen.getByLabelText('Checkbox 2'));

      expect(onChangeSelection).toHaveBeenCalledWith(['2'], '2', onChangeSelection.mock.calls[0][2]);
      expect(JSON.stringify(value)).toBe(JSON.stringify(['2']));
    });

    test('should check the appropriate checkboxes when given a default value', () => {
      renderLabelledCheckboxGroup({
        value: ['3'],
      });

      defaultOptions.forEach((option) => {
        const checkbox = screen.getByLabelText(option.label) as HTMLInputElement;

        expect(checkbox.checked).toBe(option.name === '3' ? true : false);
      });
    });

    test('nothing should be selected when the default value does not correspond to any checkbox names', () => {
      renderLabelledCheckboxGroup({
        value: ['fjkdlaf'],
      });

      defaultOptions.forEach((option) => {
        const checkbox = screen.getByLabelText(option.label) as HTMLInputElement;

        expect(checkbox.checked).toBe(false);
      });
    });
  });
});
