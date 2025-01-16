import { ComponentPropsWithRef, ReactNode } from 'react';
import { buildClassName } from '../../../util/util-functions';
import { InlineText } from '../../text';
import { LoadIndicator } from './LoadIndicator';

export interface LoadViewProps extends ComponentPropsWithRef<'div'> {
  /**
   * Whether the content of the load view is loading. When `true`, the `LoadIndicator` component will be
   * shown to the user (if no `loadingComponent` is provided). When `false`, the children of the view
   * will be displayed as-is.
   */
  isLoading: boolean;
  /**
   * (Optional, defaults to `LoadIndicator`) What to show to the user when the view is loading.
   */
  loadingComponent?: ReactNode;
  /**
   * (Optional, defaults to `false`) Whether to use a simple load indicator that's just an {@link InlineText} that says
   * `Loading...`. This option can be useful if you're not using `@jtjs/theme` since the default {@link LoadIndicator}
   * used by the `LoadView` has no appearance without styling (be it from `@jtjs/theme` or your own custom styling).
   *
   * If this is `true`, it will supersede anything passed to `loadingComponent`.
   *
   * @example
   * ```tsx
   * // Will display: Loading...
   * <LoadView useSimpleLoadIndicator isLoading />
   *
   * // Will display: Loading...
   * <LoadView useSimpleLoadIndicator loadingComponent={<MyVeryCoolAndIntricateLoadingIndicator />} />
   *
   * // Will display nothing unless you're either using `@jtjs/theme` or you have your own styling for the LoadIndicator's
   * // resolved HTML.
   * <LoadView isLoading />
   * ```
   */
  useSimpleLoadIndicator?: boolean;
}

/**
 * A wrapper that will show its content based on its `isLoading` prop.
 */
export const LoadView = ({
  ref,
  isLoading,
  children,
  className,
  loadingComponent = <LoadIndicator />,
  useSimpleLoadIndicator = false,
  ...otherProps
}: LoadViewProps) => {
  const getLoadIndicator = (): ReactNode => {
    return useSimpleLoadIndicator ? <SimpleLoadIndicator /> : loadingComponent;
  };

  return (
    <div className={buildClassName(className, 'jtjs-load-view')} {...otherProps} ref={ref}>
      {isLoading ? getLoadIndicator() : children}
    </div>
  );
};

const SimpleLoadIndicator = () => <InlineText>Loading...</InlineText>;
