import { LabelledProps, pickLabelledProps, withoutLabelledProps } from '../../../types';
import { buildClassName } from '../../../util';
import { MaskedTextInput, MaskedTextInputProps } from '../base';
import { BaseLabelledInput } from './BaseLabelledInput';

export interface LabelledMaskedTextInputProps extends MaskedTextInputProps, LabelledProps {}

export const LabelledMaskedTextInput = ({
  ref,
  labelProps: { className: labelClassName, ...otherLabelProps } = {},
  ...otherProps
}: LabelledMaskedTextInputProps) => {
  return (
    <BaseLabelledInput
      className={buildClassName(labelClassName, 'jtjs-labelled-masked-text-input')}
      {...pickLabelledProps(otherProps)}
      {...otherLabelProps}
    >
      <MaskedTextInput {...withoutLabelledProps(otherProps)} ref={ref} />
    </BaseLabelledInput>
  );
};
