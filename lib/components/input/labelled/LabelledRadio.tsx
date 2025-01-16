import { LabelPosition, LabelledProps, pickLabelledProps, withoutLabelledProps } from '../../../types';
import { buildClassName } from '../../../util';
import { Radio, RadioProps } from '../base';
import { BaseLabelledInput } from './BaseLabelledInput';

export interface LabelledRadioProps extends RadioProps, LabelledProps {}

export const LabelledRadio = ({
  ref,
  labelPosition = LabelPosition.After,
  labelProps: { className: labelClassName, ...otherLabelProps } = {},
  ...otherProps
}: LabelledRadioProps) => {
  return (
    <BaseLabelledInput
      className={buildClassName(labelClassName, 'jtjs-labelled-radio')}
      {...pickLabelledProps(otherProps)}
      labelPosition={labelPosition}
      {...otherLabelProps}
    >
      <Radio {...withoutLabelledProps(otherProps)} ref={ref} />
    </BaseLabelledInput>
  );
};
