const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {

    subscribeStatistics: (callback) => {
        ipcRenderer.on("statistics", (_event, stats) => {
            callback(stats);
        })
    },
    getSystemStaticData: () => {
        return ipcRenderer.invoke("get-static-data");
    },
});