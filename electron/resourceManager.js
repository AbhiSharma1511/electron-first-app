import osUtils from 'os-utils'
import fs from 'fs'
import os from 'os'

const POLLING_INTERVAL = 1000;

export function pollResources(mainWindow) {

    setInterval(async () => {
        const cpuUsage = await getCpuUsage();
        const ramUsage = getRamUsage();
        const storageData = getStorageData();

        const statistics = {
            cpuUsage,
            ramUsage,
            storageData
        };

        // console.log("STATISTICS:", statistics);
        // console.log("JSON:", JSON.stringify(statistics));

        mainWindow.webContents.send("statistics", statistics)

    }, POLLING_INTERVAL)
}

export function getStaticData() {
    const totalStorage = getStorageData().total;
    const cpuModel = os.cpus()[0].model;
    const totalMemoryGB = Math.floor(osUtils.totalmem() / 1024);
    return {
        totalStorage,
        cpuModel,
        totalMemoryGB,
    }
}

function getCpuUsage() {
    return new Promise(resolve => {
        osUtils.cpuUsage(resolve)
    })
}

function getRamUsage() {
    return 1 - osUtils.freememPercentage();
}

function getStorageData() {
    const stats = fs.statfsSync('C://');
    const total = stats.bsize * stats.blocks;
    const free = stats.bsize * stats.bfree;

    return {
        total: Math.floor(total / 1000000000),
        usage: 1 - free / total
    }

}