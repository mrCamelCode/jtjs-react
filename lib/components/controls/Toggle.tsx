import { ComponentPropsWithRef, KeyboardEvent, MouseEvent, useState } from 'react';
import { buildClassName } from '../../util/util-functions';

type UserInteractionEvent = MouseEvent<HTMLSpanElement> | KeyboardEvent<HTMLSpanElement>;

export interface ToggleProps extends Omit<ComponentPropsWithRef<'span'>, 'children' | 'onToggle'> {
  defaultIsOn?: boolean;
  /**
   * Whether the toggle is currently on.
   */
  isOn?: boolean;
  /**
   * Handler for when the user tries to change whether the toggle is on.
   *
   * @param isOn - The state the user is trying to put the toggle in.
   * @param event - The original simulated event. If the user interaced with the
   * toggle via a click, this will be a MouseEvent. If the user interacted with
   * the toggle via the keyboard, this will be a KeyboardEvent.
   */
  onToggle?: (isOn: boolean, event: UserInteractionEvent) => void;
  /**
   * Whether the toggle is disabled.
   */
  disabled?: boolean;
}

/**
 * A control that can be interacted with to switch between being on and off.
 *
 * Can be controlled or uncontrolled. If you intend to control the component, you must provide
 * a `isOn` that's not `undefined` and it must be a `boolean`.
 *
 * Note that because a Toggle has no backing element in HTML, you must style this element for it
 * to have any appearance. `@jtjs/theme` library contains default styling for Toggles you can
 * use as a base.
 *
 * If you'd like to style the component yourself, the structure of the resolved markup is:
 * ```
 * .jtjs-toggle.jtjs-toggle-{on/off}
 *   .jtjs-toggle-knob
 * ```
 */
export const Toggle = ({ ref, className, isOn, onToggle, disabled, defaultIsOn, ...otherProps }: ToggleProps) => {
  const [internalValue, setInternalValue] = useState(defaultIsOn ?? false);

  const isControlled = isOn !== undefined;

  const getIsOn = () => {
    return isControlled ? isOn : internalValue;
  };

  const onText = getIsOn() ? 'on' : 'off';

  const handleToggle: ToggleProps['onToggle'] = (newIsOn, event) => {
    if (!disabled) {
      onToggle?.(newIsOn, event);

      if (!isControlled) {
        setInternalValue(newIsOn);
      }
    }
  };

  return (
    <span
      data-testid="toggle"
      role="switch"
      aria-label={`toggle-${onText}`}
      aria-checked={getIsOn()}
      aria-disabled={disabled}
      {...{
        disabled,
      }}
      className={buildClassName(className, 'jtjs-toggle', `jtjs-toggle-${onText}`)}
      onClick={(event) => {
        handleToggle(!getIsOn(), event);
      }}
      // Allows the user to navigate to the toggle with the keyboard and press
      // space to interact with it.
      // Note: You can't focus normal inputs when they're disabled
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(event) => {
        if (event.key === ' ') {
          event.preventDefault();
          handleToggle(!getIsOn(), event);
        }
      }}
      {...otherProps}
      ref={ref}
    >
      {!disabled && (
        <span
          className="jtjs-toggle-knob"
          style={{
            position: 'absolute',
          }}
        />
      )}
    </span>
  );
};
