import { LabelledProps, pickLabelledProps, withoutLabelledProps } from '../../../types';
import { buildClassName } from '../../../util';
import { Input, InputProps } from '../base';
import { BaseLabelledInput } from './BaseLabelledInput';

export interface LabelledInputProps extends InputProps, LabelledProps {}

export const LabelledInput = ({
  ref,
  labelProps: { className: labelClassName, ...otherLabelProps } = {},
  ...otherProps
}: LabelledInputProps) => {
  return (
    <BaseLabelledInput
      className={buildClassName(labelClassName, 'jtjs-labelled-input')}
      {...pickLabelledProps(otherProps)}
      {...otherLabelProps}
    >
      <Input {...withoutLabelledProps(otherProps)} ref={ref} />
    </BaseLabelledInput>
  );
};
