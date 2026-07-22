# Deploying FerFrights to Vercel

This site is already on GitHub at `github.com/FerchizV/FerFrights`. Vercel will build and host it for free, and automatically re-deploy every time you push a change to GitHub.

## One-time setup

1. Go to [vercel.com](https://vercel.com) and log in with your existing account.
2. Click **Add New → Project**.
3. Choose **Import Git Repository**, then select `FerchizV/FerFrights`.
4. Vercel auto-detects this as a Next.js project — you shouldn't need to change any build settings. Just confirm and click **Deploy**.
5. Wait a couple of minutes for the first build to finish. Vercel will give you a URL like `ferfrights.vercel.app` — that's your live site.

## Adding your API keys (OMDB ratings + Formspree contact form)

The site works without these — ratings just won't show, and the contact form will show a friendly error if submitted. Once you have them:

1. In Vercel, go to your project's **Settings → Environment Variables**.
2. Add these two variables (Production environment is fine, or all environments):
   | Key | Value |
   |---|---|
   | `OMDB_API_KEY` | your free key from [omdbapi.com](https://www.omdbapi.com/apikey.aspx) |
   | `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | your form endpoint from [formspree.io](https://formspree.io), looks like `https://formspree.io/f/xxxxxxxx` |
3. Go to **Deployments**, open the latest one, and click **Redeploy** so the new keys take effect (Vercel only reads env vars at build time, not automatically).

## Testing changes locally before they go live (optional but recommended)

If you want to preview a change (like adding a new movie) before it's live:

1. Open a terminal in the project folder.
2. Run `npm run dev` and open `http://localhost:3000` in your browser.
3. When it looks right, save your changes, then in Claude Code (or via git) commit and push to GitHub — Vercel will automatically rebuild and update the live site within a couple of minutes.

## Custom domain (later, not needed at launch)

The PRD explicitly deferred a custom domain — the free `.vercel.app` URL is fine for now. When you're ready, your project's **Settings → Domains** section walks you through connecting a domain you buy elsewhere.
