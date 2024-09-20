import { ReactNode, useState } from 'react';
import { buildClassName } from '../../util';
import { Flexbox, FlexboxProps } from '../wrappers';

export interface CarouselWithFullViewProps<T> extends FlexboxProps {
  items: T[];
  renderFullView: (item: T) => ReactNode;
  renderPreview: (item: T, index: number) => ReactNode;
  activeItem?: T;
  defaultActiveItem?: T;
  onChangeActiveItem?: (newItem: T) => void;
  fullViewAreaProps?: FlexboxProps;
  previewsAreaProps?: FlexboxProps;
}

export const CarouselWithFullView = <T,>({
  className,
  items,
  activeItem,
  defaultActiveItem = items[0],
  renderFullView,
  renderPreview,
  onChangeActiveItem,
  fullViewAreaProps: {
    className: fullViewAreaClassName,
    ...otherPreviewAreaProps
  } = {},
  previewsAreaProps: {
    className: previewsAreaClassName,
    ...otherCarouselAreaProps
  } = {},
  ...otherProps
}: CarouselWithFullViewProps<T>) => {
  const [internalValue, setInternalValue] =
    useState<typeof activeItem>(defaultActiveItem);

  const isControlled = activeItem !== undefined;

  const handleChangeActiveItem = (item: T) => {
    if (item !== activeItem) {
      onChangeActiveItem?.(item);

      if (!isControlled) {
        setInternalValue(item);
      }
    }
  };

  const getActiveItem = (): T | undefined => {
    return isControlled ? activeItem : internalValue;
  };

  return (
    <Flexbox
      className={buildClassName(className, 'jtjs-carousel-with-full-view')}
      {...otherProps}
    >
      <Flexbox
        className={buildClassName(
          fullViewAreaClassName,
          'jtjs-carousel-full-view-area'
        )}
        {...otherPreviewAreaProps}
      >
        {!!getActiveItem() && renderFullView(getActiveItem()!)}
      </Flexbox>

      <Flexbox
        className={buildClassName(
          previewsAreaClassName,
          'jtjs-carousel-previews-area'
        )}
        {...otherCarouselAreaProps}
      >
        {items.map((item) => {
          return <Flexbox className="jtjs-carousel-preview-container">

          </Flexbox>
        })}
      </Flexbox>
    </Flexbox>
  );
};
