import { ipcMain } from "electron";

export default function isDev() {
    return true;
};

export function ipcHandle(key, handler) {
    ipcMain.handle(key, () => handler());
}

export function ipcWebContentsSend(key, webContents, payload) {
    webContents.send(key, payload);
}

export function validateEventFrame(frame) {
    if (isDev() && new URL(frame.url).host === 'localhost:5123') {
        return;
    }
    // if (frame.url !== pathToFileURL(getUIPath()).toString()) {
    //     throw new Error('Malicious event')
    // }
}