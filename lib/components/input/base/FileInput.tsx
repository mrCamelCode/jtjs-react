import { ChangeEvent, forwardRef } from 'react';
import { Input, InputProps } from './Input';
import { buildClassName } from '../../../util';

export interface FileInputProps extends InputProps {
  onChangeFiles?: (files: File[], event: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * A wrapper for the base input component with a default `type` of `"file"`. Useful
 * for when you want to accept a file from the user.
 *
 * Just like a regular file input, if you'd like to allow the user to pass multiple
 * files, set the `multiple` prop.
 *
 * Note that file inputs in HTML are nearly impossible to control. The only valid
 * value for `value` is an empty string, and that's for wiping the input. The `files`
 * attribute is intended to be immutable. Because of this, you should treat this input
 * as uncontrolled. If you want to have a more controlled solution, you can use this
 * component as a base and build state management around it while hiding the base input.
 */
export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    { className, onChange, onChangeFiles, ...otherProps }: FileInputProps,
    ref
  ) => {
    return (
      <Input
        className={buildClassName(className, 'jtjs-file-input')}
        type="file"
        onChange={(event) => {
          onChangeFiles?.(Array.from(event.target.files ?? []), event);
          onChange?.(event);
        }}
        {...otherProps}
        ref={ref}
      />
    );
  }
);
