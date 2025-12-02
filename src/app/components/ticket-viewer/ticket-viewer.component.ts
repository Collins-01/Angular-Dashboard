import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService, Ticket } from '../../services/ticket.service';

/**
 * TicketViewerComponent displays and filters support tickets
 * Features:
 * - Tabular display with ID, Subject, Status, Created At
 * - Filter by status (All, Open, In Progress, Closed)
 * - Responsive design (table on desktop, cards on mobile)
 */
@Component({
    selector: 'app-ticket-viewer',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './ticket-viewer.component.html',
    styleUrl: './ticket-viewer.component.css'
})
export class TicketViewerComponent implements OnInit {
    // All tickets
    allTickets: Ticket[] = [];

    // Filtered tickets to display
    filteredTickets = signal<Ticket[]>([]);

    // Current filter
    currentFilter = signal<string>('All');

    // Available filters
    filters = ['All', 'Open', 'In Progress', 'Closed'];

    constructor(private ticketService: TicketService) { }

    ngOnInit(): void {
        // Load tickets on component initialization
        this.ticketService.getTickets().subscribe(tickets => {
            this.allTickets = tickets;
            this.filteredTickets.set(tickets);
        });
    }

    /**
     * Apply filter to tickets
     */
    applyFilter(status: string): void {
        this.currentFilter.set(status);
        const filtered = this.ticketService.filterTickets(status);
        this.filteredTickets.set(filtered);
    }

    /**
     * Get status badge color class
     */
    getStatusClass(status: string): string {
        switch (status) {
            case 'Open':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case 'In Progress':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'Closed':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    }

    /**
     * Format date for display
     */
    formatDate(date: Date): string {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
}
