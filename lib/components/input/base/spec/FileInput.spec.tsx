import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { FileInput, FileInputProps } from '../FileInput';

const INPUT_TEST_ID = 'upload';

const renderFileInput = (props: Partial<FileInputProps> = {}) => {
  const defaultProps: FileInputProps = {};

  return render(<FileInput {...defaultProps} data-testid={INPUT_TEST_ID} {...props} />);
};

describe('FileInput', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  describe('onChangeFiles', () => {
    const onChangeFiles = vi.fn();

    test('invoked when a file is uploaded', async () => {
      const { queryByTestId } = renderFileInput({
        onChangeFiles,
      });

      const input = queryByTestId(INPUT_TEST_ID);

      const testFile = new File(['file'], 'test.txt', { type: 'text/plain' });

      await userEvent.upload(input!, testFile);

      expect(onChangeFiles).toHaveBeenCalledTimes(1);
      expect((onChangeFiles.mock.calls[0][0] as File[]).length).toBe(1);
      expect(onChangeFiles.mock.calls[0][0][0]).toEqual(testFile);
    });
    test('invoked when multiple files are uploaded', async () => {
      const { queryByTestId } = renderFileInput({
        onChangeFiles,
        multiple: true,
      });

      const input = queryByTestId(INPUT_TEST_ID);

      const testFiles = [
        new File(['file'], 'test.txt', { type: 'text/plain' }),
        new File(['file'], 'test.png', { type: 'image/png' }),
      ];

      await userEvent.upload(input!, testFiles);

      expect(onChangeFiles).toHaveBeenCalledTimes(1);
      expect((onChangeFiles.mock.calls[0][0] as File[]).length).toBe(2);

      testFiles.forEach((file, index) => {
        expect(onChangeFiles.mock.calls[0][0][index]).toEqual(file);
      });
    });
    test('invoked with only the new file when a second upload happens', async () => {
      const { queryByTestId } = renderFileInput({
        onChangeFiles,
      });

      const input = queryByTestId(INPUT_TEST_ID);

      const firstFile = new File(['file'], 'og-test.jpg', { type: 'image/jpg' });
      const testFile = new File(['file'], 'test.txt', { type: 'text/plain' });

      await userEvent.upload(input!, firstFile);
      await userEvent.upload(input!, testFile);

      expect(onChangeFiles).toHaveBeenCalledTimes(2);
      expect((onChangeFiles.mock.calls[1][0] as File[]).length).toBe(1);
      expect(onChangeFiles.mock.calls[1][0][0]).toEqual(testFile);
    });
    test('invoked with only the new files when a second upload happens on a multiple input', async () => {
      const { queryByTestId } = renderFileInput({
        onChangeFiles,
        multiple: true,
      });

      const input = queryByTestId(INPUT_TEST_ID);

      const firstFiles = [
        new File(['file'], 'og-test.jpg', { type: 'image/jpg' }),
        new File(['file'], 'og-test-other.txt', { type: 'text/plain' }),
        new File(['file'], 'og-test-other-again.txt', { type: 'text/plain' }),
      ];
      const testFiles = [
        new File(['file'], 'test.txt', { type: 'text/plain' }),
        new File(['file'], 'test.png', { type: 'image/png' }),
      ];

      await userEvent.upload(input!, firstFiles);
      await userEvent.upload(input!, testFiles);

      expect(onChangeFiles).toHaveBeenCalledTimes(2);
      expect((onChangeFiles.mock.calls[1][0] as File[]).length).toBe(2);

      testFiles.forEach((file, index) => {
        expect(onChangeFiles.mock.calls[1][0][index]).toEqual(file);
      });
    });
  });
});
