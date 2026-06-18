# Kwizera Zaidi Portfolio (React + Vite)

A modern, premium developer portfolio scaffold built with React, Vite, and custom CSS styling. Features a stunning dark/light theme, glassmorphic UI cards, micro-animations, and a password-protected local Admin Editor.

## Features

- **Responsive Design**: Clean layout tailored for mobile, tablet, and desktop viewports.
- **Dark & Light Modes**: Seamless visual transitions with custom color themes.
- **Resume Layout**: Complete biography, education records, project grids, teaching activities, and hobbies/languages.
- **Admin Panel**: Click the **Admin** button in the top navigation bar (Passcode: `zaidi` or `admin`). Add/edit projects, works, certificates, skills, hobbies, languages, and profile pictures.
- **Serverless / Database-free**: All inputs are saved dynamically to the browser's `localStorage`. Uploaded images and CV files are automatically compiled as base64 DataURLs.
- **Portable Data**: Export your custom portfolio configuration as a JSON file, or import it to easily restore content across devices.

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

## How to Make Edits Permanent for Deployment

Since there is no backend database, your modifications are saved in your browser's local storage. To lock in these changes for all site visitors when deploying to platforms like Vercel or GitHub Pages:

1. Run the site locally and access the **Admin Panel** (passcode `zaidi` or `admin`).
2. Make your edits, upload your photo (`profile.jpeg`), and configure all credentials.
3. Click the **Download Data Config (JSON)** button in the sync section.
4. Replace the contents of the `defaultData` object in [src/App.jsx](file:///c:/Users/zaidi/OneDrive/Desktop/potoflio/src/App.jsx) with your downloaded JSON structure.
5. Build and commit your project changes to GitHub.
