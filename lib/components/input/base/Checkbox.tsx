import { ChangeEvent } from 'react';
import { buildClassName } from '../../../util';
import { Input, InputProps } from './Input';

export interface CheckboxProps extends InputProps {
  /**
   * Handler for when the user attempts to change the value of the checkbox.
   *
   * @param checked - What the user wants the current checked value to be.
   * @param event - The original simulated event.
   */
  onChangeChecked?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Wraps the base input component with a default `type` of `"checkbox"`.
 */
export const Checkbox = ({ ref, className, onChange, onChangeChecked, ...otherProps }: CheckboxProps) => {
  return (
    <Input
      data-testid="checkbox"
      className={buildClassName(className, 'jtjs-checkbox')}
      type="checkbox"
      onChange={(event) => {
        onChangeChecked?.(event.target.checked, event);
        onChange?.(event);
      }}
      {...otherProps}
      ref={ref}
    />
  );
};
