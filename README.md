# LogiStart Site

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy on Vercel

1. Upload this folder to a GitHub repo.
2. In Vercel, click **Add New Project**.
3. Import the GitHub repo.
4. Framework preset: **Vite**.
5. Build command: `npm run build`
6. Output directory: `dist`
7. Deploy.

## Domain

After deploy, in Vercel:
- Go to **Project > Settings > Domains**
- Add `www.logistarthq.com`
- Add `logistarthq.com`
- Copy the DNS records Vercel gives you into Namecheap.
