import { ComponentPropsWithRef, createElement, forwardRef } from 'react';
import { buildClassName } from '../../util/util-functions';

export interface HeadingProps extends ComponentPropsWithRef<'h1'> {
  /**
   * (Optional, defaults to 3) The importance of the heading. This will be used to determine the appropriate
   * heading element to use and should generally denote relative importance of the heading on the page.
   */
  importance?: 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * Wraps the base heading elements and uses the appropriate element depending on the `importance` of the Heading.
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, importance = 3, ...otherProps }: HeadingProps, ref) => {
    return createElement(`h${importance}`, {
      className: buildClassName(className, 'jtjs-heading'),
      ...otherProps,
      ref,
    });
  }
);
