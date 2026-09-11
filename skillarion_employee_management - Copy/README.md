# SkillArion Development — Portal

## Latest changes
- **Login persists across refresh.** Refreshing the page no longer logs you out.
- **Attendance status renamed:** "Present"/"Absent" are now "Working"/"Inactive" everywhere (dashboard, filters, reports, insights).
- **Projects → Analysis tab.** Alongside the Projects list, Admin now has an "Analysis" tab showing, per intern: which projects they're on, total tasks, approved/in-progress/changes-requested counts, and a completion %.
- **Internship Progress table** no longer has a separate Tasks column (kept Attendance %, Days Completed, Status).
- **Announcements now support media** (photo/file upload, shown inline or as a download), and interns get a "New" badge on unread announcements plus an unread-count badge on the Announcements sidebar item, in addition to the existing Notifications feed.
- **Real file storage.** Business Development uploads, Daily Work Log photos, Project documents, and Announcement media now upload to a proper **Supabase Storage** bucket instead of being embedded as base64 in the database — only the file's URL is stored.
- **New: Daily Work Log.** Interns can post a day-to-day work update (description + optional photo + optional location) — visible to their teammates and Admin. Admin can filter by intern and remove posts; interns can remove their own.
- Admin → Add/Edit Person now has a **Business Development access** switch — only interns with it on see the Business Development tab.
- New **Insights** page: Admin sees a 7-day attendance chart + a project task-completion chart; interns see days worked, current streak, and a 14-day hours-worked chart.
- Admin → Projects now takes a project **title**, an optional **document** (downloadable by assigned interns), and a **team lead** (chosen from the assigned interns).

## Run it in VS Code

1. **Unzip** this project folder somewhere on your machine, then open that folder in VS Code
   (`File → Open Folder…`).

2. **Open a terminal in VS Code**: `` Ctrl+` `` (Windows/Linux) or `` Cmd+` `` (Mac) —
   or `Terminal → New Terminal`.

3. **Install dependencies** (needs [Node.js](https://nodejs.org) 18+ installed):
   ```
   npm install
   ```

4. **Start the dev server**:
   ```
   npm run dev
   ```

5. VS Code will print a local URL, usually `http://localhost:5173`. Ctrl/Cmd-click it in the
   terminal, or paste it into your browser.

That's it — the portal loads there, live-reloading as you edit files in `src/`.

## Sign in

There's no public sign-up — accounts are seeded for testing:

- **Admin** — you'll need to check `src/App.jsx` → `seedDb()` for the current seeded
  username/password (the login screen no longer displays them).
- **Student/Team** — same place, second seeded user.

Once signed in as Admin you can create real accounts for everyone else from **Users → Add Person**.

## Backend setup (Supabase)

All of the app's data (users, attendance, tasks, projects, leave requests,
announcements, etc.) is saved as one JSON record through a `window.storage`
API, and every uploaded photo/document goes through a `window.uploadFile`
API. `src/main.jsx` backs both of those with **Supabase** — a database table
for the data, and a **Storage bucket** for the actual files — so everything
is visible from any device/browser once it's connected, not just the machine
you're working on.

**1. Set up your Supabase project**

- Create a free project at [supabase.com](https://supabase.com) if you don't have one.
- Open your project → **SQL Editor** → paste in the contents of
  [`supabase/schema.sql`](./supabase/schema.sql) → **Run**.
  This creates:
  - a table, `kv_store`, that holds all the app's data, and
  - a Storage bucket, `portal-files`, that holds every uploaded photo/document.

**2. Add your credentials**

- In Supabase: **Settings → API**, copy the **Project URL** and the **anon public** key.
- Copy `.env.example` to `.env` (a blank `.env` is already included — just fill it in)
  and paste those two values in:
  ```
  VITE_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
  VITE_SUPABASE_ANON_KEY=YOUR-ANON-PUBLIC-KEY
  ```
- Restart `npm run dev` after editing `.env` (Vite only reads it on startup).

**3. That's it** — the portal now reads/writes its data through Supabase, and every
upload (Business Development files, Daily Work Log photos, Project documents) goes
into the `portal-files` bucket. If `.env` is left empty, the app automatically falls
back to your browser's `localStorage` for data and to embedding uploads as base64
instead, so it still runs fine without any Supabase setup for local testing.

⚠️ **Note on security:** the app does its own username/password login screen rather
than using Supabase Auth, so the anon key needs read/write access to the `kv_store`
table and the `portal-files` bucket for the app to work at all (see the comments in
`supabase/schema.sql`). That means anyone with your Supabase URL + anon key could
read/overwrite the data or files directly, bypassing the portal's login. Fine for an
internal/demo tool; for a production deployment with sensitive data, that access
should be moved behind a server-side function instead of called directly from the
browser.

## Project structure

```
skillarion-portal/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── src/
    ├── main.jsx      # entry point + storage polyfill
    ├── App.jsx        # the entire portal (all pages/components)
    └── index.css      # Tailwind
```

## Build for production

```
npm run build
```

Outputs a static site to `dist/` — deployable to Vercel, Netlify, GitHub Pages, or any
static host.
