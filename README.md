# TurboVets Admin Dashboard

A modern, responsive, and feature-rich admin dashboard built with **Angular 16+** and **Tailwind CSS 4**. Designed for internal tools and optimized for embedding within a Flutter WebView.

![Dashboard Preview](https://via.placeholder.com/800x450?text=TurboVets+Admin+Dashboard)

## 🚀 Features

### 🎨 UI & UX
- **Pure Tailwind CSS**: Styled entirely with utility classes for consistency and performance.
- **Dark Mode Support**: Fully integrated dark mode with system preference detection and manual toggle.
- **Responsive Design**: Mobile-first approach with an auto-collapsing sidebar and optimized touch targets.
- **WebView Optimized**: Custom viewport settings and body classes for native-like feel in mobile apps.

### 🧩 Components
- **Sidebar Navigation**: 
  - Collapsible design with smooth transitions.
  - Custom SVG icons and active state indicators.
  - User profile section and "Back to Messages" action.
- **Ticket Viewer**:
  - Tabular view for desktop, card view for mobile.
  - Status filtering (Open, In Progress, Closed).
  - Mock data integration.
- **Knowledgebase Editor**:
  - Split-view Markdown editor with live preview.
  - LocalStorage persistence.
  - Custom regex-based Markdown rendering.
- **Live Logs**:
  - Terminal-style real-time log viewer.
  - Auto-scroll, pause/resume, and clear functionality.
  - Color-coded log levels (INFO, WARN, ERROR).

## 🛠️ Tech Stack

- **Framework**: Angular 16+ (Standalone Components)
- **Styling**: Tailwind CSS v4 (PostCSS)
- **State Management**: Angular Signals
- **Build Tool**: Angular CLI

## 🏁 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/turbovets-admin.git
   ```

2. Navigate to the project directory:
   ```bash
   cd turbovets-admin
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the development server:
```bash
npm start
```
Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Building for Production

Build the project artifacts:
```bash
npm run build
```
The build artifacts will be stored in the `dist/` directory.

## 📱 WebView Integration

This dashboard is designed to be embedded in a Flutter app. 

**Key optimizations for WebView:**
- **Viewport**: `viewport-fit=cover` and `user-scalable=no` are set in `index.html` to handle notches and prevent accidental zooming.
- **Background**: The `<body>` tag has explicit background colors (`bg-gray-50 dark:bg-gray-900`) to prevent transparency issues during loading or overscroll.
- **Platform Checks**: Browser-specific APIs (like `localStorage` and `window`) are guarded with `isPlatformBrowser` to support potential SSR or hybrid rendering.

## 📂 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── knowledgebase-editor/  # Markdown editor
│   │   ├── live-logs/             # Real-time system logs
│   │   ├── sidebar/               # Navigation sidebar
│   │   └── ticket-viewer/         # Support ticket grid
│   ├── services/
│   │   ├── theme.service.ts       # Dark mode management
│   │   └── ticket.service.ts      # Mock data provider
│   ├── app.routes.ts              # Routing configuration
│   └── app.component.ts           # Root component
├── styles.css                     # Global styles & Tailwind imports
└── index.html                     # Entry point
```

