import { Injectable, signal, effect, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * ThemeService manages the application's light/dark mode theme.
 * Persists user preference in localStorage and applies theme classes to the document.
 */
@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    // Signal to track current theme state
    isDarkMode = signal<boolean>(false);

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        // Initialize theme only in browser
        if (isPlatformBrowser(this.platformId)) {
            this.isDarkMode.set(this.getInitialTheme());
        }

        // Effect to apply theme changes to the document
        effect(() => {
            if (isPlatformBrowser(this.platformId)) {
                const darkMode = this.isDarkMode();
                if (darkMode) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
                // Persist preference
                localStorage.setItem('theme', darkMode ? 'dark' : 'light');
            }
        });
    }

    /**
     * Toggle between light and dark mode
     */
    toggleTheme(): void {
        this.isDarkMode.update(value => !value);
    }

    /**
     * Get initial theme from localStorage or system preference
     */
    private getInitialTheme(): boolean {
        if (!isPlatformBrowser(this.platformId)) {
            return false;
        }

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme === 'dark';
        }
        // Check system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
}
