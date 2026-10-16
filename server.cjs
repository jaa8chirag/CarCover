// Start file for cPanel "Setup Node.js App" (Passenger). Run `npm run build` first.
const { createServer } = require('http');
const next = require('next');

const port = parseInt(process.env.PORT || '3000', 10);
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`Signature Covers listening on ${port}`);
  });
});
