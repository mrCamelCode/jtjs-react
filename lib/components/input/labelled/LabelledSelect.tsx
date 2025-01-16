import { LabelledProps, pickLabelledProps, withoutLabelledProps } from '../../../types';
import { buildClassName } from '../../../util';
import { Select, SelectProps } from '../base';
import { BaseLabelledInput } from './BaseLabelledInput';

export interface LabelledSelectProps extends SelectProps, LabelledProps {}

export const LabelledSelect = ({
  ref,
  labelProps: { className: labelClassName, ...otherLabelProps } = {},
  ...otherProps
}: LabelledSelectProps) => {
  return (
    <BaseLabelledInput
      className={buildClassName(labelClassName, 'jtjs-labelled-select')}
      {...pickLabelledProps(otherProps)}
      {...otherLabelProps}
    >
      <Select {...withoutLabelledProps(otherProps)} ref={ref} />
    </BaseLabelledInput>
  );
};
