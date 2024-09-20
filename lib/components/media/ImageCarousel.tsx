import { ComponentPropsWithRef, forwardRef } from 'react';
import { Flexbox } from '../wrappers';

export interface ImageCarouselProps {

}

export const ImageCarousel = forwardRef<HTMLDivElement, ImageCarouselProps>(({
  ...otherProps
}: ImageCarouselProps, ref) => {
  return (
    <Flexbox>

    </Flexbox>
  );
});
