import { ChangeEvent, useState } from 'react';
import { buildClassName, maskText } from '../../../util';
import { MultilineTextInput, MultilineTextInputProps } from './MultilineTextInput';

export interface MaskedMultilineTextInputProps extends Omit<MultilineTextInputProps, 'onChangeText'> {
  /**
   * Handler for when the user attempts to change the input.
   *
   * @param treatedText - The input text after going through all the necessary filtering.
   * This includes applying the mask (if provided) and removing any newlines if the input is not multiline.
   * @param rawText - The raw input text with no filtering.
   * @param event - The original simulated event.
   */
  onChangeText?: (treatedText: string, rawText: string, event: ChangeEvent<HTMLTextAreaElement>) => void;
  /**
   * Mask to apply to the input. The masking is applied using {@link maskText}. Because this component is intended
   * to allow multiline text, your regex does _not_ need to explicitly allow newlines.
   *
   * @example
   * ```ts
   * const onlyNumbersMask = /\d/;
   * ```
   */
  mask?: RegExp;
}

/**
 * Receives user input in the form of text. Allows masking the input to limit accepted characters.
 *
 * You can choose whether you control this component, but if you don't control it, the component will
 * control the underlying input for you. This allows a provided mask to still apply to
 * the user input.
 */
export const MaskedMultilineTextInput = ({
  ref,
  className,
  mask,
  value,
  defaultValue,
  onChange,
  onChangeText,
  ...otherProps
}: MaskedMultilineTextInputProps) => {
  const [internalValue, setInternalValue] = useState<string>((defaultValue as string) ?? '');

  const isControlled = value !== undefined;

  const handleChange: MultilineTextInputProps['onChange'] = (event) => {
    const rawText = event.target.value;

    const treatedText = mask
      ? rawText
          .split(/[\r\n]+/)
          .map((rawLine) => {
            return maskText(rawLine, mask);
          })
          .filter((treatedLine) => !!treatedLine)
          .join('\n')
      : rawText;

    onChangeText?.(treatedText, rawText, event);

    if (!isControlled) {
      setInternalValue(treatedText);
    }
  };

  const getValue = () => {
    return isControlled ? value : internalValue;
  };

  return (
    <MultilineTextInput
      data-testid="masked-multiline-text-input"
      className={buildClassName(className, 'jtjs-masked-multiline-text-input')}
      value={getValue()}
      onChange={(event) => {
        handleChange(event);
        onChange?.(event);
      }}
      {...otherProps}
      ref={ref}
    />
  );
};
