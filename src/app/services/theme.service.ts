import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export enum Themes {
  LIGHT = 'light',
  DARK = 'dark',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly keyThemeStorage = 'Theme';

  public theme$ = new BehaviorSubject<Themes>(Themes.LIGHT);

  /**
   * Создает экземпляр службы тем
   * @param document
   */
  constructor(@Inject(DOCUMENT) private document: Document) {
    const theme = (localStorage.getItem(this.keyThemeStorage) ||
      Themes.LIGHT) as Themes;
    if (theme) {
      this.switchTheme(theme);
    }
  }

  /**
   * Изменить тему
   * @param theme
   */
  public switchTheme(theme: Themes): void {
    const themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = theme + '.css';
      localStorage.setItem(this.keyThemeStorage, theme);
      this.theme$.next(theme);
    }
  }
}
