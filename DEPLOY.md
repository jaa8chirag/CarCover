# Deploy on cPanel / WHM (GitHub + MySQL)

The site is a Node.js app (Next.js). cPanel runs it with **Setup Node.js App** and pulls the code from GitHub with **Git Version Control**. Nothing runs on Vercel.

## 1. MySQL
cPanel > **MySQL Databases**
1. Create a database (e.g. `signature`) and a user with a strong password.
2. Add the user to the database with **ALL PRIVILEGES**.
3. Note the full names, cPanel adds your account prefix: `myuser_signature`, `myuser_dbuser`.

The tables are created automatically the first time the site uses the database. Nothing to import.

## 2. Node.js app
cPanel > **Setup Node.js App** > Create Application
- Node.js version: **20 or newer** (Next.js 16 needs it)
- Application mode: **Production**
- Application root: `APPNAME` (a folder in your home directory, e.g. `signaturecovers`)
- Application URL: your domain
- Application startup file: **server.cjs**

Under **Environment variables** add (same as `.env.example`):
`DB_HOST` (`localhost`), `DB_PORT` (`3306`), `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `ADMIN_PASSWORD`, `ADMIN_SECRET`, and optionally `SHIPROCKET_API_KEY`.

## 3. GitHub
cPanel > **Git Version Control** > Create
- Clone URL: `https://github.com/jaa8chirag/CarCover.git` (for a private repo add a deploy key under the repo's Settings > Deploy keys and use the `git@github.com:...` URL)
- Repository path: `repositories/CarCover`

Open `.cpanel.yml` in the repo and replace `CPANELUSER` and `APPNAME` (same `APPNAME` as step 2; the Node version folder `20` must match the version you chose). Commit and push.

## 4. Deploy
Git Version Control > Manage > **Update from Remote**, then **Deploy HEAD Commit**.
This copies the code into the app folder, runs `npm ci` and `npm run build`, and restarts the app. Do this again after every push.

## 5. Check
- `https://yourdomain/` opens the site
- `https://yourdomain/admin` login with `ADMIN_PASSWORD`
- `https://yourdomain/api/shiprocket/products?page=1&limit=100` returns the catalog

## Notes
- Put the domain on HTTPS (AutoSSL). The admin cookie is only sent over HTTPS in production.
- If the build is killed for memory, ask the host for more RAM for the account, or build locally and upload the `.next` folder.
- Shiprocket calls `/api/shiprocket/*` on your domain; give it the same `SHIPROCKET_API_KEY` as the `X-Api-Key`.
