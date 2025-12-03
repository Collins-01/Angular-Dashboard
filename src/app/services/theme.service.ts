import { Injectable, signal, effect, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    isDarkMode = signal<boolean>(false);

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            this.isDarkMode.set(this.getInitialTheme());
        }

        effect(() => {
            if (isPlatformBrowser(this.platformId)) {
                const darkMode = this.isDarkMode();
                if (darkMode) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
                localStorage.setItem('theme', darkMode ? 'dark' : 'light');
            }
        });
    }

    toggleTheme(): void {
        this.isDarkMode.update(value => !value);
    }

    private getInitialTheme(): boolean {
        if (!isPlatformBrowser(this.platformId)) {
            return false;
        }

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme === 'dark';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
}
