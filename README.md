# itaysk.com router

Cloudflare Worker router for `itaysk.com`.

Routes:

- `/blog-legacy` redirects to `/blog-legacy/`.
- `/blog-legacy/*` proxies to `https://itaysk.github.io`.
- Everything else proxies to `https://about-3l8.pages.dev`.

```sh
npm test
npx wrangler login
npx wrangler deploy
```
