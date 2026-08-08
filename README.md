# Electron Apps --- Learning Project

A small Electron + React + Vite project for learning Electron
fundamentals before building LifeOS.

## Tech Stack

-   Electron --- desktop runtime
-   React --- UI
-   Vite --- frontend build tool
-   JavaScript / JSX
-   esbuild --- Electron main-process build

## Structure

``` text
Electron Apps/
├── electron/
│   └── main.js
├── src/
│   └── ui/
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       └── main.jsx
├── dist-react/
├── dist-electron/
├── index.html
├── package.json
└── vite.config.js
```

## Architecture

``` text
React + Vite
     |
     v
dist-react/
     |
     v
Electron BrowserWindow
     ^
     |
electron/main.js
     |
     v
dist-electron/main.js
```

The project uses ES modules because `package.json` contains:

``` json
"type": "module"
```

Therefore Electron code uses:

``` js
import { app, BrowserWindow } from "electron";
```

rather than CommonJS `require()`.

## Electron Main Process

`electron/main.js` creates the desktop window and loads the React
production build:

``` js
import { app, BrowserWindow } from "electron";
import path from "path";

app.whenReady().then(() => {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800
    });

    mainWindow.loadFile(
        path.join(app.getAppPath(), "dist-react", "index.html")
    );
});
```

## Installation

``` bash
npm install
```

## Commands

Build React:

``` bash
npm run build:react
```

Build Electron:

``` bash
npm run build:electron
```

Build both:

``` bash
npm run build
```

Run the built desktop app:

``` bash
npm start
```

## Electron Build

The Electron build should use ESM output and keep Electron external:

``` bash
esbuild electron/main.js --bundle --platform=node --format=esm --external:electron --outfile=dist-electron/main.js
```

`--format=esm` matches the project's `"type": "module"` configuration.

`--external:electron` prevents esbuild from bundling Electron itself.

## Learning Roadmap

1.  Electron project structure
2.  Main process
3.  BrowserWindow
4.  Renderer process
5.  React + Electron
6.  Development workflow
7.  Preload scripts
8.  Context isolation
9.  IPC communication
10. Secure Electron APIs
11. Native dialogs
12. File-system access
13. Notifications
14. SQLite
15. Packaging and Windows `.exe`

## Security Direction

When the project grows, use:

``` js
webPreferences: {
    contextIsolation: true,
    nodeIntegration: false
}
```

React should communicate with Electron through a secure preload API
rather than receiving unrestricted Node.js access.

The intended architecture is:

``` text
React
  |
  v
Preload
  |
  v
IPC
  |
  v
Electron Main Process
  |
  v
Operating System
```

## Future LifeOS

This project is the Electron learning foundation for LifeOS, a future
personal productivity desktop application.

Planned modules:

-   Dashboard
-   Habit tracking
-   Daily planner
-   Workout
-   Diet
-   Sleep
-   Learning
-   Projects
-   Finance
-   Grocery
-   Analytics
-   Goals
-   Achievements

Planned stack:

``` text
Electron
React
TypeScript
Tailwind CSS
Framer Motion
Charts
SQLite
```

## Current Milestone

-   [x] React + Vite setup
-   [x] Electron setup
-   [x] Main process
-   [x] BrowserWindow
-   [x] React production build
-   [x] Electron production build
-   [x] `dist-react`
-   [x] `dist-electron`
-   [x] ESM configuration
-   [ ] Development hot reload
-   [ ] Preload
-   [ ] IPC
-   [ ] Secure Electron APIs
-   [ ] SQLite
-   [ ] Packaging

Keep this project intentionally small while learning Electron
fundamentals. LifeOS development can come after the core Electron
concepts are understood.
