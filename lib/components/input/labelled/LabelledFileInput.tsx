import { forwardRef } from 'react';
import {
  LabelledProps,
  pickLabelledProps,
  withoutLabelledProps,
} from '../../../types';
import { buildClassName } from '../../../util';
import { FileInput, FileInputProps } from '../base';
import { BaseLabelledInput } from './BaseLabelledInput';

export interface LabelledFileInputProps extends FileInputProps, LabelledProps {}

export const LabelledFileInput = forwardRef<
  HTMLInputElement,
  LabelledFileInputProps
>(
  (
    {
      labelProps: { className: labelClassName, ...otherLabelProps } = {},
      ...otherProps
    }: LabelledFileInputProps,
    ref
  ) => {
    return (
      <BaseLabelledInput
        className={buildClassName(labelClassName, 'jtjs-labelled-file-input')}
        {...pickLabelledProps(otherProps)}
        {...otherLabelProps}
      >
        <FileInput {...withoutLabelledProps(otherProps)} ref={ref} />
      </BaseLabelledInput>
    );
  }
);
