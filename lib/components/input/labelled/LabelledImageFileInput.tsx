import { LabelledProps, pickLabelledProps, withoutLabelledProps } from '../../../types/labelled.props';
import { buildClassName } from '../../../util/util-functions';
import { ImageFileInput, ImageFileInputProps } from '../base/ImageFileInput';
import { BaseLabelledInput } from './BaseLabelledInput';

export interface LabelledImageFileInputProps extends ImageFileInputProps, LabelledProps {}

export const LabelledImageFileInput = ({
  ref,
  labelProps: { className: labelClassName, ...otherLabelProps } = {},
  ...otherProps
}: LabelledImageFileInputProps) => {
  return (
    <BaseLabelledInput
      className={buildClassName(labelClassName, 'jtjs-labelled-image-file-input')}
      {...pickLabelledProps(otherProps)}
      {...otherLabelProps}
    >
      <ImageFileInput {...withoutLabelledProps(otherProps)} ref={ref} />
    </BaseLabelledInput>
  );
};
