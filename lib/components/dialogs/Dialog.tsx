import {
  ComponentPropsWithRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { HideBehaviour } from '../../enums';
import { buildClassName } from '../../util';
import { closeDialog } from './dialog.util';

export interface DialogProps extends ComponentPropsWithRef<'dialog'> {
  /**
   * Whether the dialog should be showing. You should be using this to control when the dialog
   * is visible, as opposed to conditionally rendering.
   *
   * @example
   * ```tsx
   * // DO:
   * <Dialog show={someShowState} onClose={() => setSomeShowState(false)} />
   *
   * // DON'T:
   * {someShowState && (<Dialog />)}
   * ```
   */
  show: boolean;
  /**
   * Whether the dialog is a modal. A modal is a dialog that goes on top of the rest of the page in the center of the
   * screen regardless of where it exists in the DOM. Visually, everything behind the modal is darkened. Elements
   * behind the modal cannot be interacted with until the modal is closed.
   */
  isModal?: boolean;
  /**
   * (Optional, defaults to {@link HideBehaviour.Remove}) How the dialog handles its children when it's not shown. If
   * {@link HideBehaviour.Hide}, the children of the dialog remain mounted when the dialog is hidden.
   * If {@link HideBehaviour.Remove}, the children of the dialog will be unmounted when the dialog is hidden.
   *
   * Consider setting this to {@link HideBehaviour.Hide} if the children of the dialog need to maintain some kind of \
   * state in between separate showings of the dialog.
   */
  hideBehaviour?: HideBehaviour;
}

/**
 * Base component for a dialog, with an option for whether it's a modal. Use the `show` prop to control whether the
 * dialog is currently visible.
 *
 * This dialog component gives you the most control over what's in the dialog, but that also means you're responsible
 * for setting up the structure of the contents of the dialog. If you're looking for a component that handles more of
 * the common dialog use cases for you, it's recommended to use the other dialog components, like
 * `ConfirmationDialog` and `AcknowledgmentDialog`. If you want some structure to a custom dialog but don't want to
 * implement all of that yourself, consider using `StructuredDialog`.
 *
 * **Note**: The use of dialogs in an application should be minimal. They're generally unfriendly to accessibility and tend
 * to look bad on mobile. If you're considering using a dialog/modal, you should seriously consider your design
 * and evaluate whether the use of a dialog/modal is really a requirement. With that said, if you do decide you want this,
 * JTJS does what it can to make the dialog itself accessible and friendly to the browser.
 */
export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  (
    {
      show,
      isModal = false,
      className,
      children,
      hideBehaviour = HideBehaviour.Remove,
      ...otherProps
    }: DialogProps,
    ref
  ) => {
    const internalRef = useRef<HTMLDialogElement>(null);
    useImperativeHandle(ref, () => internalRef.current as HTMLDialogElement);

    const showDialog = useCallback(() => {
      if (isModal) {
        internalRef.current?.showModal?.();
      } else {
        internalRef.current?.show?.();
      }
    }, []);

    useEffect(() => {
      if (show) {
        showDialog();
      } else {
        closeDialog(internalRef.current);
      }
    }, [show, showDialog]);

    const shouldChildrenBeMounted =
      show || hideBehaviour === HideBehaviour.Hide;

    return (
      <dialog
        className={buildClassName(className, 'jtjs-dialog')}
        {...otherProps}
        ref={internalRef}
      >
        {shouldChildrenBeMounted && children}
      </dialog>
    );
  }
);
