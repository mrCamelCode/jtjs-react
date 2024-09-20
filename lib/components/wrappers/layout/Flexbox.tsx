import { ComponentPropsWithRef, forwardRef } from 'react';
import { HorizontalAlignment, VerticalAlignment } from '../../../types';
import { buildClassName } from '../../../util/util-functions';

export interface FlexboxProps extends ComponentPropsWithRef<'div'> {
  /**
   * (Optional, defaults to `row`) The direction that the contents of the Flexbox
   * flow.
   */
  direction?: 'row' | 'column';
  /**
   * (Optional, defaults to `false`) Whether the flow direction of the Flexbox's
   * contents should be reversed.
   */
  reverseDirection?: boolean;
  horizontalAlignment?: HorizontalAlignment;
  verticalAlignment?: VerticalAlignment;
  /**
   * (Optional, defaults to `false`) Whether the contents of the Flexbox should
   * wrap.
   */
  wrap?: boolean;
  reverseWrap?: boolean;
  /**
   * (Optional, defaults to `0.5rem`) How much space to put between the contents of
   * the Flexbox.
   */
  spacing?: string;
}

/**
 * A wrapper that allows for rapid and simple assembly of layouts by leveraging flex.
 *
 * Intended to be used purely for layout. Flexboxes aren't intended to have any styling associated with them besides the inline
 * styles the component generates to express the flex options determined from the provided props.
 */
export const Flexbox = forwardRef<HTMLDivElement, FlexboxProps>(
  (
    {
      className,
      children,
      style,
      direction = 'row',
      reverseDirection = false,
      horizontalAlignment = 'left',
      verticalAlignment = 'top',
      wrap = true,
      reverseWrap = false,
      spacing = '0.5rem',
      ...otherProps
    }: FlexboxProps,
    ref
  ) => {
    const flexWrap = `${wrap ? 'wrap' : 'nowrap'}${
      reverseWrap && wrap ? '-reverse' : ''
    }`;
    const flexFlow = `${direction}${
      reverseDirection ? '-reverse' : ''
    } ${flexWrap}`;

    const mainAxis = direction === 'row' ? 'x' : 'y';
    const crossAxis = mainAxis === 'x' ? 'y' : 'x';

    let horizontalAligmentToFlexTerms = '';
    switch (horizontalAlignment) {
      case 'left':
        horizontalAligmentToFlexTerms =
          mainAxis === 'x' && reverseDirection ? 'flex-end' : 'flex-start';
        break;
      case 'center':
        horizontalAligmentToFlexTerms = 'center';
        break;
      case 'right':
        horizontalAligmentToFlexTerms =
          mainAxis === 'x' && reverseDirection ? 'flex-start' : 'flex-end';
        break;
    }

    let verticalAlignmentToFlexTerms = '';
    switch (verticalAlignment) {
      case 'top':
        verticalAlignmentToFlexTerms =
          mainAxis === 'y' && reverseDirection ? 'flex-end' : 'flex-start';
        break;
      case 'center':
        verticalAlignmentToFlexTerms = 'center';
        break;
      case 'bottom':
        verticalAlignmentToFlexTerms =
          mainAxis === 'y' && reverseDirection ? 'flex-start' : 'flex-end';
        break;
    }

    // justify-content drives the alignment and spacing along the main axis.
    const justifyContent =
      mainAxis === 'x'
        ? horizontalAligmentToFlexTerms
        : verticalAlignmentToFlexTerms;

    // align-items drives the alignment along the cross axis
    const alignItems =
      crossAxis === 'x'
        ? horizontalAligmentToFlexTerms
        : verticalAlignmentToFlexTerms;

    // align-content drives the flex container's lines when multiline, and drives spacing and alignment along the
    // cross axis.
    const alignContent =
      crossAxis === 'x'
        ? horizontalAligmentToFlexTerms
        : verticalAlignmentToFlexTerms;

    return (
      <div
        className={buildClassName(className, 'jtjs-flexbox')}
        style={{
          display: 'flex',
          flexFlow,
          justifyContent,
          alignItems,
          alignContent,
          gap: spacing,
          ...style,
        }}
        {...otherProps}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);
