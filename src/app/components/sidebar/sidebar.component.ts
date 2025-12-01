import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

/**
 * Navigation item interface
 */
interface NavItem {
    label: string;
    route: string;
    icon: string;
}

/**
 * SidebarComponent provides responsive navigation for the dashboard
 * Features:
 * - Collapsible on mobile devices
 * - Active route highlighting
 * - Dark mode toggle
 * - Smooth transitions
 */
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

    // Navigation items
    navItems: NavItem[] = [
        { label: 'Tickets', route: '/tickets', icon: '🎫' },
        { label: 'Knowledgebase', route: '/knowledgebase', icon: '📚' },
        { label: 'Logs', route: '/logs', icon: '📋' }
    ];

    constructor(public themeService: ThemeService) { }

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
