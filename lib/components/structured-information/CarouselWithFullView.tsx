import { ReactNode, useState } from 'react';
import { buildClassName } from '../../util/util-functions';
import { Flexbox, FlexboxProps } from '../wrappers/layout/Flexbox';
import { Carousel, CarouselProps } from './Carousel';

export interface CarouselWithFullViewProps<T> extends CarouselProps<T> {
  renderFullView: (item: T) => ReactNode;
  /**
   * Allows you to render something when there's no active item. If this
   * isn't specified, nothing is rendered.
   *
   * @returns The element to render when there's no active item.
   */
  renderPlaceholderFullView?: () => ReactNode;
  containerProps?: FlexboxProps;
  fullViewAreaProps?: FlexboxProps;
}

/**
 * A variant of the {@link Carousel} that additionally has an area
 * where the active item displays in a full view.
 *
 * For example, in the case of an image carousel, you may produce a
 * small thumbnail image for `renderItem`. For `renderFullView` you
 * may produce a larger version of the image.
 *
 * The component resolves to a `Flexbox` that has a container
 * within it (with the `jtjs-carousel-full-view-area` class). Below that
 * is a {@link Carousel}.
 *
 * Because this component is logically a composed extension of a {@link Carousel},
 * all props go to the underlying carousel. If you want to pass props to the
 * outermost container, you can use the `containerProps` prop. If you want to pass
 * props to the container for the full view, you can use the `fullViewAreaProps` prop.
 */
export const CarouselWithFullView = <T,>({
  items,
  renderFullView,
  activeItem,
  defaultActiveItem,
  onChangeActiveItem,
  renderPlaceholderFullView,
  containerProps: { className: containerClassName, ...otherContainerProps } = {},
  fullViewAreaProps: { className: fullViewAreaClassName, style: fullViewAreaStyle, ...otherFullViewAreaProps } = {},
  ...otherProps
}: CarouselWithFullViewProps<T>) => {
  const [internalValue, setInternalValue] = useState<typeof activeItem>(defaultActiveItem);

  const isControlled = activeItem !== undefined;

  const getActiveItem = (): T | null | undefined => {
    return isControlled ? activeItem : internalValue;
  };

  const handleChangeActiveItem: CarouselProps<T>['onChangeActiveItem'] = (item) => {
    if (item !== getActiveItem()) {
      onChangeActiveItem?.(item);

      if (!isControlled) {
        setInternalValue(item);
      }
    }
  };

  const getFullViewItem = () => {
    if (!!getActiveItem()) {
      return getActiveItem();
    }

    return undefined;
  };

  return (
    <Flexbox
      className={buildClassName(containerClassName, 'jtjs-carousel-with-full-view')}
      direction="column"
      {...otherContainerProps}
    >
      <Flexbox
        className={buildClassName(fullViewAreaClassName, 'jtjs-carousel-full-view-area')}
        style={{
          width: '100%',
          ...fullViewAreaStyle,
        }}
        {...otherFullViewAreaProps}
      >
        {!!getFullViewItem() ? renderFullView(getFullViewItem()!) : renderPlaceholderFullView?.()}
      </Flexbox>

      <Carousel
        items={items}
        activeItem={activeItem}
        defaultActiveItem={defaultActiveItem}
        onChangeActiveItem={handleChangeActiveItem}
        {...otherProps}
      />
    </Flexbox>
  );
};
