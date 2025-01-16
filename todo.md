- Add a "Skip to Main Content" link component.
  - Should have a prop for `visuallyHidden` that performs proper visual hiding for when you don't want it to be visible.
    ```css
    .hidden {
      position: absolute;
      clip: 1px, 1px, 1px, 1px;
    }
    ```
  - Should wrap an `a` so the consumer can provide an `href` to point to their main content.

- Add stuff to simplify drag 'n' drop.

- Add a hook like `useFetchData` or something like that that facilitates getting data from an async source and addresses common pitfalls automatically (like race conditions involved with multiple requests being out at the same time).

- Popover API for tooltips?

- Update to React 19.
  - Reevaluate uses of `useEffect`.
  - See if new hooks like `useTransition` would have good use cases in the codebase.