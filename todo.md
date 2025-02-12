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

- Popover API for tooltips?

- Implement `Toggle` as a checkbox: https://github.com/mdn/learning-area/blob/main/html/forms/toggle-switch-example/index.html
  - Doesn't require styling to appear
  - Uses HTML that's more semantically correct for its purpose.
