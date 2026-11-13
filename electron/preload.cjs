const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('nakano', {
  platform: process.platform,
  isDesktop: true,
  settings: {
    get: () => ipcRenderer.invoke('settings:get'),
    set: (patch) => ipcRenderer.invoke('settings:set', patch),
  },
  voice: {
    speak: (text, sister, force = false) => ipcRenderer.invoke('voice:speak', { text, sister, force }),
  },
})
