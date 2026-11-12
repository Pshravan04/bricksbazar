import { spawn } from 'child_process';
import fs from 'fs';

const targetUrl = 'http://localhost:3000/property/lt-elixir-reserve-powai';
const outputName = 'property-floor-plan-optimized.png';

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--disable-gpu',
  '--user-data-dir=' + process.env.TEMP + '\\chrome-cdp-fp-' + Date.now(),
  '--remote-debugging-port=9225',
  targetUrl
]);

setTimeout(async () => {
  try {
    const listRes = await fetch('http://127.0.0.1:9225/json/list');
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
          height: 1000,
          deviceScaleFactor: 1,
          mobile: false,
          fitWindow: false
        }
      }));
    };

    ws.onmessage = async (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id === 1) {
        // Scroll to floor plan section
        ws.send(JSON.stringify({
          id: 2,
          method: 'Runtime.evaluate',
          params: { expression: 'const el = document.getElementById("floor-plans"); if (el) { el.scrollIntoView({ block: "center" }); } else { window.scrollTo(0, 1150); }' }
        }));
      } else if (msg.id === 2) {
        setTimeout(() => {
          ws.send(JSON.stringify({
            id: 3,
            method: 'Page.captureScreenshot',
            params: { format: 'png' }
          }));
        }, 1200);
      } else if (msg.id === 3) {
        const base64 = msg.result.data;
        const buffer = Buffer.from(base64, 'base64');
        const artPath = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\ee209a65-b2a9-4b72-8fa9-d8075ff0dea0\\' + outputName;
        fs.writeFileSync(artPath, buffer);
        console.log('Saved floor plan screenshot to', artPath, 'size:', buffer.length);
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
}, 2000);
