import { ComponentPropsWithRef, MouseEvent, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { buildClassName } from '../../util/util-functions';

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  /**
   * (Optional, defaults to `false`) Whether the position of the mouse is tracked when it's over the button.
   * This can be useful in creating effects with the background of the button that are based on the mouse
   * position, but could be expensive if you have a lot of other things going on in your app.
   *
   * If you want to use the mouse position yourself, the current position of the mouse can be tracked in the CSS
   * as variables scoped to the button. The variables are `--jtjs-mouse-pos-x` and `--jtjs-mouse-pos-y`.
   */
  enableMouseTracking?: boolean;
  /**
   * What to do when the position of the mouse changes while hovering over the button. Only triggered when
   * `enableMouseTracking` is `true`.
   *
   * @param mousePosition - The current mouse position, relative to the bounding box of the button. Coordinates of (-1, -1)
   * imply that the mouse is no longer over the button.
   */
  onChangeMousePosition?: (mousePosition: { x: number; y: number }) => void;
}

/**
 * A wrapper for the base button component.
 *
 * The `type` prop is set to "button" by default, but can be overridden. This is to avoid having buttons
 * work unexpectedly as submit buttons when you use them in a form.
 */
export const Button = ({
  ref,
  className,
  onMouseMove,
  onChangeMousePosition,
  enableMouseTracking = false,
  ...otherProps
}: ButtonProps) => {
  const internalRef = useRef<HTMLButtonElement>(null);

  useImperativeHandle(ref, () => internalRef.current as HTMLButtonElement);

  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: -1,
    y: -1,
  });

  const handleTrackMouse = (event: MouseEvent): void => {
    if (enableMouseTracking) {
      const rect = event.currentTarget.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const newPos = {
        x,
        y,
      };

      setMousePos(newPos);

      onChangeMousePosition?.({
        ...newPos,
      });
    }
  };

  useEffect(() => {
    const el = internalRef?.current;

    if (el) {
      el.style.setProperty(`--jtjs-mouse-pos-x`, Math.round(mousePos.x).toString());
      el.style.setProperty(`--jtjs-mouse-pos-y`, Math.round(mousePos.y).toString());
    }
  }, [mousePos]);

  return (
    <button
      className={buildClassName(className, 'jtjs-button', enableMouseTracking ? '' : 'jtjs-disable-mouse-effects')}
      type="button"
      onMouseMove={(event) => {
        handleTrackMouse(event);
        onMouseMove?.(event);
      }}
      {...otherProps}
      ref={internalRef}
    />
  );
};
