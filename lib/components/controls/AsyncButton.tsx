import { useState } from 'react';
import { useIsMountedRef } from '../../hooks/use-is-mounted-ref.hook';
import { buildClassName } from '../../util/util-functions';
import { Button, ButtonProps } from './Button';

export interface AsyncButtonProps extends ButtonProps {
  /**
   * Whether the async button should behave as though it's performing its async task. This will be used in conjunction
   * with any async `onClick` and the button will show as performing its async task if an `onClick` handler is running
   * or this is `true`.
   */
  isPerformingAsyncTask?: boolean;
}

/**
 * A specialized button that assumes that its `onClick` handler is async and will wait for it to finish. While waiting,
 * the button is disabled.
 *
 * While the async task is running, the button will have the `jtjs-async-button-working` class attached to it if you'd
 * like to assign special styles for that state.
 */
export const AsyncButton = ({
  ref,
  className,
  onClick,
  isPerformingAsyncTask = false,
  disabled,
  ...otherProps
}: AsyncButtonProps) => {
  const isMountedRef = useIsMountedRef();

  const [isPerformingAsyncOnClick, setIsPerformingAsyncOnClick] = useState(false);

  const handleClick: AsyncButtonProps['onClick'] = async (...args) => {
    try {
      setIsPerformingAsyncOnClick(true);

      await onClick?.(...args);
    } catch (error) {
      throw error;
    } finally {
      if (isMountedRef.current) {
        setIsPerformingAsyncOnClick(false);
      }
    }
  };

  const isWorking = isPerformingAsyncOnClick || isPerformingAsyncTask;

  return (
    <Button
      className={buildClassName(className, 'jtjs-async-button', isWorking ? 'jtjs-async-button-working' : undefined)}
      disabled={isWorking || disabled}
      onClick={handleClick}
      {...otherProps}
      ref={ref}
    />
  );
};
