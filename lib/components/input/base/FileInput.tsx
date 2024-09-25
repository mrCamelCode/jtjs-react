import { ChangeEvent, forwardRef } from 'react';
import { buildClassName } from '../../../util/util-functions';
import { Input, InputProps } from './Input';

export interface FileInputProps extends InputProps {
  /**
   * Callback for when the user uploads files.
   *
   * Note that because of how HTML file inputs work, this callback is _not_
   * additive. That is, if the user uploads 1 file, then uploads 2 files, the
   * second invocation of this callback will just contain the 2 new files.
   *
   * @param files - The files the user uploaded.
   * @param event - The original synthetic event.
   */
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
 * as uncontrolled. 
 * 
 * If you'd like a more controlled solution, consider using this component as a base to
 * create a file input that tracks its own state. This is the approach `FullImageFileInput` uses.
 */
export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, onChange, onChangeFiles, ...otherProps }: FileInputProps, ref) => {
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
