import { spawn } from 'child_process';
import fs from 'fs';

const targetUrl = process.argv[2] || 'http://localhost:3000';
const outputName = process.argv[3] || 'homepage-minimal-full.png';

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--disable-gpu',
  '--user-data-dir=' + process.env.TEMP + '\\chrome-full-' + Date.now(),
  '--remote-debugging-port=9224',
  targetUrl
]);

setTimeout(async () => {
  try {
    const listRes = await fetch('http://127.0.0.1:9224/json/list');
    const targets = await listRes.json();
    const pageTarget = targets.find(t => t.type === 'page');
    if (!pageTarget) {
      console.log('No page target found');
      chrome.kill();
      return;
    }

    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    ws.onopen = () => {
      ws.send(JSON.stringify({
        id: 1,
        method: 'Emulation.setDeviceMetricsOverride',
        params: {
          width: 1440,
          height: 900,
          deviceScaleFactor: 1,
          mobile: false,
          fitWindow: false
        }
      }));
    };

    ws.onmessage = async (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id === 1) {
        setTimeout(() => {
          ws.send(JSON.stringify({
            id: 2,
            method: 'Page.captureScreenshot',
            params: { format: 'png', captureBeyondViewport: true }
          }));
        }, 1500);
      } else if (msg.id === 2) {
        const base64 = msg.result.data;
        const buffer = Buffer.from(base64, 'base64');
        const pubPath = 'd:\\bricksBazar\\public\\' + outputName;
        const artPath = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\ee209a65-b2a9-4b72-8fa9-d8075ff0dea0\\' + outputName;
        fs.writeFileSync(pubPath, buffer);
        fs.writeFileSync(artPath, buffer);
        console.log('Saved full screenshot to', pubPath, 'and', artPath, 'size:', buffer.length);
        ws.close();
        chrome.kill();
        process.exit(0);
      }
    };
  } catch (e) {
    console.error('CDP error:', e);
    chrome.kill();
    process.exit(1);
  }
}, 1500);

