import { ActivityState, UserActivityService } from '@jtjs/browser';
import { useEffect, useState } from 'react';

/**
 * Hook that gets updated whenever the user's activity state changes from being inactive
 * to active or vice versa. To configure options for user inactivity, see {@link UserActivityService}
 *
 * @returns Whether the user is currently active.
 */
export function useUserActive() {
  const [isUserActive, setIsUserActive] = useState(
    UserActivityService.activityState === ActivityState.ACTIVE
  );

  useEffect(() => {
    const listener = UserActivityService.onChangeActivityState.subscribe(
      (newState) => {
        setIsUserActive(newState === ActivityState.ACTIVE);
      }
    );

    return () => {
      UserActivityService.onChangeActivityState.unsubscribe(listener);
    };
  }, []);

  return isUserActive;
}
