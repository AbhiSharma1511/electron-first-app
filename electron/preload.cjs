const { contextBridge, ipcRenderer } = require("electron");

function ipcInvoke(key) {
    return ipcRenderer.invoke(key);
}

function ipcOn(key, callback) {

    const handler = (_event, payload) => {
        callback(payload);
    };
    ipcRenderer.on(key, handler);

    return () => {
        ipcRenderer.removeListener(key, handler);
    };
}

contextBridge.exposeInMainWorld("electronAPI", {

    subscribeStatistics: (callback) => {
        return ipcOn("statistics", callback);
    },
    getSystemStaticData: () => {
        return ipcInvoke("get-static-data");
    },
});


