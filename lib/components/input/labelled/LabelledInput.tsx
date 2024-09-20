import { forwardRef } from 'react';
import {
  LabelledProps,
  pickLabelledProps,
  withoutLabelledProps,
} from '../../../types';
import { buildClassName } from '../../../util';
import { Input, InputProps } from '../base';
import { BaseLabelledInput } from './BaseLabelledInput';

export interface LabelledInputProps extends InputProps, LabelledProps {}

export const LabelledInput = forwardRef<HTMLInputElement, LabelledInputProps>(
  (
    {
      labelProps: { className: labelClassName, ...otherLabelProps } = {},
      ...otherProps
    }: LabelledInputProps,
    ref
  ) => {
    return (
      <BaseLabelledInput
        className={buildClassName(labelClassName, 'jtjs-labelled-input')}
        {...pickLabelledProps(otherProps)}
        {...otherLabelProps}
      >
        <Input {...withoutLabelledProps(otherProps)} ref={ref} />
      </BaseLabelledInput>
    );
  }
);
