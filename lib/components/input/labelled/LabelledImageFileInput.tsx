import { forwardRef } from 'react';
import {
  LabelledProps,
  pickLabelledProps,
  withoutLabelledProps,
} from '../../../types';
import { ImageFileInput, ImageFileInputProps } from '../base';
import { BaseLabelledInput } from './BaseLabelledInput';
import { buildClassName } from '../../../util';

export interface LabelledImageFileInputProps
  extends ImageFileInputProps,
    LabelledProps {}

export const LabelledImageFileInput = forwardRef<
  HTMLInputElement,
  LabelledImageFileInputProps
>(
  (
    {
      labelProps: { className: labelClassName, ...otherLabelProps } = {},
      ...otherProps
    }: LabelledImageFileInputProps,
    ref
  ) => {
    return (
      <BaseLabelledInput
        className={buildClassName(
          labelClassName,
          'jtjs-labelled-image-file-input'
        )}
        {...pickLabelledProps(otherProps)}
        {...otherLabelProps}
      >
        <ImageFileInput {...withoutLabelledProps(otherProps)} ref={ref} />
      </BaseLabelledInput>
    );
  }
);
