import { ChangeEvent, ComponentPropsWithoutRef, useState } from 'react';
import { LabelPosition, LabelledProps, Option } from '../../../types';
import { buildClassName } from '../../../util';
import { InlineText } from '../../text/InlineText';
import { LabelledCheckbox, LabelledCheckboxProps } from '../labelled';
import { FormGroup, FormGroupProps } from './FormGroup';

type CheckboxGroupValue = CheckboxOption['name'][];

export interface CheckboxOption
  extends Omit<
    Option<undefined, Omit<LabelledCheckboxProps, 'onChangeChecked' | 'name' | 'id' | 'checked' | 'value' | 'label'>>,
    'value'
  > {
  /**
   * The name of the checkbox. This is used to differentiate this checkbox from others
   * within the group, so should be unique among the checkboxes in the group.
   */
  name: string;
}

export interface LabelledCheckboxGroupProps
  extends Omit<FormGroupProps, 'defaultValue' | 'children'>,
    Omit<LabelledProps, 'labelProps'> {
  options: CheckboxOption[];
  /**
   * The value the group should have. This is an array of all the names of the checkboxes that are currently
   * checked.
   */
  value?: CheckboxGroupValue;
  /**
   * The default value for the checkbox group to have. This only has an effect when the component is uncontrolled. If you
   * want to default a controlled group, just set your `value`'s initial value to be your default.
   */
  defaultValue?: CheckboxGroupValue;
  /**
   * Handler for when the user attempts to change their selected items in the checkbox group.
   *
   * @param selectedValues - The names of the checkboxes that should be checked.
   * @param selectedValue - The name of the checkboxes that was checked.
   * @param event - The original simulated event.
   */
  onChangeSelection?: (
    selectedValues: CheckboxGroupValue,
    selectedValue: CheckboxOption['name'],
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  labelProps?: ComponentPropsWithoutRef<'legend'>;
}

/**
 * A group of related checkbox inputs.
 *
 * Can be controlled or uncontrolled. If you intend to control the component, you must provide
 * a `value` that's not `undefined`.
 */
export const LabelledCheckboxGroup = ({
  ref,
  name,
  options,
  value,
  defaultValue,
  onChangeSelection,
  className,
  label = '',
  labelPosition = LabelPosition.Before,
  labelProps: { className: labelClassName, ...otherLabelProps } = {},
  labelTextProps: { className: labelTextClassName, ...otherLabelTextProps } = {},
  ...otherProps
}: LabelledCheckboxGroupProps) => {
  const [internalValue, setInternalValue] = useState<typeof value>(defaultValue);

  const isControlled = value !== undefined;

  const getValue = () => {
    return isControlled ? value : internalValue;
  };

  const handleChange: LabelledCheckboxProps['onChangeChecked'] = (checked, event) => {
    const checkboxName = event.target.name;

    const updatedValue = checked
      ? [...(getValue() ?? []), checkboxName]
      : getValue()?.filter((name) => name !== checkboxName) ?? [];

    onChangeSelection?.(updatedValue, checkboxName, event);

    if (!isControlled) {
      setInternalValue(updatedValue);
    }
  };

  const labelMarkup = (
    <legend className={buildClassName(labelClassName, 'jtjs-checkbox-group-label')} {...otherLabelProps}>
      <InlineText className={buildClassName(labelTextClassName, 'jtjs-label-text')} {...otherLabelTextProps}>
        {label}
      </InlineText>
    </legend>
  );

  return (
    <FormGroup className={buildClassName(className, 'jtjs-checkbox-group')} {...otherProps} ref={ref}>
      {label !== undefined && labelPosition === LabelPosition.Before && labelMarkup}
      {options.map(({ label: checkboxLabel, name: checkboxName, props }) => {
        const id = `jtjs-checkbox-${checkboxLabel}`;

        return (
          <LabelledCheckbox
            key={id}
            {...props}
            onChangeChecked={handleChange}
            id={id}
            name={checkboxName}
            checked={!!getValue()?.includes(checkboxName)}
            label={checkboxLabel}
          />
        );
      })}
      {label !== undefined && labelPosition === LabelPosition.After && labelMarkup}
    </FormGroup>
  );
};
