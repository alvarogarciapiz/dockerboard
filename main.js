const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 1000,
    minHeight: 800,
    minWidth: 1200,
    maxHeight: 1200,
    maxWidth: 1600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    titleBarStyle: 'hiddenInset', // Añade esta línea
    backgroundColor: '#2e2c29'
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'dist', 'index.html'),
      protocol: 'file:',
      slashes: true
    })
  );

  mainWindow.webContents.openDevTools(); // Eliminar en el futuro X X X X X X X X X X X X X X X X X X X X X X X X X
}

app.on('ready', createWindow);