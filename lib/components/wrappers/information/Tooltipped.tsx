import {
  ComponentPropsWithoutRef,
  createElement,
  useEffect,
  useId,
  useState,
} from 'react';
import { useIsMountedRef } from '../../../hooks/use-is-mounted-ref.hook';
import { buildClassName } from '../../../util';
import { Tooltip } from './Tooltip';

interface Position {
  x: number;
  y: number;
}

export interface TooltippedProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * The text to display for the tooltip.
   */
  tooltip: string;
  /**
   * (Optional, defaults to `false`) Whether the container for the wrapper uses an inline element
   * (span). This can be used for easy shorthand when you wrap an inline element with a tooltip, or
   * when this wrapper appears in an element where `div` is not a valid child, since by default
   * the wrapper is implemented with a `div`.
   *
   * Note that setting this to `true` changes the wrapper from a `div` to a `span`. If you set this to `true`,
   * ensure you're wrapping only elements that can exist in a `span`.
   */
  inline?: boolean;
  /**
   * (Optional, defaults to `500`) The number of milliseconds that must pass
   * before the tooltip appears.
   */
  showDelayMs?: number;
  /**
   * (Optional, defaults to `250`) The number of milliseconds that must pass
   * before the tooltip disappears. Note, it is recommended that you *DON'T*
   * make this less than 250. The delay exists partially to allow the user time to hover
   * over the tooltip to keep it alive. The tooltip remaining visible when
   * the tooltip itself is hovered is a requirement according to the Mozilla
   * accessibility guidelines for tooltips.
   */
  hideDelayMs?: number;
  /**
   * (Optional, defaults to `false`) Whether the wrapper for the tooltip can be
   * focused. You should disable wrapper focus when the element you're giving a
   * tooltip to can receive focus on its own. Since the inner element can receive
   * focus, allowing the wrapper to have focus serves no purpose, but it makes
   * keyboard navigation more difficult.
   */
  disableWrapperFocus?: boolean;
}

const defaultPosition: Position = {
  x: 0,
  y: 0,
};

const tooltipOffset: Position = {
  x: 15,
  y: 15,
};

/**
 * Displays a tooltip when the wrapper is hovered or receives focus. To be accessible,
 * the guidelines outlined [here](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tooltip_role)
 * were followed as closely as possible.
 *
 * This is a wrapper, and you should be aware of what you're wrapping and what the wrapper is in. See
 * the `inline` prop for more information on possible tweaks you may have to make to avoid invalid markup.
 */
export const Tooltipped = ({
  tooltip,
  showDelayMs = 500,
  hideDelayMs = 250,
  disableWrapperFocus = false,
  inline = false,
  className,
  children,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  onFocus,
  onBlur,
  ...otherProps
}: TooltippedProps) => {
  const isMountedRef = useIsMountedRef();

  const [showTimeout, setShowTimeout] = useState<
    ReturnType<typeof setTimeout> | undefined
  >();
  const [hideTimeout, setHideTimeout] =
    useState<ReturnType<typeof setTimeout>>();
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState<Position>(defaultPosition);

  const tooltipId = `jtjs-tooltip-${useId()}`;

  const isTooltipPreparingToShow = !isTooltipVisible && showTimeout;

  useEffect(() => {
    // Can press Escape to close the tooltip, per Mozilla's docs on how a tooltip
    // should behave.
    const pressEscapeToCloseTooltip = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsTooltipVisible(false);
      }
    };

    document.addEventListener('keydown', pressEscapeToCloseTooltip);

    return () => {
      document.removeEventListener('keydown', pressEscapeToCloseTooltip);
    };
  }, []);

  const prepareToShowTooltip = () => {
    clearTimeout(showTimeout);
    clearTimeout(hideTimeout);

    setShowTimeout(
      setTimeout(() => {
        if (isMountedRef.current) {
          setIsTooltipVisible(true);
          setShowTimeout(undefined);
        }
      }, showDelayMs)
    );
  };

  /*
   * According to the Mozilla docs for accessibility, the tooltip should remain visible
   * so long as the owner (in our case, the wrapper) or the tooltip itself is hovered.
   * Getting the tooltip to catch mouse events but not block the thing it's a tooltip for
   * is a real pain, so we delay the tooltip hide so the user could have a reasonable amount
   * of time to move their mouse over the tooltip itself. Since the tooltip is within the
   * container, the normal mouse events attached to the container will still trigger and will
   * keep the tooltip alive.
   */
  const prepareToHideTooltip = () => {
    clearTimeout(showTimeout);
    clearTimeout(hideTimeout);

    setHideTimeout(
      setTimeout(() => {
        if (isMountedRef.current) {
          setHideTimeout(undefined);
          setIsTooltipVisible(false);
          setMousePosition(defaultPosition);
        }
      }, hideDelayMs)
    );
  };

  const handleMouseEnter: TooltippedProps['onMouseEnter'] = (event) => {
    prepareToShowTooltip();

    // Setting here allows the mouse position to be correct if the mouse entered
    // the element without moving (like by scrolling the page such that the mouse
    // slides to be over the element).
    if (!isTooltipVisible) {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    }

    onMouseEnter?.(event);
  };

  const handleMouseLeave: TooltippedProps['onMouseLeave'] = (event) => {
    prepareToHideTooltip();

    onMouseLeave?.(event);
  };

  const handleMouseMove: TooltippedProps['onMouseMove'] = (event) => {
    if (isTooltipPreparingToShow) {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    }

    onMouseMove?.(event);
  };

  const handleFocus: TooltippedProps['onFocus'] = (event) => {
    prepareToShowTooltip();

    if (!isTooltipVisible) {
      const containerRect = event.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: containerRect.x,
        y: containerRect.y,
      });
    }

    onFocus?.(event);
  };

  const handleBlur: TooltippedProps['onBlur'] = (event) => {
    prepareToHideTooltip();

    onBlur?.(event);
  };

  const wrapperProps = {
    className: buildClassName(className, 'jtjs-tooltip-container'),
    onMouseEnter: handleMouseEnter,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onFocus: handleFocus,
    onBlur: handleBlur,
    tabIndex: disableWrapperFocus ? -1 : 0,
    'data-testid': 'tooltip-container',
    ...otherProps,
    'aria-describedby': tooltipId,
  };

  return createElement(inline ? 'span' : 'div', wrapperProps, [
    children,
    <Tooltip
      id={tooltipId}
      style={{
        margin: `${tooltipOffset.y}px ${tooltipOffset.x}px`,
        maxWidth: '25rem',
        opacity: isTooltipVisible ? '1' : '0',
        visibility: isTooltipVisible ? 'visible' : 'hidden',
        position: 'fixed',
        zIndex: '99',
        left: mousePosition.x,
        top: mousePosition.y,
      }}
      aria-hidden={!isTooltipVisible}
      key={1}
    >
      {tooltip}
    </Tooltip>,
  ]);
};
