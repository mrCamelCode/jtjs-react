import { ComponentPropsWithRef } from 'react';
import { buildClassName } from '../../util/util-functions';

export interface InlineTextProps extends ComponentPropsWithRef<'span'> {
  italic?: boolean;
  bold?: boolean;
}

export const InlineText = ({ ref, italic = false, bold = false, className, style, ...otherProps }: InlineTextProps) => {
  return (
    <span
      className={buildClassName(className, 'jtjs-inline-text')}
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
