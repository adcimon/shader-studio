const { app, BrowserWindow } = require("electron");
const path = require("path");

const createWindow = () =>
{
    const window = new BrowserWindow(
    {
        width: 1280,
        height: 720,
        webPreferences:
        {
            preload: path.join(__dirname, "preload.js")
        }
    });
  
    window.loadFile(path.join(__dirname, "index.html"));

    window.maximize();
};

app.whenReady().then(() =>
{
    createWindow();

    app.on("activate", () =>
    {
        if( BrowserWindow.getAllWindows().length === 0 )
        {
            createWindow();
        }
    })
});

app.on("window-all-closed", () =>
{
    if( process.platform !== "darwin" )
    {
        app.quit();
    }
});