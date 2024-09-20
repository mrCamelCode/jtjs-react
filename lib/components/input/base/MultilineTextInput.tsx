import { ChangeEvent, ComponentPropsWithRef, forwardRef } from 'react';
import { buildClassName } from '../../../util';

export interface MultilineTextInputProps
  extends ComponentPropsWithRef<'textarea'> {
  /**
   * Handler for when the user attempts to change the input.
   *
   * @param text - The text of the input.
   * @param event - The original simulated event.
   */
  onChangeText?: (
    text: string,
    event: ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

/**
 * A light wrapper around a `textarea`.
 */
export const MultilineTextInput = forwardRef<
  HTMLTextAreaElement,
  MultilineTextInputProps
>(
  (
    {
      className,
      onChange,
      onChangeText,
      rows = 5,
      ...otherProps
    }: MultilineTextInputProps,
    ref
  ) => {
    return (
      <textarea
        data-testid="multiline-text-input"
        className={buildClassName(className, 'jtjs-multiline-text-input')}
        onChange={(event) => {
          onChangeText?.(event.target.value, event);
          onChange?.(event);
        }}
        rows={rows}
        {...otherProps}
        ref={ref}
      />
    );
  }
);
