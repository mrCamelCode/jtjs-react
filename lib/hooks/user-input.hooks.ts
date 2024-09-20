import { UserInputKeyEventHandler, UserInputService } from '@jtjs/browser';
import { useEffect } from 'react';

type KeyName = KeyboardEvent['key'];
type KeyEventHandler = () => void;

/**
 * Registers an event listener for the moment when a specific key is released.
 *
 * @param key - The key to listen for.
 * @param handler - The handler to invoke when the specified key is released.
 */
export function useKeyUp(key: KeyName, handler: KeyEventHandler) {
  useEffect(() => {
    const keyListener: UserInputKeyEventHandler = (inputKey) => {
      if (key === inputKey) {
        handler();
      }
    };

    return UserInputService.onKeyUp.subscribe(keyListener);
  });
}

/**
 * Registers an event listener for the moment when a specific key is pressed.
 *
 * @param key - The key to listen for.
 * @param handler - The handler to invoke when the specified key is pressed.
 */
export function useKeyDown(key: KeyName, handler: KeyEventHandler) {
  useEffect(() => {
    const keyListener: UserInputKeyEventHandler = (inputKey) => {
      if (key === inputKey) {
        handler();
      }
    };

    return UserInputService.onKeyDown.subscribe(keyListener);
  });
}

/**
 * Registers an event listener that will be invoked continuously while the specified
 * key is pressed.
 *
 * @param key - The key to listen for.
 * @param handler - The handler to invoke when the specified key is pressed.
 */
export function useKeyPressed(key: KeyName, handler: KeyEventHandler) {
  useEffect(() => {
    const keyListener: UserInputKeyEventHandler = (inputKey) => {
      if (key === inputKey) {
        handler();
      }
    };

    return UserInputService.onKeyPressed.subscribe(keyListener);
  });
}

export interface ChordInputOptions {
  /**
   * Whether the chord keys must be the _only_ keys currently pressed for the chord
   * to trigger.
   */
  exclusive?: boolean;
}
/**
 * Registers an event listener that will be invoked the moment the specified keys are
 * all pressed.
 *
 * @param key - The key to listen for.
 * @param handler - The handler to invoke when the specified key is pressed.
 */
export function useChordDown(
  keys: KeyName[],
  handler: KeyEventHandler,
  options: ChordInputOptions = {}
) {
  const { exclusive = false } = options;

  useEffect(() => {
    const keyListener: UserInputKeyEventHandler = () => {
      if (
        exclusive
          ? UserInputService.isChordPressedExclusively(keys)
          : UserInputService.isChordPressed(keys)
      ) {
        handler();
      }
    };

    return UserInputService.onKeyDown.subscribe(keyListener);
  });
}
