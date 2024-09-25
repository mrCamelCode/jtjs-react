import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { FullImageFileInput, FullImageFileInputProps } from '../FullImageFileInput';

const TEST_LABEL = 'Test Input';

const testTxt = new File(['txt'], 'test.txt', { type: 'text/plain' });
const testPng = new File(['png'], 'test.png', { type: 'image/png' });
const testJpg = new File(['jpg'], 'test.jpg', { type: 'image/jpg' });
const testWebp = new File(['webp'], 'test.webp', { type: 'image/webp' });

const testImages = [testPng, testJpg, testWebp];

const renderFullImageFileInput = (props: Partial<FullImageFileInputProps> = {}) => {
  const defaultProps: FullImageFileInputProps = {
    label: TEST_LABEL,
    imageCarouselWithFullViewProps: {
      // @ts-ignore
      getItemContainerProps: (item, _isActiveItem, index) => {
        return {
          'data-testid': `image ${index}`,
        };
      },
    },
  };

  return render(<FullImageFileInput {...defaultProps} {...props} />);
};

describe('FullImageFileInput', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  describe('onChangeImageFiles', () => {
    const onChangeImageFiles = vi.fn();

    test(`non-image files are ignored`, async () => {
      const { getByLabelText } = renderFullImageFileInput({
        onChangeImageFiles,
      });

      const input = getByLabelText(TEST_LABEL);

      await userEvent.upload(input, testTxt);

      expect(onChangeImageFiles).not.toHaveBeenCalled();
    });
  });

  describe('multiple', () => {
    test(`an uploaded image is available in the carousel`, async () => {
      const { getByLabelText, queryByTestId } = renderFullImageFileInput({
        multiple: true,
      });

      const input = getByLabelText(TEST_LABEL);

      await userEvent.upload(input, testPng);

      expect(queryByTestId('image 0')).toBeDefined();
    });
    test(`selecting an image from the carousel views it`, async () => {
      const { container, getByLabelText, getByRole } = renderFullImageFileInput({
        multiple: true,
      });

      const input = getByLabelText(TEST_LABEL);

      await userEvent.upload(input, testPng);

      const thumbnail = getByRole('button');
      await userEvent.click(thumbnail);

      const thumbnailImage = thumbnail.querySelector('img') as HTMLImageElement;
      const fullViewImage = container.querySelector(
        'img.jtjs-image-carousel-with-full-view-default-image-view'
      ) as HTMLImageElement;

      expect(fullViewImage).toBeDefined();
      expect(fullViewImage.src).toBe(thumbnailImage.src);
    });
    test(`removing an image clears the full view`, async () => {
      const { container, getByLabelText, getByText, getByRole } = renderFullImageFileInput({
        multiple: true,
      });

      const input = getByLabelText(TEST_LABEL);

      await userEvent.upload(input, testPng);

      const thumbnail = getByRole('button');
      await userEvent.click(thumbnail);

      const removeButton = getByText('Remove');
      await userEvent.click(removeButton);

      expect(container.querySelector('jtjs-image-carousel-with-full-view-default-image-view')).toBeNull();
    });
    test(`multiple images uploaded are available in the carousel`, async () => {
      const { container, getByLabelText, queryByTestId } = renderFullImageFileInput({
        multiple: true,
      });

      const input = getByLabelText(TEST_LABEL);

      await userEvent.upload(input, testImages);

      expect(container.querySelectorAll('img').length).toBe(3);

      testImages.forEach((_img, index) => {
        expect(queryByTestId(`image ${index}`)).toBeDefined();
      });
    });
    test(`the remove button is only visible when an image is selected for viewing`, async () => {
      const { getByLabelText, getByRole, queryByText } = renderFullImageFileInput({
        multiple: true,
      });

      const input = getByLabelText(TEST_LABEL);

      await userEvent.upload(input, testPng);

      const thumbnail = getByRole('button');

      expect(queryByText('Remove')).toBeNull();

      await userEvent.click(thumbnail);

      expect(queryByText('Remove')).toBeDefined();
    });
    test(`the remove button disappears when an image is removed`, async () => {
      const { getByLabelText, getByText, getByRole, queryByText } = renderFullImageFileInput({
        multiple: true,
      });

      const input = getByLabelText(TEST_LABEL);

      await userEvent.upload(input, testPng);

      const thumbnail = getByRole('button');
      await userEvent.click(thumbnail);

      const removeButton = getByText('Remove');
      await userEvent.click(removeButton);

      expect(queryByText('Remove')).toBeNull();
    });
    test(`the thumbnail for an image disappears when it's removed`, async () => {
      const { container, getByLabelText, getByText, queryByTestId, getByTestId } = renderFullImageFileInput({
        multiple: true,
      });

      const input = getByLabelText(TEST_LABEL);

      await userEvent.upload(input, testImages);

      const thumbnail = getByTestId('image 1') as HTMLImageElement;
      const thumnailSrc = thumbnail.src;
      await userEvent.click(thumbnail);

      const removeButton = getByText('Remove');
      await userEvent.click(removeButton);

      expect(container.querySelector(`img[src="${thumnailSrc}"]`)).toBeNull();
    });

    describe('onChangeImageFiles', () => {
      const onChangeImageFiles = vi.fn();

      test(`uploading files more than once reflects all the files in the input`, async () => {
        const { getByLabelText } = renderFullImageFileInput({
          onChangeImageFiles,
          multiple: true,
        });

        const input = getByLabelText(TEST_LABEL);

        await userEvent.upload(input, testPng);

        expect(onChangeImageFiles).toHaveBeenCalledTimes(1);
        expect(onChangeImageFiles.mock.calls[0][0].length).toBe(1);
        expect(onChangeImageFiles.mock.calls[0][0][0]).toBe(testPng);

        await userEvent.upload(input, [testJpg, testWebp]);

        expect(onChangeImageFiles).toHaveBeenCalledTimes(2);
        expect(onChangeImageFiles.mock.calls[1][0].length).toBe(3);
        expect(onChangeImageFiles.mock.calls[1][0][0]).toBe(testPng);
        expect(onChangeImageFiles.mock.calls[1][0][1]).toBe(testJpg);
        expect(onChangeImageFiles.mock.calls[1][0][2]).toBe(testWebp);
      });
      test(`invoked when a file is removed`, async () => {
        const { getByLabelText, getByText, getByTestId, queryByTestId } = renderFullImageFileInput({
          onChangeImageFiles,
          multiple: true,
        });

        const input = getByLabelText(TEST_LABEL);

        await userEvent.upload(input, testImages);

        const thumbnail = getByTestId(`image 1`);
        await userEvent.click(thumbnail);

        onChangeImageFiles.mockReset();

        const removeButton = getByText('Remove');
        await userEvent.click(removeButton);

        expect(onChangeImageFiles).toHaveBeenCalledOnce();
        expect(onChangeImageFiles.mock.calls[0][0].length).toBe(2);
        expect(onChangeImageFiles.mock.calls[0][0][0]).toBe(testImages[0]);
        expect(onChangeImageFiles.mock.calls[0][0][1]).toBe(testImages[2]);
      });
    });
  });
  describe('single', () => {
    test(`an uploaded image is immediately in the full view in the carousel`, async () => {
      const { container, getByLabelText } = renderFullImageFileInput();

      const input = getByLabelText(TEST_LABEL);

      await userEvent.upload(input, testPng);

      expect(container.querySelector('.jtjs-image-carousel-with-full-view-default-image-view')).toBeDefined();
    });
    test(`removing the uploaded image clears the full view`, async () => {
      const { container, getByLabelText, getByText } = renderFullImageFileInput();

      const input = getByLabelText(TEST_LABEL);

      await userEvent.upload(input, testPng);

      const removeButton = getByText('Remove');
      await userEvent.click(removeButton);

      expect(container.querySelector('.jtjs-image-carousel-with-full-view-default-image-view')).toBeNull();
    });
    test(`removing the uploaded image hides the Remove button`, async () => {
      const { getByLabelText, getByText, queryByText } = renderFullImageFileInput();

      const input = getByLabelText(TEST_LABEL);

      await userEvent.upload(input, testPng);

      const removeButton = getByText('Remove');
      await userEvent.click(removeButton);

      expect(queryByText('Remove')).toBeNull();
    });
    test(`uploading a second image without wiping the first replaces the first in the view`, async () => {
      const { container, getByLabelText } = renderFullImageFileInput();

      const input = getByLabelText(TEST_LABEL);

      await userEvent.upload(input, testPng);

      const originalUploadedImageSrc = (
        container.querySelector('.jtjs-image-carousel-with-full-view-default-image-view') as HTMLImageElement
      ).src;

      await userEvent.upload(input, testWebp);

      const newUploadedImage = container.querySelector(
        '.jtjs-image-carousel-with-full-view-default-image-view'
      ) as HTMLImageElement;

      expect(newUploadedImage).toBeDefined();
      expect(newUploadedImage.src).not.toBe(originalUploadedImageSrc);
    });
    describe('onChangeImageFiles', () => {
      const onChangeImageFiles = vi.fn();

      test(`uploading a second image only reflects the new file`, async () => {
        const { getByLabelText } = renderFullImageFileInput({
          onChangeImageFiles,
        });

        const input = getByLabelText(TEST_LABEL);

        await userEvent.upload(input, testPng);

        expect(onChangeImageFiles).toHaveBeenCalledOnce();
        expect(onChangeImageFiles.mock.calls[0][0][0]).toBe(testPng);

        await userEvent.upload(input, testWebp);

        expect(onChangeImageFiles).toHaveBeenCalledTimes(2);
        expect(onChangeImageFiles.mock.calls[1][0].length).toBe(1);
        expect(onChangeImageFiles.mock.calls[1][0][0]).toBe(testWebp);
      });
      test(`invoked when the file is removed`, async () => {
        const { getByLabelText, getByText, queryByText } = renderFullImageFileInput({
          onChangeImageFiles,
        });

        const input = getByLabelText(TEST_LABEL);

        await userEvent.upload(input, testPng);

        onChangeImageFiles.mockReset();

        const removeButton = getByText('Remove');
        await userEvent.click(removeButton);

        expect(onChangeImageFiles).toHaveBeenCalledTimes(1);
        expect(onChangeImageFiles.mock.calls[0][0].length).toBe(0);
      });
    });
  });
});
