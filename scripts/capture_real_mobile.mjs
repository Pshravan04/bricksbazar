import { spawn } from 'child_process';
import fs from 'fs';

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--disable-gpu',
  '--user-data-dir=' + process.env.TEMP + '\\chrome-real-mobile-full',
  '--remote-debugging-port=9222',
  'http://localhost:3000'
]);

setTimeout(async () => {
  try {
    const listRes = await fetch('http://127.0.0.1:9222/json/list');
    const targets = await listRes.json();
    const pageTarget = targets.find(t => t.type === 'page');
    if (!pageTarget) {
      console.log('No page target found');
      chrome.kill();
      return;
    }

    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    ws.onopen = () => {
      // 1. Set real mobile device emulation: 390 width
      ws.send(JSON.stringify({
        id: 1,
        method: 'Emulation.setDeviceMetricsOverride',
        params: {
          width: 390,
          height: 844,
          deviceScaleFactor: 2,
          mobile: true,
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
        }, 1200);
      } else if (msg.id === 2) {
        const base64 = msg.result.data;
        const buffer = Buffer.from(base64, 'base64');
        fs.writeFileSync('d:\\bricksBazar\\public\\real-mobile-full.png', buffer);
        fs.writeFileSync('C:\\Users\\Admin\\.gemini\\antigravity\\brain\\ee209a65-b2a9-4b72-8fa9-d8075ff0dea0\\real-mobile-full.png', buffer);
        console.log('Saved real full mobile screenshot:', buffer.length, 'bytes');
        ws.close();
        chrome.kill();
        process.exit(0);
      }
    };

  } catch (err) {
    console.error('Error:', err);
    chrome.kill();
    process.exit(1);
  }
}, 2000);
