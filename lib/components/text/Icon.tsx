import { ComponentPropsWithRef, forwardRef } from 'react';
import { buildClassName } from '../../util';

export interface IconProps
  extends Omit<ComponentPropsWithRef<'span'>, 'children'> {
  /**
   * The name of the icon. This must match the name of the icon in FontAwesome, minus the
   * `fa` prefix (which is added for you).
   *
   * @example
   * ```tsx
   * <Icon iconType="solid" icon="address-card" />
   * ```
   */
  icon: string;
  /**
   * (Optional, defaults to `'solid'`) The type of icon. This affects the style of the icon pulled from FontAwesome.
   */
  iconType?: 'brand' | 'regular' | 'solid';
}

/**
 * Renders an icon from FontAwesome. Note that for this component to work, you MUST either:
 * 1. Import FontAwesome via a URL like this: https://use.fontawesome.com/releases/v5.15.4/css/all.css
 * 1. Include FontAwesome in your project yourself another way
 *
 * If your icon doesn't seem to be appearing and you've verified that you're including FontAwesome
 * in your project, try verifying and changing the `iconType`.
 */
export const Icon = forwardRef<HTMLSpanElement, IconProps>(
  ({ iconType = 'solid', icon, className, ...otherProps }: IconProps, ref) => {
    return (
      <span
        className={buildClassName(
          className,
          'jtjs-icon',
          getIconStyleText(iconType),
          `fa-${icon}`
        )}
        {...otherProps}
        ref={ref}
      />
    );
  }
);

function getIconStyleText(iconType: IconProps['iconType']): string {
  let iconStyleText = 'fa';
  switch (iconType) {
    case 'brand':
      iconStyleText += 'b';
      break;
    case 'regular':
      iconStyleText += 'r';
      break;
    case 'solid':
      iconStyleText += 's';
      break;
  }

  return iconStyleText;
}
