import { ChangeEvent } from 'react';
import { buildClassName } from '../../../util';
import { Input, InputProps } from './Input';

export interface ColorInputProps extends InputProps {
  /**
   * Handler for when the user changes the color of the input.
   *
   * @param color - The color, as a hex string. Note that browsers do not support an alpha channel
   * for the color input.
   * @param event - The original event.
   */
  onChangeColor?: (color: string, event: ChangeEvent<HTMLInputElement>) => void;
}

export const ColorInput = ({ ref, className, onChange, onChangeColor, ...otherProps }: ColorInputProps) => {
  return (
    <Input
      data-testid="color-input"
      className={buildClassName(className, 'jtjs-color-input')}
      type="color"
      onChange={(event) => {
        onChangeColor?.(event.target.value, event);
        onChange?.(event);
      }}
      {...otherProps}
      ref={ref}
    />
  );
};
