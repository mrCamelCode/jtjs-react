import { forwardRef } from 'react';
import {
  LabelPosition,
  LabelledProps,
  pickLabelledProps,
  withoutLabelledProps,
} from '../../../types';
import { buildClassName } from '../../../util';
import { Checkbox, CheckboxProps } from '../base';
import { BaseLabelledInput } from './BaseLabelledInput';

export interface LabelledCheckboxProps extends CheckboxProps, LabelledProps {}

export const LabelledCheckbox = forwardRef<
  HTMLInputElement,
  LabelledCheckboxProps
>(
  (
    {
      labelPosition = LabelPosition.After,
      labelProps: { className: labelClassName, ...otherLabelProps } = {},
      ...otherProps
    }: LabelledCheckboxProps,
    ref
  ) => {
    return (
      <BaseLabelledInput
        className={buildClassName(labelClassName, 'jtjs-labelled-checkbox')}
        {...pickLabelledProps(otherProps)}
        labelPosition={labelPosition}
        {...otherLabelProps}
      >
        <Checkbox {...withoutLabelledProps(otherProps)} ref={ref} />
      </BaseLabelledInput>
    );
  }
);
