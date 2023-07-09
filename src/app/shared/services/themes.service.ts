import { Injectable } from '@angular/core';

import { Theme } from '@shared/models';

@Injectable({ providedIn: 'root' })
export class ThemesService {
  private readonly LS_THEME_NAME = 'theme';
  private styleLink!: HTMLLinkElement;
  private theme: Theme | null = null;

  get currentTheme() {
    return this.theme;
  }

  initialize() {
    const theme = (localStorage.getItem(this.LS_THEME_NAME) || Theme.LIGHT) as Theme;
    return this.settingTheme(theme);
  }

  /**
   * Поменять тему сайта
   */
  changeTheme(theme: Theme) {
    return this.settingTheme(theme);
  }

  private async settingTheme(theme: Theme) {
    if (!theme) {
      return;
    }
    const commit = () => {
      this.theme = theme;
      localStorage.setItem(this.LS_THEME_NAME, theme);
    };
    return new Promise<void>((resolve, reject) => {
      const styleUrl = `${theme}.css`;
      if (this.styleLink) {
        this.styleLink.onload = () => (commit(), resolve());
        this.styleLink.onerror = () => reject();
        this.styleLink.href = styleUrl;
      } else {
        const head = document.getElementsByTagName('head')[0];
        this.styleLink = document.createElement('link');
        this.styleLink.rel = 'stylesheet';
        this.styleLink.type = 'text/css';
        this.styleLink.onload = () => (commit(), resolve());
        this.styleLink.onerror = () => reject();
        this.styleLink.href = styleUrl;
        head.appendChild(this.styleLink);
      }
    });
  }
}
