import { ComponentPropsWithRef } from 'react';
import { buildClassName } from '../../util';

export interface LinkProps extends ComponentPropsWithRef<'a'> {
  /**
   * (Optional, defaults to `false`) Whether the link is external. An external
   * link will be accompanied by a small icon if using JTJS' styling.
   *
   * Will also request that the browser open the link in a new tab. This can be
   * disabled with `disableExternalNewTab`.
   */
  external?: boolean;
  /**
   * (Optional, defaults to `false`) Whether the feature of opening links marked
   * `external` in a new tab should be disabled.
   */
  disableExternalNewTab?: boolean;
}

export const Link = ({ ref, className, external = false, disableExternalNewTab = false, ...otherProps }: LinkProps) => {
  return (
    <a
      className={buildClassName(className, 'jtjs-link', external ? 'jtjs-link-external' : '')}
      {...(external && !disableExternalNewTab
        ? {
            target: '_blank',
          }
        : {})}
      {...otherProps}
      ref={ref}
    />
  );
};
