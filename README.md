# Albinus Soren — Full-stack portfolio

A Next.js App Router portfolio with a private admin dashboard and Supabase Postgres database. Visual direction: dark navy, white typography, electric-blue/purple glow, and Developer + Creator branding.

## Included
- Public responsive portfolio and project cards populated from Supabase
- Project category filters and light/dark theme toggle
- Contact form persisted to Supabase
- Admin sign-in, project create/edit/delete/publish controls, and message inbox
- HMAC-signed, HttpOnly admin session cookie
- Server-only Supabase service-role access; no database key in browser code
- SQL schema, seed projects, security headers, and Vercel config

## 1. Requirements
- Node.js 20.9+ (Node 22 LTS recommended)
- npm
- Supabase account
- Vercel account

## 2. Set up Supabase
1. Create a Supabase project.
2. Open **SQL Editor** in the Supabase dashboard.
3. Paste and run `supabase/schema.sql`.
4. From **Project Settings → API**, copy the Project URL and the new `secret` API key (preferred). The legacy `service_role` key is also accepted as a fallback. Treat the service-role key like a database password. Do not put it in client code or a `NEXT_PUBLIC_` variable.

RLS is enabled and no public policies are added. The app uses the service-role key only in server-side route handlers and server components.

## 3. Configure environment variables
Copy `.env.example` to `.env.local`, then set:
- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY` (preferred; legacy `SUPABASE_SERVICE_ROLE_KEY` is supported)
- `ADMIN_PASSWORD` — use a unique, long password
- `SESSION_SECRET` — generate a random secret of at least 32 characters
- `APP_ORIGIN` — your deployed origin, e.g. `https://albinussoren.in`

Generate a session secret on macOS/Linux with:
`openssl rand -base64 48`

Never commit `.env.local`. Keep secrets in Vercel Project Settings → Environment Variables for Production and Preview as appropriate.

## 4. Run locally
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.
Admin page: `http://localhost:3000/admin`.

For local contact submissions, set `APP_ORIGIN=http://localhost:3000`.

## 5. Deploy to Vercel
1. Push this folder to a new GitHub repository (do not include `.env.local`).
2. In Vercel, **Add New → Project**, import the repository.
3. Add all variables from `.env.local` in **Project Settings → Environment Variables**. Use production values for Production.
4. Deploy and check the build logs.
5. In Vercel **Settings → Domains**, add `albinussoren.in` and follow the exact DNS records Vercel shows. Do not guess the records; DNS can differ by setup.
6. If using `www.albinussoren.in`, add it too and choose one primary domain/redirect.
7. Update `APP_ORIGIN` to the canonical production origin, redeploy, and verify the contact form, `/admin`, and public project cards.

The domain is not automatically purchased or connected by this source package. A deployment is not considered live until Vercel reports Ready and the domain resolves successfully.

## 6. Admin use
- Visit `/admin`, enter `ADMIN_PASSWORD`.
- Create projects with a unique slug such as `my-new-project`.
- Set Published to show the project publicly.
- The inbox shows contact submissions. You can mark messages read/unread or delete them.
- Do not share the admin password. Change it in Vercel environment variables if it is exposed.

## 7. Important behavior / production notes
- Contact messages are stored in the database; this version does not send email notifications.
- The in-memory abuse limiter is intentionally not presented as a complete distributed rate limit. For production, add a managed rate-limit service/WAF rule and/or CAPTCHA.
- Admin authentication is a single-password gate. For multiple admins, audit logs, password reset, or stronger identity management, replace it with Supabase Auth and role-based access.
- Resume download is not linked until you add your verified `public/resume.pdf`.
- Replace any concept/project URLs with your actual live demos and repositories before advertising them.
- Supabase's service-role key bypasses RLS; keep it server-only and rotate it if exposed.
