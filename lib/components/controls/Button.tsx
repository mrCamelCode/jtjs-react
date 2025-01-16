import { ComponentPropsWithRef } from 'react';
import { buildClassName } from '../../util/util-functions';

export interface ButtonProps extends ComponentPropsWithRef<'button'> {}

/**
 * A simple wrapper for the base button component.
 *
 * The `type` prop is set to "button" by default, but can be overridden. This is to avoid having buttons
 * work unexpectedly as submit buttons when you use them in a form.
 */
export const Button = ({ ref, className, ...otherProps }: ButtonProps) => {
  return <button className={buildClassName(className, 'jtjs-button')} type="button" {...otherProps} ref={ref} />;
};
