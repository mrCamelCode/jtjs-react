import { ComponentPropsWithRef, forwardRef } from 'react';
import { buildClassName } from '../../util';

export interface TextProps extends ComponentPropsWithRef<'p'> {
  italic?: boolean;
  bold?: boolean;
}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      italic = false,
      bold = false,
      className,
      style,
      ...otherProps
    }: TextProps,
    ref
  ) => {
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
  }
);
