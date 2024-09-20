import { forwardRef, useImperativeHandle, useRef } from 'react';
import { buildClassName } from '../../util/util-functions';
import { AsyncButton } from '../controls/AsyncButton';
import { Heading } from '../text/Heading';
import { Flexbox } from '../wrappers/layout/Flexbox';
import { Dialog, DialogProps } from './Dialog';
import { DialogButton } from './dialog.model';
import { closeDialog } from './dialog.util';

export interface StructuredDialogProps extends DialogProps {
  title?: string;
  buttons?: DialogButton[];
}

/**
 * Base component for a dialog with a standard structure. A structured dialog has, from top to bottom:
 *
 * 1. An optional (though strongly recommended) title. This should describe what the dialog is for.
 * 2. An area for your content.
 * 3. An area for buttons. These buttons could be anything you need. Some examples would be a "Cancel" button to cancel
 * any actions done in the dialog or an "Okay" button for a confirmation dialog, etc.
 */
export const StructuredDialog = forwardRef<
  HTMLDialogElement,
  StructuredDialogProps
>(
  (
    {
      className,
      title = '',
      buttons = [],
      children,
      ...otherProps
    }: StructuredDialogProps,
    ref
  ) => {
    const internalRef = useRef<HTMLDialogElement>(null);
    useImperativeHandle(ref, () => internalRef.current as HTMLDialogElement);

    return (
      <Dialog
        className={buildClassName(className, 'jtjs-structured-dialog')}
        {...otherProps}
        ref={internalRef}
      >
        <Flexbox direction="column">
          {!!title && (
            <Heading className="jtjs-dialog-title" importance={1}>
              {title}
            </Heading>
          )}

          <div className="jtjs-dialog-content-container">{children}</div>

          {buttons.length > 0 && (
            <Flexbox
              className="jtjs-dialog-buttons-container"
              verticalAlignment="center"
              horizontalAlignment="center"
              spacing="3rem"
            >
              {buttons.map(
                ({
                  text,
                  buttonProps = {},
                  closeDialogOnClick = false,
                  beforeCloseOnClick,
                }) => {
                  const { onClick } = buttonProps;

                  return (
                    <AsyncButton
                      key={text}
                      onClick={async (...args) => {
                        onClick?.(...args);

                        if (closeDialogOnClick) {
                          if (
                            !beforeCloseOnClick ||
                            (await beforeCloseOnClick())
                          ) {
                            closeDialog(internalRef.current);
                          }
                        }
                      }}
                      {...buttonProps}
                    >
                      {text}
                    </AsyncButton>
                  );
                }
              )}
            </Flexbox>
          )}
        </Flexbox>
      </Dialog>
    );
  }
);
