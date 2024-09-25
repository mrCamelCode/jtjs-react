import { ComponentPropsWithoutRef, ReactNode, useState } from 'react';
import { buildClassName } from '../../util/util-functions';
import { Flexbox, FlexboxProps } from '../wrappers/layout/Flexbox';

export type CarouselItemIteratee<T, U> = (item: T, isActiveItem: boolean, index: number) => U;

export interface CarouselProps<T> extends FlexboxProps {
  items: T[];
  /**
   * Determines how the item is rendered for the user to see.
   */
  renderItem: CarouselItemIteratee<T, ReactNode>;
  /**
   * Determines the key of the item
   */
  getItemKey: CarouselItemIteratee<T, string>;
  /**
   * The currently active item. Pass if you want to control the component.
   *
   * `null` can be used when there is no currently active item, but you'd still
   * like to control the component.
   */
  activeItem?: T | null;
  /**
   * The item that's active by default.
   *
   * This only has an effect when the component
   * is uncontrolled. If you want to control the component and have a default,
   * just set `activeItem`'s first value to the desired default.
   */
  defaultActiveItem?: T;
  /**
   * Callback for when the user attempts to change the active item.
   *
   * @param newItem - The item that should now be the active item, or null
   * if they're clearing the currently active item by selecting the currently
   * active item again.
   */
  onChangeActiveItem?: (newItem: T | null) => void;
  /**
   * A useful iteratee to have finer control over the props that get passed to
   * the containers that wrap each item in the carousel.
   *
   * @returns The props for the container that wraps each item in the carousel.
   */
  getItemContainerProps?: CarouselItemIteratee<T, ComponentPropsWithoutRef<'div'> | undefined>;
  /**
   * (Optional, defaults to a function that determines whether `item1 === item2`)
   * Allows you to customize how the carousel understands that two items are the same.
   * This function is how the carousel determines when the active item changes.
   *
   * This function can be useful if the items in your carousel are complex. For example,
   * you may want two objects to be equivalent if they have the same ID rather than
   * checking that they're the same reference.
   *
   * @param item1
   * @param item2
   *
   * @returns Whether the two items are equal.
   */
  areItemsEqual?: (item1: T, item2: T) => boolean;
}

/**
 * A generic container for a series of items. The carousel displays the provided
 * `items` horizontally, rendering according to the `renderItem` prop. By default,
 * horizontal overflow is handled automatically and the carousel has no wrapping.
 * If you want to control the maximum width of the carousel, consider passing `style`
 * or using CSS.
 *
 * The user may use their mouse (or use keyboard navigation and the Space/Enter keys) to select
 * items in the carousel. The `onChangeActiveItem` prop may be used to hook into the
 * active item changing.
 *
 * This component may be controlled or uncontrolled. Pass something other than `undefined` to
 * `activeItem` to control the component.
 *
 * The component resolves to a `Flexbox`, and each item is wrapped in a container
 * with the class `jtjs-carousel-item-container`. If the item is the currently-selected
 * item in the carousel, its container will additionally have the `jtjs-carousel-active-item`
 * class.
 */
export const Carousel = <T,>({
  className,
  style,
  items,
  activeItem,
  defaultActiveItem,
  renderItem,
  getItemKey,
  onChangeActiveItem,
  getItemContainerProps,
  areItemsEqual = (item1, item2) => item1 === item2,
  ...otherProps
}: CarouselProps<T>) => {
  const [internalValue, setInternalValue] = useState<typeof activeItem>(defaultActiveItem);

  const isControlled = activeItem !== undefined;

  const handleChangeActiveItem = (item: T | null) => {
    onChangeActiveItem?.(item);

    if (!isControlled) {
      setInternalValue(item);
    }
  };

  const getActiveItem = (): T | null | undefined => {
    return isControlled ? activeItem : internalValue;
  };

  return (
    <Flexbox
      className={buildClassName(className, 'jtjs-carousel')}
      direction="row"
      wrap={false}
      style={{
        overflowX: 'auto',
        width: '100%',
        ...style,
      }}
      {...otherProps}
    >
      {items.map((item, index) => {
        const activeItem = getActiveItem();
        const isActiveItem = !!activeItem && areItemsEqual(activeItem, item);

        const {
          className: containerClassName,
          style: containerStyle,
          onClick,
          onKeyDown,
          ...otherContainerProps
        } = getItemContainerProps?.(item, isActiveItem, index) ?? {};
        const key = getItemKey(item, isActiveItem, index);

        const handleActivateItem = () => {
          if (!!getActiveItem() && areItemsEqual(getActiveItem()!, item)) {
            handleChangeActiveItem(null);
          } else if (!getActiveItem() || !areItemsEqual(getActiveItem()!, item)) {
            handleChangeActiveItem(item);
          }
        };

        return (
          <div
            key={key}
            className={buildClassName(
              containerClassName,
              'jtjs-carousel-item-container',
              isActiveItem ? 'jtjs-carousel-active-item' : undefined
            )}
            style={{
              maxHeight: '100%',
              cursor: 'pointer',
              ...containerStyle,
            }}
            role="button"
            tabIndex={0}
            onClick={(event) => {
              onClick?.(event);

              handleActivateItem();
            }}
            onKeyDown={(event) => {
              onKeyDown?.(event);

              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();

                handleActivateItem();
              }
            }}
            aria-selected={isActiveItem}
            {...otherContainerProps}
          >
            {renderItem(item, isActiveItem, index)}
          </div>
        );
      })}
    </Flexbox>
  );
};
