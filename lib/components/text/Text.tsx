import { ComponentPropsWithRef } from 'react';
import { buildClassName } from '../../util';

export interface TextProps extends ComponentPropsWithRef<'p'> {
  italic?: boolean;
  bold?: boolean;
}

export const Text = ({ ref, italic = false, bold = false, className, style, ...otherProps }: TextProps) => {
  return (
    <p
      className={buildClassName(className, 'jtjs-text')}
      style={{
        ...(italic
          ? {
              fontStyle: 'italic',
            }
          : {}),
        ...(bold
          ? {
              fontWeight: 'bold',
            }
          : {}),
        ...style,
      }}
      {...otherProps}
      ref={ref}
    />
  );
};
