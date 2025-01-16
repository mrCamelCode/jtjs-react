import { ChangeEvent, ComponentPropsWithoutRef, useId, useState } from 'react';
import { LabelPosition, LabelledProps, Option } from '../../../types';
import { buildClassName } from '../../../util/util-functions';
import { InlineText } from '../../text/InlineText';
import { LabelledRadio, LabelledRadioProps } from '../labelled';
import { FormGroup, FormGroupProps } from './FormGroup';

export type RadioOption<T> = Option<
  T,
  Omit<LabelledRadioProps, 'onChangeChecked' | 'id' | 'checked' | 'value' | 'label' | 'children'>
>;

export interface LabelledRadioGroupProps<T = any>
  extends Omit<FormGroupProps, 'defaultValue' | 'children'>,
    Omit<LabelledProps, 'labelProps'> {
  options: RadioOption<T>[];
  name?: string;
  value?: T;
  /**
   * The default value for the radio group to have. This only has an effect when the component is uncontrolled. If you
   * want to default a controlled group, just set your `value`'s initial value to be your default.
   */
  defaultValue?: T;
  /**
   * Handler for when the user attempts to change their selection in the radio group.
   *
   * @param optionValue - The value of the option that was selected.
   * @param event - The original simulated event.
   */
  onChangeSelection?: (optionValue: any | null, event: ChangeEvent<HTMLInputElement>) => void;
  labelProps?: ComponentPropsWithoutRef<'legend'>;
}

/**
 * A group of related radio inputs.
 *
 * Can be controlled or uncontrolled. If you intend to control the component, you must provide
 * a `value` that's not `undefined`.
 */
export const LabelledRadioGroup = ({
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
}: LabelledRadioGroupProps) => {
  const [internalValue, setInternalValue] = useState<typeof value>(defaultValue);

  const isControlled = value !== undefined;

  const nameToUse = name ?? `jtjs-radio-group-${useId()}`;

  const handleChange = (checked: boolean, event: ChangeEvent<HTMLInputElement>) => {
    if (checked) {
      onChangeSelection?.(event.target.value, event);

      if (!isControlled) {
        setInternalValue(event.target.value);
      }
    }
  };

  const getValue = () => {
    return isControlled ? value : internalValue;
  };

  const labelMarkup = (
    <legend className={buildClassName(labelClassName, 'jtjs-radio-group-label')} {...otherLabelProps}>
      <InlineText className={buildClassName(labelTextClassName, 'jtjs-label-text')} {...otherLabelTextProps}>
        {label}
      </InlineText>
    </legend>
  );

  return (
    <FormGroup role="radiogroup" className={buildClassName(className, 'jtjs-radio-group')} {...otherProps} ref={ref}>
      {label !== undefined && labelPosition === LabelPosition.Before && labelMarkup}

      {options.map(({ label: optionLabel, value: optionValue, props }) => {
        const id = `${nameToUse}-jtjs-radio-button-${optionLabel}`;

        return (
          <LabelledRadio
            key={id}
            {...props}
            onChangeChecked={handleChange}
            name={nameToUse}
            checked={optionValue === getValue()}
            value={optionValue}
            label={optionLabel}
          />
        );
      })}

      {label !== undefined && labelPosition === LabelPosition.After && labelMarkup}
    </FormGroup>
  );
};
