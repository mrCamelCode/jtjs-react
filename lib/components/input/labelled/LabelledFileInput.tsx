import { forwardRef } from 'react';
import { LabelledProps, pickLabelledProps, withoutLabelledProps } from '../../../types/labelled.props';
import { buildClassName } from '../../../util/util-functions';
import { FileInput, FileInputProps } from '../base/FileInput';
import { BaseLabelledInput } from './BaseLabelledInput';

export interface LabelledFileInputProps extends FileInputProps, LabelledProps {}

export const LabelledFileInput = forwardRef<HTMLInputElement, LabelledFileInputProps>(
  (
    { labelProps: { className: labelClassName, ...otherLabelProps } = {}, ...otherProps }: LabelledFileInputProps,
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
