import { forwardRef, useId } from 'react';
import {
  LabelledProps,
  pickLabelledProps,
  withoutLabelledProps,
} from '../../../types';
import { buildClassName } from '../../../util';
import { Toggle, ToggleProps } from '../../controls';
import { BaseLabelledInput } from './BaseLabelledInput';

export interface LabelledToggleProps extends ToggleProps, LabelledProps {}

export const LabelledToggle = forwardRef<HTMLSpanElement, LabelledToggleProps>(
  (
    {
      labelProps: { className: labelClassName, ...otherLabelProps } = {},
      labelTextProps: { id: labelTextId, ...otherLabelTextProps } = {},
      ...otherProps
    }: LabelledToggleProps,
    ref
  ) => {
    const idToUse = labelTextId ?? `jtjs-toggle-${useId()}`;

    return (
      <BaseLabelledInput
        className={buildClassName(labelClassName, 'jtjs-labelled-toggle')}
        {...pickLabelledProps(otherProps)}
        labelTextProps={{
          id: idToUse,
          ...otherLabelTextProps,
        }}
        {...otherLabelProps}
      >
        <Toggle
          aria-labelledby={idToUse}
          {...withoutLabelledProps(otherProps)}
          ref={ref}
        />
      </BaseLabelledInput>
    );
  }
);
