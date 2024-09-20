import { forwardRef } from 'react';
import {
  LabelledProps,
  pickLabelledProps,
  withoutLabelledProps,
} from '../../../types';
import { buildClassName } from '../../../util';
import { Select, SelectProps } from '../base';
import { BaseLabelledInput } from './BaseLabelledInput';

export interface LabelledSelectProps extends SelectProps, LabelledProps {}

export const LabelledSelect = forwardRef<
  HTMLSelectElement,
  LabelledSelectProps
>(
  (
    {
      labelProps: { className: labelClassName, ...otherLabelProps } = {},
      ...otherProps
    }: LabelledSelectProps,
    ref
  ) => {
    return (
      <BaseLabelledInput
        className={buildClassName(labelClassName, 'jtjs-labelled-select')}
        {...pickLabelledProps(otherProps)}
        {...otherLabelProps}
      >
        <Select {...withoutLabelledProps(otherProps)} ref={ref} />
      </BaseLabelledInput>
    );
  }
);
