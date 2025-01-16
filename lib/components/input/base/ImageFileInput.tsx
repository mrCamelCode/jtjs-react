import { ImageConversionType, ImageUtil } from '@jtjs/browser';
import { useState } from 'react';
import { useIsMountedRef } from '../../../hooks/use-is-mounted-ref.hook';
import { buildClassName } from '../../../util/util-functions';
import { FileInput, FileInputProps } from './FileInput';

export interface ImageFileInputProps extends FileInputProps {
  /**
   * Whether the input should create converted versions of all valid files
   * passed to it. Conversion is an async process and the input will be
   * disabled while it's working.
   *
   * Conversion is useful if your system prefers a particular image file type.
   * For example, `webp` can be preferable because of how small it is for
   * the same perceptible visual quality of something like `png`.
   *
   * Note that file type acceptance in HTML is more of a suggestion than something
   * the browser enforces. If the user provides a non-image file, the conversion
   * will just output the file they provided unchanged.
   *
   * When the conversion is complete, `onChangeFiles` will be invoked with the results
   * of the conversion.
   */
  convertImagesTo?: ImageConversionType;
}

/**
 * A light wrapper around a `FileInput` that gives defaults for accepting images.
 *
 * Because changing image file types is a common use case, this input supports
 * converting files that come through it. See the `convertImagesTo` prop.
 *
 * While this component tells the underlying input to only accept images, be aware
 * that setting what file types are accepted in HTML is more of a suggestion
 * than something the browser will enforce. Even if an input says it only accepts
 * images, the user can still provide non-images. You should expect that the files
 * that come through the input are potentially not images. Setting the accepted file
 * type is more for improving UX when the OS' file browser window appears. Because
 * file inputs are nearly impossible to control and this component is intended to be
 * as close to the native HTML input as possible, this component can't just filter out
 * non-images.
 *
 * If you'd like a more complete and opinionated image file input, consider using
 * `FullImageFileInput`.
 */
export const ImageFileInput = ({
  ref,
  className,
  onChangeFiles,
  convertImagesTo,
  disabled,
  ...otherProps
}: ImageFileInputProps) => {
  const isMountedRef = useIsMountedRef();

  const [isConverting, setIsConverting] = useState(false);

  return (
    <FileInput
      className={buildClassName(className, 'jtjs-image-file-input')}
      accept="image/*"
      onChangeFiles={async (files, event) => {
        let updatedFiles = files;

        if (!!convertImagesTo) {
          setIsConverting(true);

          updatedFiles = await Promise.all(files.map((file) => ImageUtil.convert(file, convertImagesTo)));

          if (isMountedRef.current) {
            setIsConverting(false);
          }
        }

        if (isMountedRef.current) {
          onChangeFiles?.(updatedFiles, event);
        }
      }}
      disabled={disabled || isConverting}
      {...otherProps}
      ref={ref}
    />
  );
};
