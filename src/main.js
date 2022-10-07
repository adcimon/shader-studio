const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

//Menu.setApplicationMenu(false);

const createWindow = () =>
{
    const window = new BrowserWindow(
    {
        width: 1280,
        height: 720,
        //autoHideMenuBar: true,
        icon: path.join(__dirname, "..", "assets", "favicon", "favicon.ico"),
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