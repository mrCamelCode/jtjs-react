import { StructuredDialog, StructuredDialogProps } from './StructuredDialog';
import { DialogButton } from './dialog.model';

export type ConfirmationDialogButton = Omit<DialogButton, 'closeDialogOnClick' | 'beforeCloseOnClick'>;

export interface ConfirmationDialogProps extends Omit<StructuredDialogProps, 'buttons'> {
  /**
   * The data for the button that represents accepting the confirmation. Defaults to
   * a button with text `Okay` that closes the dialog when clicked. Use `onAccept` to
   * control what to do when this button is clicked and control whether the dialog should
   * close when the button is clicked.
   *
   * Prefer using `onAccept` rather than setting `acceptButton.buttonProps.onClick`, since
   * that gives you more control over the autoclose operation.
   */
  acceptButton?: ConfirmationDialogButton;
  /**
   * The data for the button that represents rejecting the confirmation. Defaults to
   * a button with text `Cancel` that closes the dialog when clicked. Use `onReject` to
   * control what to do when this button is clicked and control whether the dialog should
   * close when the button is clicked.
   *
   * Prefer using `onReject` rather than setting `rejectButton.buttonProps.onClick`, since
   * that gives you more control over the autoclose operation.
   */
  rejectButton?: ConfirmationDialogButton;
  /**
   * What to do when the confirmation prompt is accepted.
   */
  onAccept?: DialogButton['beforeCloseOnClick'];
  /**
   * What to do when the confirmation prompt is rejected.
   */
  onReject?: DialogButton['beforeCloseOnClick'];
}

/**
 * A special `StructuredDialog` that provides the user with a button to accept or reject a confirmation
 * of something. This is suitable when you'd like the user to verify they want to perform the action
 * that triggered the dialog. Usually, it's because the action has consequences that are difficult
 * or impossible to reverse, or it's a significant operation.
 *
 * The dialog will automatically close if the handler for the action (`onAccept`/`onReject`) evaluates to `true`.
 */
export const ConfirmationDialog = ({
  ref,
  acceptButton,
  rejectButton,
  onAccept,
  onReject,
  ...otherProps
}: ConfirmationDialogProps) => {
  const autoAcceptButton = {
    text: acceptButton?.text ?? 'Okay',
    ...acceptButton,
    closeDialogOnClick: true,
    beforeCloseOnClick: onAccept,
  } as DialogButton;

  const autoRejectButton = {
    text: rejectButton?.text ?? 'Cancel',
    ...rejectButton,
    closeDialogOnClick: true,
    beforeCloseOnClick: onReject,
  } as DialogButton;

  return <StructuredDialog buttons={[autoAcceptButton, autoRejectButton]} {...otherProps} ref={ref} />;
};
