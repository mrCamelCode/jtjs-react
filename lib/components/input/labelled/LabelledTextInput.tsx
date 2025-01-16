import { LabelledProps, pickLabelledProps, withoutLabelledProps } from '../../../types';
import { buildClassName } from '../../../util';
import { TextInput, TextInputProps } from '../base/TextInput';
import { BaseLabelledInput } from './BaseLabelledInput';

export interface LabelledTextInputProps extends TextInputProps, LabelledProps {}

export const LabelledTextInput = ({
  ref,
  labelProps: { className: labelClassName, ...otherLabelProps } = {},
  ...otherProps
}: LabelledTextInputProps) => {
  return (
    <BaseLabelledInput
      className={buildClassName(labelClassName, 'jtjs-labelled-text-input')}
      {...pickLabelledProps(otherProps)}
      {...otherLabelProps}
    >
      <TextInput {...withoutLabelledProps(otherProps)} ref={ref} />
    </BaseLabelledInput>
  );
};
