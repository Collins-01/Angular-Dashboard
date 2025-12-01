import { Routes } from '@angular/router';
import { TicketViewerComponent } from './components/ticket-viewer/ticket-viewer.component';
import { KnowledgebaseEditorComponent } from './components/knowledgebase-editor/knowledgebase-editor.component';
import { LiveLogsComponent } from './components/live-logs/live-logs.component';

export const routes: Routes = [
    { path: '', redirectTo: 'tickets', pathMatch: 'full' },
    { path: 'tickets', component: TicketViewerComponent, title: 'Tickets - TurboVets Admin' },
    { path: 'knowledgebase', component: KnowledgebaseEditorComponent, title: 'Knowledgebase - TurboVets Admin' },
    { path: 'logs', component: LiveLogsComponent, title: 'Live Logs - TurboVets Admin' },
    { path: '**', redirectTo: 'tickets' }
];
