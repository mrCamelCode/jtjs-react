import { buildClassName } from '../../../util';
import { Flexbox, FlexboxProps } from './Flexbox';

export interface ContentboxProps extends FlexboxProps {
  /**
   * (Optional, defaults to `false`). Whether the box should have a marker class that indicates it should be filled
   * (have a background color).
   */
  filled?: boolean;
}

/**
 * A simple wrapper meant to house related content.
 */
export const Contentbox = ({ ref, className, filled = false, ...otherProps }: ContentboxProps) => {
  return (
    <Flexbox
      className={buildClassName(className, 'jtjs-contentbox', filled ? 'jtjs-filled' : '')}
      {...otherProps}
      ref={ref}
    />
  );
};
