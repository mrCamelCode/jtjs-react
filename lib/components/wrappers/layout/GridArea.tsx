import { ComponentPropsWithRef } from 'react';
import { buildClassName } from '../../../util/util-functions';

export interface GridAreaProps extends ComponentPropsWithRef<'div'> {
  /**
   * The name of this grid area. This **_must_** correspond **_exactly_** with the
   * name you used when defining the parent `Grid`'s `layout`.
   *
   * Mutually exclusive with `row` and `column`.
   */
  name?: string;
  /**
   * Shorthand for [grid-row](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row), this allows
   * you to specify the space you'd like this area to be in when using `flow` in your `Grid`. Note that
   * specifying this will have no impact if you're using `layout` options in your `Grid` that describe
   * fixed areas. If using fixed areas, use the `name` prop instead to name this `GridArea` to match the name
   * you defined in `layout`.
   *
   * This follows the same syntax as the `grid-row` CSS rule.
   *
   * Mutually exclusive with `name`.
   */
  row?: string;
  /**
   * Shorthand for [grid-column](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column), this allows
   * you to specify the space you'd like this area to be in when using `flow` in your `Grid`. Note that
   * specifying this will have no impact if you're using `layout` options in your `Grid` that describe
   * fixed areas. If using fixed areas, use the `name` prop instead to name this `GridArea` to match the name
   * you defined in `layout`.
   *
   * This follows the same syntax as the `grid-column` CSS rule.
   *
   * Mutually exclusive with `name`.
   */
  column?: string;
}

/**
 * Used in conjunction with `Grid`. Allows you to easily outline the areas of your grid.
 */
export const GridArea = ({ ref, className, style, name, row, column, ...otherProps }: GridAreaProps) => {
  if ((!!row || !!column) && !!name) {
    console.warn(
      `GridArea: You shouldn't define the 'name' and the 'row'/'column' props at the same time. ` +
        `The styles conflict and will give you undesired results.`
    );
  }

  return (
    <div
      className={buildClassName(className, 'jtjs-grid-area')}
      style={{
        // For some reason, _something_ rewrites these styles and so I can't include
        // them all and have to conditionally decide when they're available. Having row/column
        // specified at the same time as an undefined area and vice versa breaks whatever is
        // trying to rewrite the styles. I'm guessing it's something the browser or
        // React is trying to do.
        ...(!!row || !!column ? { gridRow: row, gridColumn: column } : {}),
        ...(!!name ? { gridArea: name } : {}),
        ...style,
      }}
      {...otherProps}
      ref={ref}
    />
  );
};
