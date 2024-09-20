import { forwardRef } from 'react';
import {
  LabelledProps,
  pickLabelledProps,
  withoutLabelledProps,
} from '../../../types';
import { buildClassName } from '../../../util';
import {
  MultilineTextInput,
  MultilineTextInputProps,
} from '../base/MultilineTextInput';
import { BaseLabelledInput } from './BaseLabelledInput';

export interface LabelledMultilineTextInputProps
  extends MultilineTextInputProps,
    LabelledProps {}

export const LabelledMultilineTextInput = forwardRef<
  HTMLTextAreaElement,
  LabelledMultilineTextInputProps
>(
  (
    {
      labelProps: { className: labelClassName, ...otherLabelProps } = {},
      ...otherProps
    }: LabelledMultilineTextInputProps,
    ref
  ) => {
    return (
      <BaseLabelledInput
        className={buildClassName(
          labelClassName,
          'jtjs-labelled-multiline-text-input'
        )}
        {...pickLabelledProps(otherProps)}
        {...otherLabelProps}
      >
        <MultilineTextInput {...withoutLabelledProps(otherProps)} ref={ref} />
      </BaseLabelledInput>
    );
  }
);
