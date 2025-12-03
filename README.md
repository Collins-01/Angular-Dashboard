# TurboVets Admin Dashboard

Internal admin dashboard built with Angular and Tailwind CSS. Embedded in the TurboVets mobile app via Flutter WebView.

## Screenshots

<p align="center">
  <img src="screenshots/Screenshot 2025-12-03 at 22.12.24 (2).png" width="30%" />
  <img src="screenshots/Screenshot 2025-12-03 at 22.12.37 (2).png" width="30%" />
  <img src="screenshots/Screenshot 2025-12-03 at 22.12.45 (2).png" width="30%" />
</p>

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

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd turbovets-admin
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will be available at `http://localhost:4200`

For Android development (accessible from mobile devices):
```bash
ng serve --host 0.0.0.0
```

### Build for Production

```bash
npm run build
```

Build output goes to `dist/`

### Run Production Build

```bash
npm run serve:ssr:turbovets-admin
```

Serves the SSR build on `http://localhost:4000`

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

