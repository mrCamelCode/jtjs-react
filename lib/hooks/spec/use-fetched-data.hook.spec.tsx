import { cleanup, render, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { useFetchedData } from '../use-fetched-data.hook';

const testData = { data: 1, something: 'else' };

const fetchData = vi.fn(() => {
  return Promise.resolve(testData);
});

const errorFetch = vi.fn(() => {
  return Promise.reject('boom!');
});

const flushTestPromises = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1));
};

describe('useFetchedData', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  test('invokes the provided fetcher', async () => {
    renderHook(() => useFetchedData(fetchData, []));

    expect(fetchData).toHaveBeenCalled();
  });
  test('stale fetches are ignored', async () => {
    const fetchId = vi.fn((id) => Promise.resolve(id));

    const TestComponent = ({ id }: { id: string }) => {
      const [, data] = useFetchedData(() => fetchId(id), [id]);

      return <p>{data ?? 'empty'}</p>;
    };

    const { rerender, queryByText } = render(<TestComponent id="123" />);

    expect(fetchId).toHaveBeenLastCalledWith('123');
    expect(queryByText('empty')).not.toBeNull();

    rerender(<TestComponent id="321" />);

    await flushTestPromises();

    expect(fetchId).toHaveBeenLastCalledWith('321');
    expect(queryByText('321')).not.toBeNull();
  });

  describe('isPending', () => {
    test('initially true', async () => {
      const { result } = renderHook(() => useFetchedData(fetchData, []));
      const [isPending] = result.current;

      expect(isPending).toBe(true);
    });
    test('true while the fetcher call is out', async () => {
      const { result } = renderHook(() => useFetchedData(fetchData, []));
      const [isPending] = result.current;

      expect(fetchData).toHaveBeenCalled();
      expect(isPending).toBe(true);
    });
    test('false after the fetcher call finishes', async () => {
      const { result } = renderHook(() => useFetchedData(fetchData, []));
      const [isPending] = result.current;

      expect(fetchData).toHaveBeenCalled();
      expect(isPending).toBe(true);

      await flushTestPromises();

      const [newIsPending] = result.current;

      expect(newIsPending).toBe(false);
    });
    test('false if there was an error in the fetcher', async () => {
      const { result } = renderHook(() => useFetchedData(errorFetch, []));
      const [isPending, data, error] = result.current;

      expect(errorFetch).toHaveBeenCalled();
      expect(isPending).toBe(true);

      await flushTestPromises();

      const [newIsPending] = result.current;

      expect(newIsPending).toBe(false);
    });
  });
  describe('data', () => {
    test('undefined on initial render', async () => {
      const { result } = renderHook(() => useFetchedData(fetchData, []));
      const [, data] = result.current;

      expect(data).toBeUndefined();
    });
    test('has the value returned by the fetcher after it runs', async () => {
      const { result } = renderHook(() => useFetchedData(fetchData, []));
      const [, data] = result.current;

      expect(data).toBeUndefined();
      expect(fetchData).toHaveBeenCalled();

      await flushTestPromises();

      const [, newData] = result.current;

      expect(newData).toEqual(testData);
    });
  });
  describe('error', () => {
    test("undefined when there's no error during the fetcher call", async () => {
      const { result } = renderHook(() => useFetchedData(fetchData, []));
      const [, , error] = result.current;

      expect(fetchData).toHaveBeenCalled();
      expect(error).toBeUndefined();

      await flushTestPromises();

      const [, , newError] = result.current;

      expect(newError).toBeUndefined();
    });
    test('has the error when fetcher yields an error', async () => {
      const { result } = renderHook(() => useFetchedData(errorFetch, []));
      const [, , error] = result.current;

      expect(errorFetch).toHaveBeenCalled();
      expect(error).toBeUndefined();

      await flushTestPromises();

      const [, , newError] = result.current;

      expect(newError).toEqual(new Error('boom!'));
    });
    test('clears the error when the fetch has to rerun', async () => {
      const TestComponent = ({ id }: { id: string }) => {
        const [, , error] = useFetchedData(errorFetch, [id]);

        return <p>{error ? 'error' : 'clean'}</p>;
      };

      const { rerender, queryByText } = render(<TestComponent id="123" />);

      expect(queryByText('clean')).not.toBeNull();

      await flushTestPromises();
      expect(queryByText('error')).not.toBeNull();

      rerender(<TestComponent id="321" />);
      expect(queryByText('clean')).not.toBeNull();
    });
  });
});
