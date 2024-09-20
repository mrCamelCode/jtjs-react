import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { StructuredDialog, StructuredDialogProps } from '../StructuredDialog';
import * as dialogUtils from '../dialog.util';

const renderStructuredDialog = (props: Partial<StructuredDialogProps> = {}) => {
  const defaultProps: StructuredDialogProps = {
    show: false,
  };

  return render(<StructuredDialog {...defaultProps} {...props} />);
};

// TODO: For some reason, rendering the dialog in a test env doens't render out the contents.
describe.skip('StructuredDialog', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test('title is present when provided', () => {
    renderStructuredDialog({
      title: 'Test Dialog',
    });

    expect(screen.getByText('Test Dialog')).not.toBeNull();
  });
  test('contents are present when provided', () => {
    renderStructuredDialog({
      title: 'Test Dialog',
      children: <p>super test content</p>,
    });

    expect(screen.getByText('super test content')).not.toBeNull();
  });
  test('buttons are present when provided', () => {
    const buttons = ['okie dokie', 'cancel', 'something else'];

    renderStructuredDialog({
      title: 'Test Dialog',
      buttons: buttons.map((button) => ({
        text: button,
      })),
    });

    buttons.forEach((button) => expect(screen.getByText(button)).not.toBeNull);
  });
  test('onClick for button is called when provided', async () => {
    const mock = vi.fn();

    renderStructuredDialog({
      buttons: [
        {
          text: 'test',
          buttonProps: {
            onClick: mock,
          },
        },
      ],
    });

    const button = screen.getByText('test');
    await userEvent.click(button);

    expect(mock).toHaveBeenCalledTimes(1);
  });
  test('dialog is told to close when `closeDialogOnClick` is enabled for a button', async () => {
    const closeDialogSpy = vi.spyOn(dialogUtils, 'closeDialog');

    renderStructuredDialog({
      buttons: [
        {
          text: 'test',
          closeDialogOnClick: true,
        },
      ],
    });

    // Wash out any calls to `closeDialog` that may have happened for setup.
    closeDialogSpy.mockClear();

    const button = screen.getByText('test');
    await userEvent.click(button);

    expect(closeDialogSpy).toHaveBeenCalledTimes(1);
  });
  describe('beforeCloseOnClick', () => {
    test('called when provided', async () => {
      const mock = vi.fn(() => true);
      const closeDialogSpy = vi.spyOn(dialogUtils, 'closeDialog');

      renderStructuredDialog({
        buttons: [
          {
            text: 'test',
            closeDialogOnClick: true,
            beforeCloseOnClick: mock,
          },
        ],
      });

      // Wash out any calls to `closeDialog` that may have happened for setup.
      closeDialogSpy.mockClear();

      const button = screen.getByText('test');
      await userEvent.click(button);

      // Gives the async onClick handler time to resolve.
      await tick();

      expect(mock).toHaveBeenCalledTimes(1);
      expect(closeDialogSpy).toHaveBeenCalledTimes(1);
    });
    test('closeDialog is not called if returns false', async () => {
      const closeDialogSpy = vi.spyOn(dialogUtils, 'closeDialog');

      renderStructuredDialog({
        buttons: [
          {
            text: 'test',
            closeDialogOnClick: true,
            beforeCloseOnClick: vi.fn(() => false),
          },
        ],
      });

      // Wash out any calls to `closeDialog` that may have happened for setup.
      closeDialogSpy.mockClear();

      const button = screen.getByText('test');
      await userEvent.click(button);

      await tick();

      expect(closeDialogSpy).toHaveBeenCalledTimes(0);
    });
  });
});

// see https://stackoverflow.com/questions/37408834/testing-with-reacts-jest-and-enzyme-when-simulated-clicks-call-a-function-that
function tick() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}
