import { ComponentPropsWithRef } from 'react';
import { buildClassName } from '../../util';

export interface LabelProps extends ComponentPropsWithRef<'label'> {}

export const Label = ({ ref, className, ...otherProps }: LabelProps) => {
  return <label className={buildClassName(className, 'jtjs-label')} {...otherProps} ref={ref} />;
};
