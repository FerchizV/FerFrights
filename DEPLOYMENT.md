# Deploying FerFrights to Netlify

This site is already on GitHub at `github.com/FerchizV/FerFrights`. Netlify will build and host it for free, and automatically re-deploy every time you push a change to GitHub.

## One-time setup

1. Go to [netlify.com](https://app.netlify.com) and sign up / log in (you can sign in with your GitHub account — easiest option).
2. Click **Add new site → Import an existing project**.
3. Choose **GitHub**, then select the `FerchizV/FerFrights` repository.
4. Netlify should auto-detect the build settings from `netlify.toml` in this repo:
   - **Build command:** `npm run build`
   - **Publish directory:** `out`
   
   You shouldn't need to change anything here — just confirm and click **Deploy**.
5. Wait a couple of minutes for the first build to finish. Netlify will give you a random URL like `random-name-123.netlify.app` — that's your live site.

## Adding your API keys (OMDB ratings + Formspree contact form)

The site works without these — ratings just won't show, and the contact form will show a friendly error if submitted. Once you have them:

1. In Netlify, go to **Site configuration → Environment variables**.
2. Add these two variables:
   | Key | Value |
   |---|---|
   | `OMDB_API_KEY` | your free key from [omdbapi.com](https://www.omdbapi.com/apikey.aspx) |
   | `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | your form endpoint from [formspree.io](https://formspree.io), looks like `https://formspree.io/f/xxxxxxxx` |
3. Go to **Deploys** and click **Trigger deploy → Deploy site** so the new keys take effect (Netlify only reads env vars at build time, not automatically).

## Testing changes locally before they go live (optional but recommended)

If you want to preview a change (like adding a new movie) before it's live:

1. Open a terminal in the project folder.
2. Run `npm run dev` and open `http://localhost:3000` in your browser.
3. When it looks right, save your changes, then in Claude Code (or via git) commit and push to GitHub — Netlify will automatically rebuild and update the live site within a couple of minutes.

## Custom domain (later, not needed at launch)

The PRD explicitly deferred a custom domain — the free `.netlify.app` URL is fine for now. When you're ready, Netlify's **Domain management** section walks you through connecting a domain you buy elsewhere.
