import { useEffect, useRef } from 'react';

/**
 * Hooks into whether component is currently mounted. Useful for controlling when you call state
 * setters during async operations.
 * 
 * @returns A ref where the `current` value indicates whether the component is currently mounted.
 * 
 * @example
 * ```javascriptreact
 *  const Component = () => {
 *    const [myState, setMyState] = useState('');
 * 
 *    const isMountedRef = useIsMountedRef();
 * 
 *    useEffect(() => {
 *      // Initial load from DB.
 *      const loadFromDb = async () => {
 *        const data = await MyApiService.getInitialData();
 * 
 *        if (isMountedRef.current) {
 *          // Avoid setting state in the event the component was unmounted while the call to load was out.
 *          setMyState(data);
 *        }
 *      };
 * 
 *      loadFromDb();
 *    }, []);
 *  }
 * ```
 */
export function useIsMountedRef() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  });

  return isMounted;
}
