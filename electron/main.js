import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import isDev from './utils.js';
import { getStaticData, pollResources } from './resourceManager.js';
import { getPathResolver } from './pathResolver.js';

app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPathResolver(),
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

    ipcMain.handle("get-static-data", () => {
        const data = getStaticData();
        console.log(data);
        return data;
    });

    pollResources(mainWindow);

});