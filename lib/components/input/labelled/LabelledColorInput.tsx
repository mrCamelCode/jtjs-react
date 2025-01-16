import { LabelledProps, pickLabelledProps, withoutLabelledProps } from '../../../types';
import { buildClassName } from '../../../util';
import { ColorInput, ColorInputProps } from '../base/ColorInput';
import { BaseLabelledInput } from './BaseLabelledInput';

export interface LabelledColorInputProps extends ColorInputProps, LabelledProps {}

export const LabelledColorInput = ({
  ref,
  labelProps: { className: labelClassName, ...otherLabelProps } = {},
  ...otherProps
}: LabelledColorInputProps) => {
  return (
    <BaseLabelledInput
      className={buildClassName(labelClassName, 'jtjs-labelled-color-input')}
      {...pickLabelledProps(otherProps)}
      {...otherLabelProps}
    >
      <ColorInput {...withoutLabelledProps(otherProps)} ref={ref} />
    </BaseLabelledInput>
  );
};
