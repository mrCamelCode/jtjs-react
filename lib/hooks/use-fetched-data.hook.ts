import { DependencyList, useEffect, useState } from 'react';
import { useIsMountedRef } from './use-is-mounted-ref.hook';

/**
 * A tuple containing, in order:
 *   1. Whether the `fetcher` is pending.
 *   1. The data returned from `fetcher`, or `undefined` if it hasn't run yet, or
 *   an error occurred during the initial invocation of `fetcher`.
 *   1. The latest error that occurred while trying to call `fetcher`, if any.
 */
export type UseFetchDataResult<T> = [boolean, T | undefined, Error | undefined];

/**
 * Allows you to safely fetch data asynchronously. Tracks whether the call is out, the
 * data that was returned, and any error that occurred while trying to perform the task.
 *
 * This hook ensures that only the call from the latest call of the `fetcher` is used. This
 * avoids race conditions caused by responses coming back out of order. Any stale responses
 * are ignored.
 * 
 * While not required, it's recommended you use this hook alongside some kind of API client
 * that manages the actual network calls. That keeps data fetching logic out of your view
 * and gives you a logical place to implement any caching (should you want it).
 *
 * @param fetcher - The async function to invoke to retrieve the data.
 * @param deps - Any information `fetcher` depends on. Similarly to the `useEffect`
 * hook, you should list any reactive values you use in the body of the `fetcher`
 * function as dependencies. If any of the dependencies change between
 * renders, the `fetcher` will be re-invoked with the new values. Keep this in mind
 * if you're providing object deps. In that situation, you may want to use objects
 * with stable references or find a way to use primitives.
 *
 * @returns Whether the data fetch is pending, the current fetched data, and the error if there was one
 * on the last call.
 * 
 * @example
 * ```tsx
 * interface Blog {
 *   text: string;
 * }
 * class BlogApi {
 *   getBlog(blogId: string): Promise<Blog> {
       return Promise.resolve({ text: 'hello world!' });
 *   }
 * }
 * 
 * const blogApi = new BlogApi();
 * 
 * const BlogPage = ({ blogId }: { blogId: string }) => {
 *   const [isBlogLoading, blog, loadBlogError] = useFetchedData(() => blogApi.getBlog(blogId), [blogId]);
 * 
 *   // Note that when `isBlogLoading` would be `false`, either `blog` or `loadBlogError` could
 *   // be populated, based on whether the provided `fetcher` encountered an error.
 *   return <p>{isBlogLoading ? 'Loading...' : blog?.text}</p>
 * }
 * ```
 */
export function useFetchedData<T>(fetcher: () => Promise<T>, deps: DependencyList): UseFetchDataResult<T> {
  const isMountedRef = useIsMountedRef();

  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const doFetch = async () => {
      setIsPending(true);
      setError(undefined);

      try {
        const fetchedData = await fetcher();

        if (!ignore && isMountedRef.current) {
          setData(fetchedData);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setError(error instanceof Error ? error : new Error(`${error}`));
        }
      } finally {
        if (isMountedRef.current) {
          setIsPending(false);
        }
      }
    };

    let ignore = false;
    doFetch();

    return () => {
      ignore = true;
    };
  }, deps);

  return [isPending, data, error];
}
