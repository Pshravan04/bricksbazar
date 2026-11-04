import { spawn } from 'child_process';
import fs from 'fs';

const width = parseInt(process.argv[2]) || 1920;
const height = parseInt(process.argv[3]) || 1080;
const outputName = process.argv[4] || 'homepage-1920.png';

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--disable-gpu',
  '--user-data-dir=' + process.env.TEMP + '\\chrome-wide-' + Date.now(),
  '--remote-debugging-port=9227',
  'http://localhost:3000'
]);

setTimeout(async () => {
  try {
    const listRes = await fetch('http://127.0.0.1:9227/json/list');
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
          width: width,
          height: height,
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
            params: { format: 'png' }
          }));
        }, 1200);
      } else if (msg.id === 2) {
        const buffer = Buffer.from(msg.result.data, 'base64');
        const pubPath = 'd:\\bricksBazar\\public\\' + outputName;
        const artPath = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\ee209a65-b2a9-4b72-8fa9-d8075ff0dea0\\' + outputName;
        fs.writeFileSync(pubPath, buffer);
        fs.writeFileSync(artPath, buffer);
        console.log('Saved screenshot at ' + width + 'x' + height + ' to ' + outputName);
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

