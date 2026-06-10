# Portfolio (React + Vite)

A minimal React portfolio scaffold created for you.

Getting started

1. Install dependencies

```bash
npm install
```

2. Run the dev server

```bash
npm run dev
```

3. Open the URL shown by Vite (usually http://localhost:5173)

What I created

- `index.html` — app entry
- `package.json` — scripts and deps
- `src/main.jsx` — Vite entry
- `src/App.jsx` — main app component
- `src/components/ProjectCard.jsx` — project card
- `src/index.css` — basic styling

Admin editor (local only)

- Open the site and click "Open Editor" to add projects, certificates, and events. All data is saved to your browser's localStorage (no server required).
- Image uploads are stored in localStorage as base64 data URLs — for small portfolios this works fine locally. When you create a repository, push the code and we can wire an export/import or connect a simple backend.

Next steps

- Replace "Your Name" and contact details in `src/App.jsx`.
- Add your projects to the `projects` array in `src/App.jsx` or wire up a CMS.
- Add images and more styling as desired.

How to contribute content locally

1. Run the dev server (see above).
2. Click "Open Editor" in the top-right hero area.
3. Use the forms to add projects (with image), certificates (with image/link), and events. Changes are saved immediately to the browser.

Notes

- This app intentionally uses no database and stores all content in localStorage. If you clear browser storage the data will be lost.
- When you're ready to push, commit the project to a new GitHub repo and tell me — I can add an export/import JSON button or deploy to Vercel/GitHub Pages.

Enjoy! 🚀
