import { Component, OnDestroy, OnInit, signal, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Log entry interface
 */
interface LogEntry {
    timestamp: Date;
    level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
    message: string;
}

/**
 * LiveLogsComponent simulates a real-time log viewer
 * Features:
 * - Auto-scrolling terminal view
 * - Color-coded log levels
 * - Pause/Resume functionality
 * - Clear logs
 */
@Component({
    selector: 'app-live-logs',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './live-logs.component.html',
    styleUrl: './live-logs.component.css'
})
export class LiveLogsComponent implements OnInit, OnDestroy, AfterViewChecked {
    @ViewChild('logContainer') logContainer!: ElementRef;

    // Signals for state management
    logs = signal<LogEntry[]>([]);
    isPaused = signal<boolean>(false);
    autoScroll = signal<boolean>(true);

    // Interval ID for log generation
    private intervalId: any;

    // Sample log messages
    private messages = [
        'User login successful: admin',
        'Fetching data from /api/tickets',
        'Database connection pool: 5/10 connections active',
        'Cache hit for key: user_settings_1001',
        'Background job started: email_digest',
        'Payment gateway response: 200 OK',
        'Widget component initialized',
        'Websocket connection established',
        'Memory usage: 45MB',
        'Garbage collection run completed'
    ];

    private errors = [
        'Connection timeout: upstream server not responding',
        'Failed to parse JSON response',
        'Invalid authentication token',
        'Resource not found: /api/v1/unknown',
        'Rate limit exceeded for IP: 192.168.1.1'
    ];

    ngOnInit(): void {
        // Start generating logs
        this.startLogGeneration();
    }

    ngOnDestroy(): void {
        this.stopLogGeneration();
    }

    ngAfterViewChecked(): void {
        this.scrollToBottom();
    }

    /**
     * Toggle pause/resume state
     */
    togglePause(): void {
        this.isPaused.update(val => !val);
        if (this.isPaused()) {
            this.stopLogGeneration();
        } else {
            this.startLogGeneration();
        }
    }

    /**
     * Clear all logs
     */
    clearLogs(): void {
        this.logs.set([]);
    }

    /**
     * Toggle auto-scroll
     */
    toggleAutoScroll(): void {
        this.autoScroll.update(val => !val);
    }

    /**
     * Start the log generation interval
     */
    private startLogGeneration(): void {
        if (this.intervalId) return;

        this.intervalId = setInterval(() => {
            this.addRandomLog();
        }, 2000);
    }

    /**
     * Stop the log generation interval
     */
    private stopLogGeneration(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    /**
     * Add a random log entry
     */
    private addRandomLog(): void {
        const random = Math.random();
        let level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG' = 'INFO';
        let message = '';

        if (random > 0.9) {
            level = 'ERROR';
            message = this.errors[Math.floor(Math.random() * this.errors.length)];
        } else if (random > 0.7) {
            level = 'WARN';
            message = 'High latency detected: ' + Math.floor(Math.random() * 500 + 100) + 'ms';
        } else if (random > 0.5) {
            level = 'DEBUG';
            message = 'Processing request ID: ' + Math.floor(Math.random() * 10000);
        } else {
            level = 'INFO';
            message = this.messages[Math.floor(Math.random() * this.messages.length)];
        }

        const newLog: LogEntry = {
            timestamp: new Date(),
            level,
            message
        };

        this.logs.update(currentLogs => {
            // Keep only last 100 logs to prevent memory issues
            const updatedLogs = [...currentLogs, newLog];
            if (updatedLogs.length > 100) {
                return updatedLogs.slice(updatedLogs.length - 100);
            }
            return updatedLogs;
        });
    }

    /**
     * Scroll container to bottom if auto-scroll is enabled
     */
    private scrollToBottom(): void {
        if (this.autoScroll() && this.logContainer) {
            try {
                this.logContainer.nativeElement.scrollTop = this.logContainer.nativeElement.scrollHeight;
            } catch (err) { }
        }
    }

    /**
     * Get color class for log level
     */
    getLevelClass(level: string): string {
        switch (level) {
            case 'INFO': return 'text-green-400';
            case 'WARN': return 'text-yellow-400';
            case 'ERROR': return 'text-red-500 font-bold';
            case 'DEBUG': return 'text-blue-400';
            default: return 'text-gray-300';
        }
    }
}
