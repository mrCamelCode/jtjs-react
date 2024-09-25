import { ComponentPropsWithoutRef } from 'react';

import { buildClassName } from '../../util/util-functions';
import { Contentbox } from '../wrappers/layout/Contentbox';
import { Flexbox } from '../wrappers/layout/Flexbox';
import { CarouselWithFullView, CarouselWithFullViewProps } from './CarouselWithFullView';

export type ImageCarouselItemType = ComponentPropsWithoutRef<'img'> & {
  src: string;
};

export interface ImageCarouselWithFullViewProps
  extends Omit<CarouselWithFullViewProps<ImageCarouselItemType>, 'renderItem' | 'getItemKey' | 'renderFullView'> {
  /**
   * (Optional, defaults to 20rem) Convenience that controls the height of the preview and its container
   * to make sure the image preview doesn't exceed
   * a certain height.
   */
  height?: string;
  renderItem?: CarouselWithFullViewProps<ImageCarouselItemType>['renderItem'];
  getItemKey?: CarouselWithFullViewProps<ImageCarouselItemType>['getItemKey'];
  renderFullView?: CarouselWithFullViewProps<ImageCarouselItemType>['renderFullView'];
}

/**
 * A variant of the {@link CarouselWithFullView} intended to display images.
 *
 * Accepts an array of image props where the `src` is required (and the `alt` is highly recommended)
 * for its `items`. The `src` should be unique among its siblings; you shouldn't have the same image
 * included in the carousel more than once, as the `src` is the default for generating
 * the keys. Should you find yourself in a situation where you must list the same image multiple
 * times, pass your own `getItemKey` prop to generate unique and stable keys for your
 * data set.
 *
 * The component displays small, thumbnail
 * versions of the images in a carousel. The full view defaults to a larger view
 * of the image. The placeholder for the full view defaults to a `filled` {@link Contentbox}.
 *
 * All defaults may be overridden by passing your own props.
 *
 * Because images are wont to be of many different sizes, `height`
 * is available as a prop to easily manage controlling the area the image carousel takes
 * up. The input and carousel will take up 100% of the width they have available.
 *
 * When an image is in full view, it will be centered in the available
 * space, as the aspect ratio of the image is respected by default.
 * This approach prevents the jarring experience of varying sizes of images causing the
 * page to resize constantly by ensuring the component takes up a consistent size regardless
 * of the images being viewed.
 *
 * If you need the carousel to adjust `height` based on the screen size, consider using the
 * `useBreakpoint` hook.
 */
export const ImageCarouselWithFullView = ({
  style,
  height = '20rem',
  containerProps: { className: containerClassName, style: containerStyle, ...otherContainerProps } = {},
  ...otherProps
}: ImageCarouselWithFullViewProps) => {
  return (
    <CarouselWithFullView
      renderItem={({ src: imgSrc, style: imgStyle, className: imgClassName, ...otherImgProps }) => (
        <Flexbox horizontalAlignment="center" verticalAlignment="center">
          <img
            className={buildClassName(imgClassName, 'jtjs-image-carousel-with-full-view-default-thumbnail')}
            src={imgSrc}
            style={{
              maxHeight: '3rem',
              ...imgStyle,
            }}
            {...otherImgProps}
          />
        </Flexbox>
      )}
      getItemKey={({ src: imgSrc }) => imgSrc}
      renderFullView={({ src: imgSrc, style: imgStyle, className: imgClassName, ...otherImgProps }) => (
        <Flexbox
          style={{
            width: '100%',
            height,
          }}
          horizontalAlignment="center"
          verticalAlignment="center"
        >
          <img
            className={buildClassName(imgClassName, 'jtjs-image-carousel-with-full-view-default-image-view')}
            src={imgSrc}
            style={{
              maxHeight: height,
              maxWidth: '100%',
              ...imgStyle,
            }}
            {...otherImgProps}
          />
        </Flexbox>
      )}
      renderPlaceholderFullView={() => (
        <Contentbox
          filled
          style={{
            width: '100%',
            height: height,
          }}
        />
      )}
      containerProps={{
        className: buildClassName(containerClassName, 'jtjs-image-carousel-with-full-view'),
        style: {
          width: '100%',
          ...containerStyle,
        },
        ...otherContainerProps,
      }}
      style={{
        maxWidth: '100%',
        ...style,
      }}
      {...otherProps}
    />
  );
};
