import { ButtonProps } from '../controls';

export interface DialogButton {
  text: string;
  buttonProps?: Omit<ButtonProps, 'children'>;
  /**
   * Whether the dialog should automatically close when the button is clicked.
   * The close will happen immediately. If you need to do some processing before
   * the close or want to block the close entirely, use `beforeCloseOnClick` in
   * conjunction with this property.
   */
  closeDialogOnClick?: boolean;
  /**
   * Runs if `closeDialogOnClick` is `true` and the dialog is processing the click
   * of this button.
   *
   * @returns - Whether the dialog should be allowed to close. If `true`, the dialog
   * is fine to close. Otherwise, the dialog should not close.
   */
  beforeCloseOnClick?: () => boolean | Promise<boolean>;
}
