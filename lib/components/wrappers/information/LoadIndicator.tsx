import { ComponentPropsWithRef } from 'react';
import { buildClassName } from '../../../util';

export interface LoadIndicatorProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {}

/**
 * Default load indicator. Resolves to `span`s inside a `div` container.
 *
 * Note that this component has no visual appearance without styling. You must style this element for it
 * to have any appearance. `@jtjs/theme` includes styles for this element if you don't want to write
 * your own, or want a base to work from.
 *
 * If you'd like to style the component yourself, the structure of the resolved markup is:
 * ```
 * .jtjs-loading-dots-container
 *  .jtjs-loading-dot.jtjs-loading-dot-1
 *  .jtjs-loading-dot.jtjs-loading-dot-2
 * ```
 */
export const LoadIndicator = ({ ref, className, ...otherProps }: LoadIndicatorProps) => {
  return (
    <div className={buildClassName(className, 'jtjs-loading-dots-container')} {...otherProps} ref={ref}>
      {[1, 2].map((num) => {
        return <span className={`jtjs-loading-dot jtjs-loading-dot-${num}`} key={num} />;
      })}
    </div>
  );
};
