import { LabelPosition, LabelledProps } from '../../../types';
import { buildClassName } from '../../../util';
import {
  InlineFeedbackMessage,
  InlineFeedbackMessageType,
} from '../../structured-information/InlineFeedbackMessage';
import { InlineText, Label, LabelProps } from '../../text';

export interface BaseLabelledInputProps extends LabelProps, LabelledProps {}

/**
 * The base for a labelled input. It's unlikely you want to use this unless you're
 * creating your own custom input component. It's more likely that you want to use one
 * of the more specific and already-created `Labelled...` components.
 */
export const BaseLabelledInput = ({
  children,
  label = '',
  // Intentionally swallow. The ...otherProps capture the label props.
  labelProps,
  labelPosition = LabelPosition.Before,
  labelTextProps: {
    className: labelTextClassName,
    ...otherLabelTextProps
  } = {},
  error,
  warn,
  info,
  ...otherProps
}: BaseLabelledInputProps) => {
  const labelText = (
    <InlineText
      className={buildClassName(
        labelTextClassName,
        'jtjs-label-text',
        labelPosition === LabelPosition.Before
          ? 'jtjs-label-before'
          : 'jtjs-label-after'
      )}
      {...otherLabelTextProps}
    >
      {label}
    </InlineText>
  );

  return (
    <Label {...otherProps}>
      {label !== undefined &&
        labelPosition === LabelPosition.Before &&
        labelText}

      {children}

      {label !== undefined &&
        labelPosition === LabelPosition.After &&
        labelText}

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
    </Label>
  );
};
