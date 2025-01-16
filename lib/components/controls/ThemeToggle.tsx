import { KeyboardEvent, MouseEvent, useState } from 'react';
import { buildClassName } from '../../util';
import { Toggle, ToggleProps } from './Toggle';

type UserInteractionEvent = MouseEvent<HTMLSpanElement> | KeyboardEvent<HTMLSpanElement>;

export enum ThemeMode {
  Light,
  Dark,
}

export interface ThemeToggleProps extends Omit<ToggleProps, 'onToggle' | 'isOn'> {
  onToggle?: (themeMode: ThemeMode, event: UserInteractionEvent) => void;
  mode?: ThemeMode;
}

/**
 * A specialty control for toggling between two theme selections (light and dark).
 *
 * Can be controlled or uncontrolled. If you intend to control the component, you must provide
 * a `mode` that's not `undefined` and it must be a {@link ThemeMode}.
 */
export const ThemeToggle = ({ ref, className, onToggle, mode, ...otherProps }: ThemeToggleProps) => {
  const [internalValue, setInternalValue] = useState(ThemeMode.Light);

  const isControlled = mode !== undefined;

  const handleToggle: ToggleProps['onToggle'] = (isOn, event) => {
    const value = isOn ? ThemeMode.Light : ThemeMode.Dark;

    onToggle?.(value, event);

    if (!isControlled) {
      setInternalValue(value);
    }
  };

  return (
    <Toggle
      className={buildClassName(className, 'jtjs-theme-toggle')}
      onToggle={handleToggle}
      isOn={isControlled ? mode === ThemeMode.Light : internalValue === ThemeMode.Light}
      {...otherProps}
      ref={ref}
    />
  );
};
