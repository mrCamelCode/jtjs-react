import { ChangeEvent, forwardRef } from 'react';
import { buildClassName } from '../../../util';
import { Input, InputProps } from './Input';

export interface RadioProps extends InputProps {
  /**
   * Handler for when the user attempts to change the checked value of this radio button.
   */
  onChangeChecked?: (
    checked: boolean,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
}

/**
 * A wrapper for the base input component with a default `type` of `"radio"`.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    { onChange, onChangeChecked, className, ...otherProps }: RadioProps,
    ref
  ) => {
    return (
      <Input
        data-testid="radio"
        className={buildClassName(className, 'jtjs-radio')}
        type="radio"
        onChange={(event) => {
          onChangeChecked?.(event.target.checked, event);
          onChange?.(event);
        }}
        {...otherProps}
        ref={ref}
      />
    );
  }
);
