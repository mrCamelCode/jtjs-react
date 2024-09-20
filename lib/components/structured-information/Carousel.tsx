import { ComponentPropsWithoutRef, ReactNode, useState } from 'react';
import { buildClassName } from '../../util';
import { Flexbox, FlexboxProps } from '../wrappers';

export interface CarouselProps<T> extends FlexboxProps {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  getItemKey: (item: T, index: number) => string;
  activeItem?: T;
  defaultActiveItem?: T;
  onChangeActiveItem?: (newItem: T) => void;
  getItemContainerProps?: (
    item: T,
    index: number
  ) => ComponentPropsWithoutRef<'div'> | undefined;
  areItemsEqual?: (item1: T, item2: T) => boolean;
}

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
  const [internalValue, setInternalValue] =
    useState<typeof activeItem>(defaultActiveItem);

  const isControlled = activeItem !== undefined;

  const handleChangeActiveItem = (item: T) => {
    onChangeActiveItem?.(item);

    if (!isControlled) {
      setInternalValue(item);
    }
  };

  const getActiveItem = (): T | undefined => {
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
        const {
          className: containerClassName,
          style: containerStyle,
          onClick,
          onKeyDown,
          ...otherContainerProps
        } = getItemContainerProps?.(item, index) ?? {};
        const key = getItemKey(item, index);

        const activeItem = getActiveItem();
        const isActiveItem = !!activeItem && areItemsEqual(activeItem, item);

        const handleActivateItem = () => {
          if (!getActiveItem() || !areItemsEqual(getActiveItem()!, item)) {
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
                handleActivateItem();
              }
            }}
            {...otherContainerProps}
          >
            {renderItem(item, index)}
          </div>
        );
      })}
    </Flexbox>
  );
};
