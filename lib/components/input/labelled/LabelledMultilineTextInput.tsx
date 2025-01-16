import { LabelledProps, pickLabelledProps, withoutLabelledProps } from '../../../types';
import { buildClassName } from '../../../util';
import { MultilineTextInput, MultilineTextInputProps } from '../base/MultilineTextInput';
import { BaseLabelledInput } from './BaseLabelledInput';

export interface LabelledMultilineTextInputProps extends MultilineTextInputProps, LabelledProps {}

export const LabelledMultilineTextInput = ({
  ref,
  labelProps: { className: labelClassName, ...otherLabelProps } = {},
  ...otherProps
}: LabelledMultilineTextInputProps) => {
  return (
    <BaseLabelledInput
      className={buildClassName(labelClassName, 'jtjs-labelled-multiline-text-input')}
      {...pickLabelledProps(otherProps)}
      {...otherLabelProps}
    >
      <MultilineTextInput {...withoutLabelledProps(otherProps)} ref={ref} />
    </BaseLabelledInput>
  );
};
