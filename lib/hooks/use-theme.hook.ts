import { Theme, ThemeService } from '@jtjs/view';
import { useEffect, useState } from 'react';

/**
 * Hooks onto the current theme avialable via the {@link ThemeService}. If no
 * current theme is established (which can happen if the {@link ThemeService}
 * hasn't been started), the {@link ThemeService.defaultTheme} is used. Whenever
 * the current theme is changed, this hook will automatically update.
 *
 * @returns An array, where the first element is the current {@link Theme},
 * and the second element is a setter for the the current {@link Theme}. Using
 * the setter triggers the {@link ThemeService.onChangeTheme} event, so all
 * instances of this hook will be updated, as well as any listeners you may
 * have registered to that event.
 */
export function useTheme(): [Theme, (themeName: string) => void] {
  const [currentTheme, setCurrentTheme] = useState(
    ThemeService.currentTheme ?? ThemeService.defaultTheme
  );

  useEffect(() => {
    return ThemeService.onChangeTheme.subscribe(setCurrentTheme);
  });

  return [
    currentTheme,
    (themeName: string) => {
      ThemeService.changeTheme(themeName);
    },
  ];
}
