import { app, BrowserWindow } from 'electron';
import path from 'path';
import isDev, { ipcHandle } from './utils.js';
import { getStaticData, pollResources } from './resourceManager.js';
import { getPreloadPath } from './pathResolver.js';

app.on("ready", () => {

    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath(),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    console.log("isDev =", isDev());

    if (isDev()) {
        console.log("Loading DEV: http://localhost:5123");
        mainWindow.loadURL("http://localhost:5123");
    } else {
        console.log("Loading PROD: dist-react/index.html");
        mainWindow.loadFile(
            path.join(app.getAppPath(), 'dist-react/index.html')
        );
    }

    ipcHandle("get-static-data", () => {
        return getStaticData();
    });

    pollResources(mainWindow);

});