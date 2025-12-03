import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Ticket interface representing a support ticket
 */
export interface Ticket {
    id: number;
    subject: string;
    status: 'Open' | 'In Progress' | 'Closed';
    createdAt: Date;
}

/**
 * TicketService provides mock ticket data for the dashboard
 */
@Injectable({
    providedIn: 'root'
})
export class TicketService {
    private tickets: Ticket[] = [
        { id: 1001, subject: 'Unable to login to admin panel', status: 'Open', createdAt: new Date('2024-11-28') },
        { id: 1002, subject: 'Payment processing error', status: 'In Progress', createdAt: new Date('2024-11-29') },
        { id: 1003, subject: 'Feature request: Export data to CSV', status: 'Open', createdAt: new Date('2024-11-30') },
        { id: 1004, subject: 'Dashboard loading slowly', status: 'In Progress', createdAt: new Date('2024-12-01') },
        { id: 1005, subject: 'Email notifications not working', status: 'Closed', createdAt: new Date('2024-11-25') },
        { id: 1006, subject: 'User profile update fails', status: 'Open', createdAt: new Date('2024-11-27') },
        { id: 1007, subject: 'Mobile app crashes on startup', status: 'In Progress', createdAt: new Date('2024-11-26') },
        { id: 1008, subject: 'API rate limit too restrictive', status: 'Closed', createdAt: new Date('2024-11-20') },
        { id: 1009, subject: 'Dark mode not applying correctly', status: 'Closed', createdAt: new Date('2024-11-22') },
        { id: 1010, subject: 'Need help with integration', status: 'Open', createdAt: new Date('2024-12-01') },
    ];

    private ticketsSubject = new BehaviorSubject<Ticket[]>(this.tickets);

    /**
     * Get all tickets as an observable
     */
    getTickets(): Observable<Ticket[]> {
        return this.ticketsSubject.asObservable();
    }

    /**
     * Filter tickets by status
     */
    filterTickets(status: string): Ticket[] {
        if (status === 'All') {
            return this.tickets;
        }
        return this.tickets.filter(ticket => ticket.status === status);
    }
}
