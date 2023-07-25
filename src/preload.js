const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('nodeVersion', process.versions.node);
contextBridge.exposeInMainWorld('chromeVersion', process.versions.chrome);
contextBridge.exposeInMainWorld('electronVersion', process.versions.electron);
