import { LabelledProps, pickLabelledProps, withoutLabelledProps } from '../../../types';
import { buildClassName } from '../../../util';
import { MaskedMultilineTextInput, MaskedMultilineTextInputProps } from '../base/MaskedMultilineTextInput';
import { BaseLabelledInput } from './BaseLabelledInput';

export interface LabelledMaskedMultilineTextInputProps extends MaskedMultilineTextInputProps, LabelledProps {}

export const LabelledMaskedMultilineTextInput = ({
  ref,
  labelProps: { className: labelClassName, ...otherLabelProps } = {},
  ...otherProps
}: LabelledMaskedMultilineTextInputProps) => {
  return (
    <BaseLabelledInput
      className={buildClassName(labelClassName, 'jtjs-labelled-masked-multiline-text-input')}
      {...pickLabelledProps(otherProps)}
      {...otherLabelProps}
    >
      <MaskedMultilineTextInput {...withoutLabelledProps(otherProps)} ref={ref} />
    </BaseLabelledInput>
  );
};
