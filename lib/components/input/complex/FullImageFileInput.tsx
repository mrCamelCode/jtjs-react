import { forwardRef, useLayoutEffect, useMemo, useState } from 'react';
import { buildClassName } from '../../../util/util-functions';
import { Button, ButtonProps } from '../../controls/Button';
import {
  ImageCarouselItemType,
  ImageCarouselWithFullView,
  ImageCarouselWithFullViewProps,
} from '../../structured-information/ImageCarouselWithFullView';
import { Flexbox, FlexboxProps } from '../../wrappers/layout/Flexbox';
import { LabelledImageFileInput, LabelledImageFileInputProps } from '../labelled/LabelledImageFileInput';
export interface FullImageFileInputProps
  extends Omit<LabelledImageFileInputProps, 'value' | 'defaultValue' | 'onChangeFiles'> {
  /**
   * The current value for the input. Can be used to control the input.
   */
  value?: File[];
  /**
   * The default value the input should have.
   *
   * Note that this only works when the component is uncontrolled. If controlling the component, set a default by
   * just having the initial `value` be your default.
   */
  defaultValue?: File[];
  /**
   * Callback for whenever files are uploaded or removed from the input. Unlike a bare `ImageFileInput`,
   * the files provided are guaranteed to only be images.
   *
   * @param files - The files tracked by the input. Unlike a bare `ImageFileInput`,
   * this array is guaranteed to only contain image files. If `multiple` was passed to the
   * input, this will be _all_ files the input has, not just the most recently uploaded ones.
   */
  onChangeImageFiles?: (files: File[]) => void;
  /**
   * Props for the outer container of the input.
   */
  containerProps?: FlexboxProps;
  /**
   * Props for the {@link ImageCarouselWithFullView} the input uses to display previews of the uploaded images.
   */
  imageCarouselWithFullViewProps?: Omit<ImageCarouselWithFullViewProps, 'items' | 'activeItem'>;
  /**
   * (Optional, defaults to `'Remove'`) The text for the button that appears when an image is selected for preview
   * in the full view carousel.
   */
  removeButtonText?: string;
  removeButtonProps?: Omit<ButtonProps, 'children'>;
}

function areFilesEqual(file1: File, file2: File): boolean {
  const getFileIdentity = ({ name, size, type }: File): string => `${name}-${size}-${type}`;

  return getFileIdentity(file1) === getFileIdentity(file2);
}

function getUpdatedFilesArray(currentFiles: File[], newFiles: File[], isAdditive: boolean): File[] {
  if (isAdditive) {
    const files: File[] = newFiles.filter((file) => !currentFiles.some((currFile) => areFilesEqual(file, currFile)));

    return [...currentFiles, ...files];
  }

  return [...newFiles];
}

/**
 * An input intended to gather image files from the user. Unlike other more base components like `ImageFileInput`,
 * this input is more complex and strives to be a more complete and easy-to-use solution rather than a simple wrapper. The input
 * resolves to an outer `Flexbox` that contains a `LabelledImageFileInput`, an `ImageCarouselWithFullView`, and a `Button` for
 * removing uploaded images. Because this component is logically its `LabelledImageFileInput`, its root props reflect that.
 * You may pass almost anything you could pass to a `LabelledImageFileInput` to this component.
 * If you pass a `ref` to this component, it will go down to the underlying `input`.
 * The props for the other items that make up this component are exposed via
 * other props, like `containerProps` for example.
 *
 * The input provides a means to upload image files and, unlike a base file input, this input guarantees that it only 
 * accepts image files. The `File[]` exposed via the `onChangeImageFiles` prop is always guaranteed to only include
 * files whose type matches `image/*`. 
 * 
 * Image files that are successfully added
 * are shown in a carousel with full view so the user may peruse what they've uploaded. When looking at the full view
 * of an uploaded image, the user is provided a button to remove that image from the input.
 *
 * Via the `multiple` prop, the input may be configured to accept one or several images.
 * Note that when `multiple` is enabled, the input operates slightly differently than a base file input. Instead
 * of new uploads clearing any existing uploads, this input will instead _add_ new uploads to what has been uploaded before.
 *
 * When `multiple` is enabled, the full `ImageCarouselWithFullView` that this component contains is used. All images that
 * have been uploaded may be browsed and viewed. When `multiple` is _disabled_, the carousel is hidden and the component
 * always shows the full view of the uploaded image, if there is one. If no image has been uploaded (or the uploaded image
 * is removed), the default placeholder for `ImageCarouselWithFullView` is displayed.
 *
 * Unlike a base file input, this input may be controlled. If you'd like to control it, pass something other than `undefined`
 * to the `value` prop. Controlling the input can be useful for things like initial form values and being able to
 * wipe the input.
 *
 * @example Accept a single image
 * ```tsx
 * <FullImageFileInput />
 * ```
 *
 * @example Accept multiple images
 * ```tsx
 * <FullImageFileInput multiple />
 * ```
 *
 * @example Convert images to WEBP
 * ```tsx
 * <FullImageFileInput convertImagesTo={ImageConversionType.Webp} />
 * ```
 *
 * @example Control the component and convert incoming uploads to PNG
 * ```tsx
 * const [pngs, setPngs] = useState<File[]>([]);
 *
 * <FullImageFileInput
 *   value={pngs}
 *   onChangeImageFiles={setPngs}
 *   convertImagesTo={ImageConversionType.Png}
 * />
 * ```
 */
