import { ComponentPropsWithRef, forwardRef } from 'react';
import { buildClassName } from '../../../util';
import {
  InlineFeedbackMessage,
  InlineFeedbackMessageType,
} from '../../structured-information';
import { Flexbox } from '../../wrappers';

export interface FormGroupProps extends ComponentPropsWithRef<'fieldset'> {
  /**
   * (Optional, defaults to `false`) Whether the items in the group should be inline.
   * If this is `false`, each item in the group will be on its own line.
   */
  inlineItems?: boolean;
  error?: string;
  warn?: string;
  info?: string;
}

/**
 * A light wrapper around a `fieldset`. Used to group related form controls and inputs together.
 */
export const FormGroup = forwardRef<HTMLFieldSetElement, FormGroupProps>(
  (
    {
      className,
      style,
      children,
      error,
      warn,
      info,
      inlineItems = false,
      ...otherProps
    }: FormGroupProps,
    ref
  ) => {
    return (
      <fieldset
        className={buildClassName(className, 'jtjs-form-group')}
        style={{
          display: 'flex',
          ...(inlineItems
            ? {
                flexDirection: 'row',
                gap: '1rem',
                flexWrap: 'wrap',
              }
            : {
                flexDirection: 'column',
                gap: '0.5rem',
              }),
          ...style,
        }}
        {...otherProps}
        ref={ref}
      >
        {(!!error || !!warn || !!info) && (
          <Flexbox
            style={{
              width: '100%',
            }}
            spacing="0.5rem"
            direction="column"
          >
            {[
              [error, InlineFeedbackMessageType.Error],
              [warn, InlineFeedbackMessageType.Warn],
              [info, InlineFeedbackMessageType.Info],
            ]
              .filter(([message]) => !!message)
              .map(([message, messageType]) => (
                <InlineFeedbackMessage
                  key={messageType}
                  messageType={messageType as InlineFeedbackMessageType}
                >
                  {message}
                </InlineFeedbackMessage>
              ))}
          </Flexbox>
        )}

        {children}
      </fieldset>
    );
  }
);
