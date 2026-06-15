# ✏️ ScribblePad

A beautiful, fully-featured personal notes app with Supabase backend.

## 🚀 Features

- ✅ Add / Edit / Delete notes
- ✅ Note fields: Title, Description, Category, Color
- ✅ 📌 Pin important notes (always shown on top)
- ✅ 🔍 Live search (title + description)
- ✅ 🏷️ Filter by category
- ✅ 🎨 8 note colors (like Google Keep)
- ✅ 🌙 Dark / Light theme toggle
- ✅ 💾 Stored in Supabase database
- ✅ 👤 Simple name-based user system (no auth)
- ✅ 📱 Fully responsive (mobile + desktop)

## ⚙️ Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Supabase is already configured!
The app connects to your **ScribblePad** project on Supabase.
- Project: `heqsrhhanrewllqispxg`
- The `notes` table is already created

### 3. Run locally
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

## 🗂️ Database Schema

```sql
notes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  description TEXT,
  category    TEXT DEFAULT 'General',
  color       TEXT DEFAULT '#ffffff',
  is_pinned   BOOLEAN DEFAULT FALSE,
  user_name   TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
)
```

## 📁 Project Structure

```
scribblepad/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    └── App.jsx      ← All components in one file
```

## 🎨 Tech Stack

- **React 18** + Vite
- **Supabase** (PostgreSQL database)
- **Inter** font (Google Fonts)
- Pure CSS-in-JS (no Tailwind dependency needed)

## 📝 How to Use

1. Open the app → Enter your name
2. Your notes are personal to your name
3. Add a note with title, description, category, color
4. Pin important notes → they sort to top
5. Search in real-time or filter by category
6. Toggle dark/light theme anytime
