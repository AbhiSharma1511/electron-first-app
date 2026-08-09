const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {

    getSystemStaticData: () => {
        return ipcRenderer.invoke("get-static-data");
    },
});