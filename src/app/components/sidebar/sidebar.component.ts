import { Component, signal, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

/**
 * Navigation item interface
 */
interface NavItem {
    label: string;
    route: string;
    iconPath: string;
}

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
    // Signal to track sidebar collapsed state (for mobile)
    isCollapsed = signal(false);

    // Navigation items with SVG paths
    navItems: NavItem[] = [
        {
            label: 'Ticket Viewer',
            route: '/tickets',
            iconPath: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z' // Chat bubble style
        },
        {
            label: 'Knowledge Base',
            route: '/knowledgebase',
            iconPath: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z' // Document style
        },
        {
            label: 'Live Logs',
            route: '/logs',
            iconPath: 'M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z' // Activity/Pulse style
        }
    ];

    // User Data
    user = {
        name: 'Admin User',
        email: 'admin@company.com',
        initials: 'A'
    };

    constructor(
        public themeService: ThemeService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        // Auto-collapse on mobile (screen width < 768px)
        if (isPlatformBrowser(this.platformId)) {
            this.isCollapsed.set(window.innerWidth < 768);
        }
    }

    /**
     * Toggle sidebar collapsed state
     */
    toggleSidebar(): void {
        this.isCollapsed.update(value => !value);
    }

    /**
     * Close sidebar (useful on mobile after navigation)
     */
    closeSidebar(): void {
        if (window.innerWidth < 768) {
            this.isCollapsed.set(true);
        }
    }
}
