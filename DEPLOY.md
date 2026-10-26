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
`DB_HOST` (`localhost`), `DB_PORT` (`3306`), `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `ADMIN_PASSWORD`, `ADMIN_SECRET`, `SITE_URL` (your live address, e.g. `https://yourdomain.com`), and, once Shiprocket gives them to you, `SHIPROCKET_API_KEY` and `SHIPROCKET_API_SECRET`.

## 3. GitHub
cPanel > **Git Version Control** > Create
- Clone URL: `https://github.com/jaa8chirag/CarCover.git` (for a private repo add a deploy key under the repo's Settings > Deploy keys and use the `git@github.com:...` URL)
- Repository path: `repositories/CarCover`

Open `.cpanel.yml` in the repo and replace `CPANELUSER` and `APPNAME` (same `APPNAME` as step 2; the Node version folder `20` must match the version you chose). Commit and push.

## 4. Deploy & Live Update

### Option A: 1-Line Terminal Command (Recommended for WHM / Terminal)
Run this single command in the terminal to pull changes, clear cache, rebuild, fix permissions and restart the Node.js process:

```bash
cd /home/thesignaturecove/signaturecovers && git pull origin main && rm -rf .next/cache && npm run build && chown -R thesignaturecove:thesignaturecove /home/thesignaturecove/signaturecovers && pkill -9 -u thesignaturecove -f node
```

> **Why this command is required:**
> 1. `rm -rf .next/cache` prevents outdated HTML from serving deleted chunk hashes.
> 2. `chown -R thesignaturecove:thesignaturecove` ensures the cPanel user has full read/write access if the build was run as root.
> 3. `pkill -9 -u thesignaturecove -f node` kills the frozen Node process in RAM so Passenger immediately launches a fresh process.

### Option B: cPanel Git Version Control (1-Click UI)
Git Version Control > Manage > **Update from Remote**, then **Deploy HEAD Commit**.
After deployment, go to **Setup Node.js App** and click **Restart (🔄)**.

## 5. Check
- `https://yourdomain/` opens the site
- `https://yourdomain/admin` login with `ADMIN_PASSWORD`
- `https://yourdomain/api/shiprocket/products?page=1&limit=100` returns the catalog

## Notes
- Put the domain on HTTPS (AutoSSL). The admin cookie is only sent over HTTPS in production.
- If the browser shows "This page couldn't load" or chunk 500 error after deployment, run the 1-Line Terminal Command above and test in an **Incognito Window (`Ctrl + Shift + N`)**.
- If the build is killed for memory, build locally and upload the `next_build.zip` into the app folder, extract it, and restart.
- Shiprocket: see `HANDOVER.md`, section "Shiprocket".
