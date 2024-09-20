import { forwardRef } from 'react';
import { LabelledImageFileInputProps } from '../labelled';

export interface FullImageFileInputProps extends LabelledImageFileInputProps {}

export const FullImageFileInput = forwardRef<
  HTMLInputElement,
  FullImageFileInputProps
>(
  (
    {
      labelProps: { className: labelClassName, ...otherLabelProps } = {},
      ...otherProps
    }: FullImageFileInputProps,
    ref
  ) => {
    return <></>;
  }
);
