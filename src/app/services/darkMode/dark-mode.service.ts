import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DarkModeService {
  isDarkMode = signal<boolean>(false);

  constructor() {
    // Initialize from localStorage or system preference
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) {
      this.isDarkMode.set(stored === 'true');
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      this.isDarkMode.set(prefersDark);
    }
    this.applyDarkMode();

    // React to changes using effect
    effect(() => this.applyDarkMode());
  }

  toggle() {
    this.isDarkMode.set(!this.isDarkMode());
    localStorage.setItem('darkMode', this.isDarkMode() ? 'true' : 'false');
  }

  setDarkMode(value: boolean) {
    this.isDarkMode.set(value);
    localStorage.setItem('darkMode', value ? 'true' : 'false');
  }

  private applyDarkMode() {
    document.body.classList.toggle('dark', this.isDarkMode());
  }
}
