import { forwardRef } from 'react';
import { StructuredDialog, StructuredDialogProps } from './StructuredDialog';
import { DialogButton } from './dialog.model';

export type AcknowledgmentDialogButton = Omit<
  DialogButton,
  'closeDialogOnClick' | 'beforeCloseOnClick'
>;

export interface AcknowledgmentDialogProps
  extends Omit<StructuredDialogProps, 'buttons'> {
  /**
   * The data for the button that represents acknowledging the contents of the dialog. Defaults to
   * a button with text `Okay` that closes the dialog when clicked. Use `onAcknowledge` to
   * control what to do when this button is clicked and control whether the dialog should
   * close when the button is clicked.
   *
   * Prefer using `onAcknowledge` rather than setting `acknowledgeButton.buttonProps.onClick`, since
   * that gives you more control over the autoclose operation.
   */
  acknowledgeButton?: AcknowledgmentDialogButton;
  /**
   * What to do when the prompt is acknowledged.
   */
  onAcknowledge?: DialogButton['beforeCloseOnClick'];
}

/**
 * A special `StructuredDialog` that provides the user with a button to acknowledge something. In contrast
 * to a `ConfirmationDialog`, an `AcknowledgmentDialog` doesn't give the user an option to reject the contents
 * of the dialog. These kinds of dialogs are useful for statements of fact that you want to be sure the user sees.
 *
 * Some examples of such would be:
 * 1. Legal notices that require acceptance.
 * 1. Making the user aware of necessary cookies your site uses.
 * 1. Warning the user of something on your site, like patterns that may affect those with epilepsy.
 *
 * The dialog will automatically close if the handler for the action (`onAcknowledge`) evaluates to `true`.
 */
export const AcknowledgmentDialog = forwardRef<
  HTMLDialogElement,
  AcknowledgmentDialogProps
>(
  (
    {
      acknowledgeButton,
      onAcknowledge,
      ...otherProps
    }: AcknowledgmentDialogProps,
    ref
  ) => {
    const autoAcknowledgeButton = {
      text: acknowledgeButton?.text ?? 'Okay',
      ...acknowledgeButton,
      closeDialogOnClick: true,
      beforeCloseOnClick: onAcknowledge,
    } as DialogButton;

    return (
      <StructuredDialog
        buttons={[autoAcknowledgeButton]}
        {...otherProps}
        ref={ref}
      />
    );
  }
);
