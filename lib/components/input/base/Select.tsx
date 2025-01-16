import { ChangeEvent, ComponentPropsWithRef, ComponentPropsWithoutRef } from 'react';
import { Option } from '../../../types';
import { buildClassName } from '../../../util';

export type SelectOption<T> = Option<T, Omit<ComponentPropsWithoutRef<'option'>, 'value' | 'children'>>;
export interface SelectOptionGroup<T> {
  groupLabel: string;
  options: SelectOption<T>[];
  optionGroupProps?: Omit<ComponentPropsWithoutRef<'optgroup'>, 'label'>;
}

export interface SelectProps extends ComponentPropsWithRef<'select'> {
  /**
   * The options to show in the dropdown.
   */
  options?: (SelectOption<any> | SelectOptionGroup<any>)[];
  /**
   * Handler for when the user attempts to change their selection in the dropdown.
   *
   * @param optionValue - The value of the option that was selected from the dropdown.
   * @param event - The original simulated event.
   */
  onChangeSelection?: (optionValue: string, event: ChangeEvent<HTMLSelectElement>) => void;
}

/**
 * A wrapper for the native select component. Provides the ability to define the options as a
 * prop.
 *
 * Can be controlled or uncontrolled. If you intend to control the component, you must provide
 * a `value` that's not `undefined`.
 */
export const Select = ({
  ref,
  options,
  onChange,
  onChangeSelection,
  className,
  children,
  ...otherProps
}: SelectProps) => {
  return (
    <select
      data-testid="select"
      className={buildClassName(className, 'jtjs-select')}
      onChange={(event) => {
        onChangeSelection?.(event.target.value, event);
        onChange?.(event);
      }}
      {...otherProps}
      ref={ref}
    >
      {options
        ? options.map((optionData) => {
            const isOptionGroup = 'groupLabel' in optionData;

            return isOptionGroup ? (
              <optgroup
                data-testid="select-option-group"
                key={optionData.groupLabel}
                {...optionData.optionGroupProps}
                label={optionData.groupLabel}
              >
                {optionData.options.map((optionGroupOptionData) => (
                  <OptionElement optionData={optionGroupOptionData} key={optionGroupOptionData.value} />
                ))}
              </optgroup>
            ) : (
              <OptionElement optionData={optionData} key={optionData.value} />
            );
          })
        : children}
    </select>
  );
};

/**
 * Convenience function for generating your select options when you'd like to introduce the possibility of having
 * an empty option.
 *
 * @param currentlySelectedValue - The value that's currently selected.
 * @param options - The options for the select.
 * @param allowEmpty - Whether an empty selection is available. The empty value will have a value of `''`.
 * @param allowEmptyAfterSelection - Whether the empty selection is available after a selection has been made.
 * This only has an affect if `allowEmpty` is true.
 */
export function generateSelectOptions<T>(
  currentlySelectedValue: T,
  options: NonNullable<SelectProps['options']>,
  allowEmpty = false,
  allowEmptyAfterSelection = false
): NonNullable<SelectProps['options']> {
  const includeEmpty = allowEmpty && (allowEmptyAfterSelection !== false || !currentlySelectedValue);

  return includeEmpty
    ? [
        {
          label: '',
          value: '',
        },
        ...(options ?? []),
      ]
    : options;
}

const OptionElement = ({
  optionData,
  ...otherProps
}: { optionData: SelectOption<any> } & ComponentPropsWithoutRef<'option'>) => {
  return (
    <option data-testid="select-option" {...otherProps} {...optionData.props} value={optionData.value}>
      {optionData.label}
    </option>
  );
};
