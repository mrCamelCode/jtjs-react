import { buildClassName } from '../../../util';
import { InlineText, InlineTextProps } from '../../text';

export interface TooltipProps extends InlineTextProps {}

/**
 * @private
 *
 * You shouldn't be using this yourself. If you want to add a tooltip to an
 * element, wrap it in a `Tooltipped`.
 */
export const Tooltip = ({ className, ...otherProps }: TooltipProps) => {
  return (
    <InlineText
      className={buildClassName(className, 'jtjs-tooltip')}
      role="tooltip"
      {...otherProps}
    />
  );
};
