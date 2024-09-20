import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { Select, SelectOption, SelectProps, generateSelectOptions } from '../Select';

let value = '1';
const onChangeSelection = vi.fn((option: string) => (value = option));

const defaultOptions = [
  {
    label: 'Option 1',
    value: '1',
  },
  {
    label: 'Option 2',
    value: '2',
  },
];

const renderSelect = (props: Partial<SelectProps> = {}) => {
  const defaultProps: SelectProps = {
    options: defaultOptions,
    onChangeSelection,
  };

  return render(<Select {...defaultProps} {...props} />);
};

describe('Select', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  describe('controlled', () => {
    test('allows you to specify options as a prop', () => {
      renderSelect({
        value,
      });

      expect(screen.getByText('Option 1')).toBeDefined();
      expect(screen.getByText('Option 2')).toBeDefined();
    });

    test('should allow you to change which option is selected', async () => {
      renderSelect({
        value,
        onChangeSelection,
      });

      await userEvent.selectOptions(screen.getByTestId('select'), 'Option 2');

      expect(onChangeSelection.mock.calls[0][0]).toEqual('2');
    });

    test('should accurately default to the option that is set as the initial value', () => {
      renderSelect({
        value: '2',
      });

      expect((screen.getByText('Option 1') as HTMLOptionElement).selected).toBe(false);
      expect((screen.getByText('Option 2') as HTMLOptionElement).selected).toBe(true);
    });

    test('should allow providing options manually via children', () => {
      renderSelect({
        options: undefined,
        children: <option value={100}>Custom Option</option>,
        value,
      });

      expect(screen.getByText('Custom Option')).toBeDefined();
    });
  });

  describe('uncontrolled', () => {
    test('allows you to specify options as a prop', () => {
      renderSelect();

      expect(screen.getByText('Option 1')).toBeDefined();
      expect(screen.getByText('Option 2')).toBeDefined();
    });

    test('should allow you to change which option is selected', async () => {
      renderSelect();

      const select = screen.getByTestId('select') as HTMLSelectElement;

      await userEvent.selectOptions(screen.getByTestId('select'), 'Option 2');

      expect(select.value).toBe('2');

      await userEvent.selectOptions(screen.getByTestId('select'), 'Option 1');

      expect(select.value).toBe('1');
    });

    test('should use the defaultValue', () => {
      renderSelect({
        defaultValue: '2',
      });

      expect((screen.getByText('Option 1') as HTMLOptionElement).selected).toBe(false);
      expect((screen.getByText('Option 2') as HTMLOptionElement).selected).toBe(true);
    });

    test('should allow providing options manually via children', () => {
      renderSelect({
        options: undefined,
        children: <option value={100}>Custom Option</option>,
      });

      expect(screen.getByText('Custom Option')).toBeDefined();
    });
  });

  describe('generateSelectOptions', () => {
    test('should include an empty first option when allowEmpty is set to true', () => {
      const options = generateSelectOptions(undefined, defaultOptions, true, false);

      expect(options.length).toBe(3);

      expect((options[0] as SelectOption<string>).label).toBe('');
      expect((options[1] as SelectOption<string>).label).toBe('Option 1');
      expect((options[2] as SelectOption<string>).label).toBe('Option 2');
    });

    test('should not include an empty first option when allowEmpty is set to false', () => {
      const options = generateSelectOptions(undefined, defaultOptions, false, false);

      expect(options.length).toBe(2);

      expect(options.every((option) => (option as SelectOption<string>).value !== '')).toBe(true);
    });

    test('should include the empty options when there is a current value and allowEmptyAfterSelection is true', () => {
      const options = generateSelectOptions(defaultOptions[0].value, defaultOptions, true, true);

      expect(options.length).toBe(3);
      expect((options[0] as SelectOption<string>).value).toBe('');
    });

    test('should not include the empty option when there is a current value and allowEmptyAfterSelection is false', () => {
      const options = generateSelectOptions(defaultOptions[0].value, defaultOptions, true, false);

      expect(options.length).toBe(2);
      expect(options.every((option) => (option as SelectOption<string>).value !== '')).toBe(true);
    });
  });

  test('can have option groups', () => {
    renderSelect({
      options: [
        {
          label: 'Free Option 1',
          value: '1',
        },
        {
          groupLabel: 'Grouped Options',
          options: [
            {
              label: 'Grouped Option 1',
              value: '11',
            },
            {
              label: 'Grouped Option 2',
              value: '22',
            },
          ],
        },
      ],
    });

    expect((screen.getByTestId('select-option-group') as HTMLOptGroupElement).label).toBe('Grouped Options');
    expect(screen.getByText('Grouped Option 1')).not.toBeNull();
    expect(screen.getByText('Grouped Option 2')).not.toBeNull();
  });
});
