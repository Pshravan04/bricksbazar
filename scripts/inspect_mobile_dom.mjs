import { spawn } from 'child_process';

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--disable-gpu',
  '--user-data-dir=' + process.env.TEMP + '\\chrome-debug-mobile',
  '--remote-debugging-port=9222',
  '--window-size=390,844',
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
      const expr = `
        (() => {
          const results = [];
          const width = window.innerWidth;
          const scrollWidth = document.documentElement.scrollWidth;
          document.querySelectorAll('*').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.right > 391) {
              results.push({
                tag: el.tagName,
                className: typeof el.className === 'string' ? el.className.substring(0, 60) : '',
                right: Math.round(rect.right),
                width: Math.round(rect.width)
              });
            }
          });
          return { width, scrollWidth, count: results.length, samples: results.slice(0, 10) };
        })()
      `;

      ws.send(JSON.stringify({
        id: 1,
        method: 'Runtime.evaluate',
        params: { expression: expr, returnByValue: true }
      }));
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      console.log(JSON.stringify(msg, null, 2));
      ws.close();
      chrome.kill();
      process.exit(0);
    };

  } catch (err) {
    console.error('Error:', err);
    chrome.kill();
    process.exit(1);
  }
}, 2500);
