import { forwardRef } from 'react';
import { StructuredDialog, StructuredDialogProps } from './StructuredDialog';
import { DialogButton } from './dialog.model';

export type FormDialogButton = Omit<
  DialogButton,
  'closeDialogOnClick' | 'beforeCloseOnClick'
>;

export interface FormDialogProps
  extends Omit<StructuredDialogProps, 'buttons'> {
  /**
   * The data for the button that represents cancelling the form. Defaults to
   * a button with text `Cancel` that closes the dialog when clicked. Use `onCancel` to
   * control what to do when this button is clicked and control whether the dialog should
   * close when the button is clicked.
   *
   * Prefer using `onCancel` rather than setting `cancelButton.buttonProps.onClick`, since
   * that gives you more control over the autoclose operation.
   */
  cancelButton?: FormDialogButton;
  /**
   * What to do when the form is abandoned.
   */
  onCancel?: DialogButton['beforeCloseOnClick'];
}

/**
 * A special `StructuredDialog` that provides the user with a button to cancel the form and abandon it.
 * Your application shouldn't save or submit any information in this event.
 *
 * Because your form would exist within the dialog content you specify and forms are highly implementation-specific,
 * JTJS doesn't offer a submit button by default with this dialog. This component exists largely for convenience
 * and making your JSX semantic when you do decide to put a form in a dialog.
 *
 * It's likely you'll want to close the dialog after the user successfully submits your form.
 * To do so, keep a `ref` to the `FormDialog` and pass it to the `closeDialog` function.
 */
export const FormDialog = forwardRef<HTMLDialogElement, FormDialogProps>(
  ({ cancelButton, onCancel, ...otherProps }: FormDialogProps, ref) => {
    const autoCancelButton = {
      text: cancelButton?.text ?? 'Cancel',
      ...cancelButton,
      closeDialogOnClick: true,
      beforeCloseOnClick: onCancel,
    } as DialogButton;

    return (
      <StructuredDialog
        buttons={[autoCancelButton]}
        {...otherProps}
        ref={ref}
      />
    );
  }
);
