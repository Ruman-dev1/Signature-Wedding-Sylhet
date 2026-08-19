# Signature Wedding Sylhet

Marketing website for a wedding photography & videography business in Sylhet, Bangladesh. Includes a password-protected admin panel to manage site content.

## Pages

- `index.html` — Home
- `gallery.html` — Portfolio gallery with category filter
- `packages.html` — Pricing packages
- `about.html` — Brand story and team
- `stories.html` — Client stories
- `contact.html` — Contact + WhatsApp form
- `admin/login.html` — Admin panel login
- `admin/index.html` — Admin dashboard (manage content)

## Run locally

Requires Node.js 22.5+ (uses the built-in `node:sqlite` module).

```bash
npm install
npm start
```

Then open http://localhost:3000

## Admin Panel

Open http://localhost:3000/admin and sign in.

- **Default password:** `admin123` (change it right away under "Change Password" in the dashboard).

From the admin dashboard you can:

- **Packages** — add/edit/delete pricing packages, mark one as featured.
- **Gallery** — upload or link photos, set category (wedding / engagement / pre-wedding / event).
- **Films** — manage the videography section.
- **Testimonials** — add/edit client quotes.
- **Stories** — manage blog-style client stories.
- **Team** — manage team member profiles.
- **Site Settings** — WhatsApp number, email, hours, location, and social links.
- **Change Password** — update the admin password.

Changes appear on the public site immediately.

## Customize

- **Photos:** upload images via the admin panel, or edit them in `server/seed-data.js` (used when the database is first created).
- **Pricing:** edit in the admin panel.
- **WhatsApp number / email / socials:** edit in the admin panel (Site Settings).
- **Admin password:** change it in the admin panel, or edit `server/config.json` (auto-created on first run).

## Data & storage

- Content lives in `server/site.db` (SQLite, auto-created and seeded on first run).
- Uploaded images go to `public/uploads/`.
- To reset to default content, stop the server, remove `server/site.db`, and restart.

## Structure

```
server/server.js       Express server + REST API + admin API
server/db.js           SQLite schema and queries
server/auth.js         Session auth and password hashing
server/seed-data.js    Default content (first-run seed)
public/                The public website (HTML/CSS/JS)
public/admin/          Admin panel UI
public/js/content.js   Renders site content from /api/data (with static fallback)
```
