# TurboVets Admin Dashboard

Internal admin dashboard built with Angular and Tailwind CSS. Embedded in the TurboVets mobile app via Flutter WebView.

## Features

- Ticket management with status filtering
- Knowledge base editor with markdown support
- Live system logs viewer
- Dark mode with system preference detection
- Responsive sidebar navigation

## Tech Stack

- Angular 21 (standalone components)
- Tailwind CSS v4
- Angular Signals for state management

## Setup

```bash
npm install
npm start
```

The app runs on `http://localhost:4200`

## Build

```bash
npm run build
```

Build output goes to `dist/`

## WebView Integration

The dashboard is optimized for Flutter WebView:
- Viewport settings prevent zooming and handle device notches
- Platform checks guard browser APIs for SSR compatibility
- Mobile-first responsive design with collapsible sidebar

## Structure

```
src/app/
├── components/
│   ├── knowledgebase-editor/
│   ├── live-logs/
│   ├── sidebar/
│   └── ticket-viewer/
└── services/
    ├── theme.service.ts
    └── ticket.service.ts
```