export const FullImageFileInput = forwardRef<HTMLInputElement, FullImageFileInputProps>(
  (
    {
      value,
      defaultValue = [],
      onChangeImageFiles,
      multiple,
      containerProps: { className: containerClassName, ...otherContainerProps } = {},
      labelProps: { style: labelStyle, ...otherLabelProps } = {},
      label = `Drop or browse image${multiple ? 's' : ''}...`,
      imageCarouselWithFullViewProps: {
        style: imageCarouselWithFullViewStyle,
        onChangeActiveItem: imageCarouselWithFullViewOnChangeActiveItem,
        ...otherImageCarouselWithFullViewProps
      } = {},
      removeButtonText = 'Remove',
      removeButtonProps: {
        style: removeButtonStyle,
        className: removeButtonClassName,
        onClick: removeButtonOnClick,
        ...otherRemoveButtonProps
      } = {},
      ...otherProps
    }: FullImageFileInputProps,
    ref
  ) => {
    const [internalValue, setInternalValue] = useState<File[]>(defaultValue);
    const [activeCarouselItem, setActiveCarouselItem] = useState<ImageCarouselItemType | null>(null);

    const isControlled = value !== undefined;

    const isInputSingleItem = !multiple;
    const isAdditive = !!multiple;

    const getValue = (): File[] | undefined => {
      return isControlled ? value : internalValue;
    };

    const imageFilesToCarouselItems = useMemo(() => {
      const map = new Map<File, ImageCarouselItemType>();

      (getValue() ?? []).forEach((imageFile) => {
        map.set(imageFile, {
          src: URL.createObjectURL(imageFile),
          alt: imageFile.name,
        });
      });

      return map;
    }, [getValue()]);

    const imageCarouselItems: ImageCarouselWithFullViewProps['items'] = useMemo(() => {
      if (isAdditive) {
        return [...imageFilesToCarouselItems.values()];
      } else {
        return (imageFilesToCarouselItems.size > 0 ? [[...imageFilesToCarouselItems.values()][0]] : []).filter(Boolean);
      }
    }, [imageFilesToCarouselItems, isAdditive]);

    const showRemoveButton = !!activeCarouselItem;

    const handleChangeFiles: LabelledImageFileInputProps['onChangeFiles'] = (files, event) => {
      const imageFiles = files.filter((file) => file.type.startsWith('image'));

      if (imageFiles.length > 0) {
        if (isControlled) {
          onChangeImageFiles?.(getUpdatedFilesArray(value, imageFiles, isAdditive));
        } else {
          setInternalValue((curr) => {
            const newArr = getUpdatedFilesArray(curr, isAdditive ? imageFiles : imageFiles.slice(0, 1), isAdditive);

            onChangeImageFiles?.(newArr);

            return newArr;
          });
        }
      }
    };

    const handleRemoveActiveItem: ButtonProps['onClick'] = (event) => {
      removeButtonOnClick?.(event);

      if (showRemoveButton) {
        const [imageFile] =
          [...imageFilesToCarouselItems.entries()].find(([_imageFile, imageCarouselItem]) => {
            return imageCarouselItem === activeCarouselItem;
          }) ?? [];

        if (imageFile) {
          setActiveCarouselItem(null);

          if (isControlled) {
            onChangeImageFiles?.(value.filter((file) => file !== imageFile));
          } else {
            setInternalValue((curr) => {
              const newArr = curr.filter((file) => file !== imageFile);

              onChangeImageFiles?.(newArr);

              return newArr;
            });
          }
        }
      }
    };

    // Layout effect to avoid a flicker of the placeholder in cases when it's single item from the start.
    useLayoutEffect(() => {
      if (isInputSingleItem) {
        setActiveCarouselItem([...imageFilesToCarouselItems.values()][0] ?? null);
      } else {
        if (activeCarouselItem) {
          const isActiveCarouselItemInCarousel = [...imageFilesToCarouselItems.entries()].some(
            ([_imageFile, carouselItem]) => carouselItem === activeCarouselItem
          );

          if (!isActiveCarouselItemInCarousel) {
            setActiveCarouselItem(null);
          }
        }
      }
    }, [isInputSingleItem, imageFilesToCarouselItems, activeCarouselItem]);

    return (
      <Flexbox
        className={buildClassName(containerClassName, 'jtjs-full-image-file-input-container')}
        direction="column"
        {...otherContainerProps}
      >
        <LabelledImageFileInput
          onChangeFiles={handleChangeFiles}
          labelProps={{
            style: {
              width: '100%',
              ...labelStyle,
            },
            ...otherLabelProps,
          }}
          multiple={multiple}
          label={label}
          {...otherProps}
          ref={ref}
        />

        <ImageCarouselWithFullView
          // Hide the carousel (but not the full view) when the input is only supporting
          // one item.
          style={{
            ...(isInputSingleItem
              ? {
                  display: 'none',
                }
              : {}),
            ...imageCarouselWithFullViewStyle,
          }}
          {...otherImageCarouselWithFullViewProps}
          activeItem={activeCarouselItem}
          onChangeActiveItem={(item) => {
            imageCarouselWithFullViewOnChangeActiveItem?.(item);

            setActiveCarouselItem(item);
          }}
          items={imageCarouselItems}
        />

        {showRemoveButton && (
          <Button
            className={buildClassName(removeButtonClassName, 'jtjs-full-image-file-input-remove-button')}
            onClick={handleRemoveActiveItem}
            style={{
              width: '100%',
              ...removeButtonStyle,
            }}
            {...otherRemoveButtonProps}
          >
            {removeButtonText}
          </Button>
        )}
      </Flexbox>
    );
  }
);
