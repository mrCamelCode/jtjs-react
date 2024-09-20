import { ComponentPropsWithRef, forwardRef } from 'react';
import { buildClassName } from '../../../util';

export interface InputProps
  extends Omit<ComponentPropsWithRef<'input'>, 'children'> {}

/**
 * A light wrapper for the `input` element with very little default configuration.
 * Usually, you won't want to use this directly and would probably prefer using
 * something like the Checkbox, Radio, or TextInput components.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...otherProps }: InputProps, ref) => {
    return (
      <input
        className={buildClassName(className, 'jtjs-input')}
        {...otherProps}
        ref={ref}
      />
    );
  }
);
