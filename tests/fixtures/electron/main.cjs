const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const smokeTest = process.argv.includes('--smoke-test');
if (smokeTest) app.disableHardwareAcceleration();

app.whenReady().then(async () => {
  // Only this owned E2E fixture is run. The service never executes submitted apps.
  const window = new BrowserWindow({ show: !smokeTest, width: 560, height: 360, webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true } });
  await window.loadFile(path.join(__dirname, 'index.html'));
  if (smokeTest) {
    const heading = await window.webContents.executeJavaScript("document.querySelector('h1')?.textContent");
    if (heading !== 'Electron packaging works.') throw new Error('The packaged renderer assets did not load.');
    console.log('justgitmeanexe-electron-ok');
    window.destroy();
    app.quit();
  }
}).catch(error => { console.error(error.message); app.exit(1); });
app.on('window-all-closed', () => app.quit());
