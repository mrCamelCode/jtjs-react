import { ImageConversionType } from '@jtjs/browser';
import { cleanup, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { ImageFileInput, ImageFileInputProps } from '../ImageFileInput';

const INPUT_TEST_ID = 'upload';

const renderImageFileInput = (props: Partial<ImageFileInputProps> = {}) => {
  const defaultProps: ImageFileInputProps = {};

  return render(<ImageFileInput {...defaultProps} data-testid={INPUT_TEST_ID} {...props} />);
};

const testPng = new File(['file'], 'test.png', { type: 'image/png' });
const testImages = [
  new File(['file'], 'test.png', { type: 'image/png' }),
  new File(['file'], 'test.jpg', { type: 'image/jpg' }),
  new File(['file'], 'test.webp', { type: 'image/webp' }),
];

// @ts-ignore
vi.mock(import('@jtjs/browser'), async (importOriginal) => {
  const mod = await importOriginal();

  const convertMock = vi.fn((imgFile: File, typ: ImageConversionType): Promise<File> => {
    const newFile: File = { ...imgFile, type: typ };

    return Promise.resolve(newFile);
  });

  return {
    ...mod,
    ImageUtil: {
      ...mod.ImageUtil,
      convert: convertMock,
    },
  };
});

describe('ImageFileInput', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  describe('conversion', () => {
    const onChangeFiles = vi.fn();

    test(`does not convert when convertImagesTo isn't specified`, async () => {
      const { queryByTestId } = renderImageFileInput({
        onChangeFiles,
      });

      const input = queryByTestId(INPUT_TEST_ID);

      await userEvent.upload(input!, testPng);

      expect(onChangeFiles.mock.calls[0][0][0]).toEqual(testPng);
    });
    test('converts to the specified format', async () => {
      const { queryByTestId } = renderImageFileInput({
        convertImagesTo: ImageConversionType.Webp,
        onChangeFiles,
      });

      const input = queryByTestId(INPUT_TEST_ID);

      await userEvent.upload(input!, testPng);

      await waitFor(() => expect(onChangeFiles).toHaveBeenCalledTimes(1));
      expect((onChangeFiles.mock.calls[0][0] as File[]).length).toBe(1);
      expect((onChangeFiles.mock.calls[0][0][0] as File).type).toBe('image/webp');
    });
    test(`conversion runs on multiple files`, async () => {
      const { queryByTestId } = renderImageFileInput({
        convertImagesTo: ImageConversionType.Webp,
        onChangeFiles,
        multiple: true,
      });

      const input = queryByTestId(INPUT_TEST_ID);

      await userEvent.upload(input!, testImages);

      await waitFor(() => expect(onChangeFiles).toHaveBeenCalledTimes(1));
      expect((onChangeFiles.mock.calls[0][0] as File[]).length).toBe(testImages.length);
      testImages.forEach((_image, index) => {
        expect((onChangeFiles.mock.calls[0][0][index] as File).type).toBe('image/webp');
      });
    });
  });
});
