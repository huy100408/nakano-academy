const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('nakano', {
  platform: process.platform,
  isDesktop: true,
  auth: {
    openExternal: (url) => ipcRenderer.invoke('auth:open-external', url),
    takePending: () => ipcRenderer.invoke('auth:take-pending'),
    onCallback: (cb) => {
      const fn = (_e, url) => cb(url)
      ipcRenderer.on('auth:callback', fn)
      return () => ipcRenderer.removeListener('auth:callback', fn)
    },
  },
})
