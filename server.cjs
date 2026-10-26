// Start file for the Node.js app. Run `npm run build` first.
// PORT picks the port (default 3000). HOST picks the address; use HOST=127.0.0.1 behind Apache so the port is not open to the internet.
const { createServer } = require('http');
const next = require('next');

const port = parseInt(process.env.PORT || '3000', 10);
const host = process.env.HOST || undefined;
const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, host, () => {
    console.log(`Signature Covers listening on ${host || '0.0.0.0'}:${port}`);
  });
});
