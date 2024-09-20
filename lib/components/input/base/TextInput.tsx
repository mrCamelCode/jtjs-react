import { ChangeEvent, forwardRef } from 'react';
import { buildClassName } from '../../../util';
import { Input, InputProps } from './Input';

export interface TextInputProps extends InputProps {
  /**
   * Handler for when the user attempts to change the input.
   *
   * @param text - The text of the input.
   * @param event - The original simulated event.
   */
  onChangeText?: (text: string, event: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * A wrapper for the base input component with a default `type` of `"text"`. Useful
 * for single line text input. If you want to allow multiple lines of input, try
 * using `MultilineTextInput`.
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { className, onChange, onChangeText, ...otherProps }: TextInputProps,
    ref
  ) => {
    return (
      <Input
        data-testid="text-input"
        className={buildClassName(className, 'jtjs-text-input')}
        type="text"
        onChange={(event) => {
          onChangeText?.(event.target.value, event);
          onChange?.(event);
        }}
        {...otherProps}
        ref={ref}
      />
    );
  }
);
