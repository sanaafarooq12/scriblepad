import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://heqsrhhanrewllqispxg.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlcXNyaGhhbnJld2xscWlzcHhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0MTgzOTgsImV4cCI6MjA5Njk5NDM5OH0.tquWPIXVer36Dn6djWqQfrjB-HypheW4iga2svIPuH0";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const CATEGORIES = ["All", "General", "Work", "Personal", "Study", "Ideas", "Shopping", "Health"];
const NOTE_COLORS = [
  { label: "White", value: "#ffffff" },
  { label: "Yellow", value: "#fef9c3" },
  { label: "Green", value: "#dcfce7" },
  { label: "Blue", value: "#dbeafe" },
  { label: "Pink", value: "#fce7f3" },
  { label: "Purple", value: "#ede9fe" },
  { label: "Orange", value: "#ffedd5" },
  { label: "Red", value: "#fee2e2" },
];

const PIN_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 4a2 2 0 0 1 2 2v1l2 2v2h-6l-1 5H9l-1-5H2V9l2-2V6a2 2 0 0 1 2-2h10zm-4 13a2 2 0 0 0-2 2v1h4v-1a2 2 0 0 0-2-2z" />
  </svg>
);

const SEARCH_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);

const CLOSE_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const EDIT_ICON = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TRASH_ICON = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6M9 6V4h6v2" />
  </svg>
);

const MOON_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const SUN_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const PLUS_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const NOTE_ICON = (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

function NoteModal({ note, onClose, onSave, isDark }) {
  const [form, setForm] = useState({
    title: note?.title || "",
    description: note?.description || "",
    category: note?.category || "General",
    color: note?.color || "#ffffff",
    is_pinned: note?.is_pinned || false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!form.title.trim()) { setError("Title is required"); return; }
    setSaving(true);
    setError("");
    await onSave(form);
    setSaving(false);
  };

  const inputClass = `modal-input ${isDark ? "modal-input-dark" : "modal-input-light"}`;
  const labelClass = `modal-label ${isDark ? "modal-label-dark" : "modal-label-light"}`;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`modal-box ${isDark ? "dark-modal" : "light-modal"}`}>
        <div className="modal-header">
          <h2 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            {note ? "✏️ Edit Note" : "📝 New Note"}
          </h2>
          <button onClick={onClose} className={`icon-btn ${isDark ? "text-gray-400 hover:text-white" : "text-gray-400 hover:text-gray-700"}`}>
            {CLOSE_ICON}
          </button>
        </div>

        <div className="modal-body">
          <div className="field-group">
            <label className={labelClass}>Title *</label>
            <input
              className={inputClass}
              placeholder="Note title..."
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              autoFocus
            />
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
          </div>

          <div className="field-group">
            <label className={labelClass}>Description</label>
            <textarea
              className={`${inputClass} resize-none`}
              rows={4}
              placeholder="Write your note here..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="field-group">
            <label className={labelClass}>Category</label>
            <select
              className={inputClass}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {CATEGORIES.filter((c) => c !== "All").map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="field-group">
            <label className={labelClass}>Note Color</label>
            <div className="color-grid">
              {NOTE_COLORS.map(({ label, value }) => (
                <button
                  key={value}
                  title={label}
                  onClick={() => setForm({ ...form, color: value })}
                  className={`color-swatch ${form.color === value ? "selected" : ""}`}
                  style={{ backgroundColor: value }}
                />
              ))}
            </div>
          </div>

          <div className="field-group">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <div
                className={`pin-toggle ${form.is_pinned ? "pinned" : ""}`}
                onClick={() => setForm({ ...form, is_pinned: !form.is_pinned })}
              >
                <div className="pin-thumb" />
              </div>
              <span className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                📌 Pin this note
              </span>
            </label>
          </div>
        </div>

        <div className="modal-footer">
          <button
            onClick={onClose}
            className={`btn-secondary ${isDark ? "dark-btn-sec" : "light-btn-sec"}`}
          >
            Cancel
          </button>
          <button onClick={handleSave} disabled={saving} className="btn-primary">
            {saving ? "Saving..." : note ? "Update Note" : "Add Note"}
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirm({ note, onClose, onConfirm, isDark }) {
  const [deleting, setDeleting] = useState(false);
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`delete-box ${isDark ? "dark-modal" : "light-modal"}`}>
        <div className="text-4xl mb-3">🗑️</div>
        <h3 className={`text-lg font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>Delete Note?</h3>
        <p className={`text-sm mb-5 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          "<strong>{note.title}</strong>" will be permanently deleted.
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={onClose} className={`btn-secondary ${isDark ? "dark-btn-sec" : "light-btn-sec"}`}>
            Cancel
          </button>
          <button
            onClick={async () => { setDeleting(true); await onConfirm(); }}
            disabled={deleting}
            className="btn-danger"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

function NoteCard({ note, onEdit, onDelete, onTogglePin, isDark }) {
  const isLight = ["#ffffff", "#fef9c3", "#dcfce7", "#dbeafe", "#fce7f3", "#ede9fe", "#ffedd5", "#fee2e2"].includes(note.color);
  const cardText = isLight ? "#1a1a2e" : "#fff";

  return (
    <div
      className={`note-card ${note.is_pinned ? "pinned-card" : ""}`}
      style={{ backgroundColor: note.color, "--card-text": cardText }}
    >
      {note.is_pinned && (
        <div className="pin-badge">📌</div>
      )}
      <div className="note-category-tag">{note.category}</div>
      <h3 className="note-title">{note.title}</h3>
      {note.description && (
        <p className="note-desc">{note.description}</p>
      )}
      <div className="note-footer">
        <span className="note-date">
          {new Date(note.updated_at).toLocaleDateString("en-GB", {
            day: "numeric", month: "short", year: "numeric"
          })}
        </span>
        <div className="note-actions">
          <button
            onClick={() => onTogglePin(note)}
            title={note.is_pinned ? "Unpin" : "Pin"}
            className={`action-btn ${note.is_pinned ? "active-pin" : ""}`}
          >
            {PIN_ICON}
          </button>
          <button onClick={() => onEdit(note)} title="Edit" className="action-btn">
            {EDIT_ICON}
          </button>
          <button onClick={() => onDelete(note)} title="Delete" className="action-btn danger-btn">
            {TRASH_ICON}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem("sp-theme") === "dark");
  const [userName, setUserName] = useState(() => localStorage.getItem("sp-user") || "");
  const [nameInput, setNameInput] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [deleteNote, setDeleteNote] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("sp-theme", next ? "dark" : "light");
  };

  const fetchNotes = useCallback(async () => {
    if (!userName) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("user_name", userName)
      .order("is_pinned", { ascending: false })
      .order("updated_at", { ascending: false });
    if (!error) setNotes(data || []);
    setLoading(false);
  }, [userName]);

  useEffect(() => { fetchNotes(); }, [fetchNotes]);

  const handleLogin = () => {
    const name = nameInput.trim();
    if (!name) return;
    localStorage.setItem("sp-user", name);
    setUserName(name);
    setNameInput("");
  };

  const handleLogout = () => {
    setUserName("");
    setNotes([]);
    localStorage.removeItem("sp-user");
  };

  const handleSaveNote = async (form) => {
    if (editNote) {
      const { error } = await supabase
        .from("notes")
        .update({ ...form, updated_at: new Date().toISOString() })
        .eq("id", editNote.id);
      if (!error) { showToast("Note updated! ✅"); await fetchNotes(); }
      else showToast("Failed to update note", "error");
    } else {
      const { error } = await supabase
        .from("notes")
        .insert([{ ...form, user_name: userName }]);
      if (!error) { showToast("Note added! 🎉"); await fetchNotes(); }
      else showToast("Failed to add note", "error");
    }
    setShowModal(false);
    setEditNote(null);
  };

  const handleDelete = async () => {
    const { error } = await supabase.from("notes").delete().eq("id", deleteNote.id);
    if (!error) { showToast("Note deleted 🗑️"); await fetchNotes(); }
    else showToast("Failed to delete note", "error");
    setDeleteNote(null);
  };

  const handleTogglePin = async (note) => {
    const { error } = await supabase
      .from("notes")
      .update({ is_pinned: !note.is_pinned })
      .eq("id", note.id);
    if (!error) { await fetchNotes(); showToast(note.is_pinned ? "Unpinned" : "📌 Pinned!"); }
  };

  const filtered = notes.filter((n) => {
    const matchSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      (n.description || "").toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || n.category === activeCategory;
    return matchSearch && matchCat;
  });

  const pinnedCount = notes.filter((n) => n.is_pinned).length;
  const bg = isDark ? "#0f0f1a" : "#f5f5f7";
  const surface = isDark ? "#1a1a2e" : "#ffffff";
  const border = isDark ? "#2a2a45" : "#e5e7eb";
  const text = isDark ? "#e2e8f0" : "#1a1a2e";
  const subtext = isDark ? "#94a3b8" : "#6b7280";
  const inputBg = isDark ? "#1e1e35" : "#f9fafb";

  // Login screen
  if (!userName) {
    return (
      <>
        <style>{getStyles(isDark, bg, surface, border, text, subtext, inputBg)}</style>
        <div className="login-screen">
          <button onClick={toggleTheme} className="theme-btn top-right-btn">
            {isDark ? SUN_ICON : MOON_ICON}
          </button>
          <div className={`login-card ${isDark ? "dark-modal" : "light-modal"}`}>
            <div className="login-logo">✏️</div>
            <h1 className="login-title">ScribblePad</h1>
            <p className={`login-sub ${isDark ? "text-slate-400" : "text-gray-500"}`}>
              Your personal notes — organized, searchable, and pinnable.
            </p>
            <div className="login-form">
              <input
                className="login-input"
                placeholder="Enter your name or ID..."
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                autoFocus
              />
              <button onClick={handleLogin} className="btn-primary login-go-btn" disabled={!nameInput.trim()}>
                Start Writing →
              </button>
            </div>
            <p className={`login-hint ${isDark ? "text-slate-500" : "text-gray-400"}`}>
              No password needed — just your name!
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{getStyles(isDark, bg, surface, border, text, subtext, inputBg)}</style>

      {/* Header */}
      <header className="app-header">
        <div className="header-inner">
          <div className="header-brand">
            <span className="brand-icon">✏️</span>
            <div>
              <h1 className="brand-name">ScribblePad</h1>
              <p className="brand-user">Hey, {userName}! 👋</p>
            </div>
          </div>
          <div className="header-actions">
            <div className="stats-pill">
              <span>{notes.length} notes</span>
              {pinnedCount > 0 && <span className="pin-stat">· {pinnedCount} pinned</span>}
            </div>
            <button onClick={toggleTheme} className="theme-btn" title="Toggle theme">
              {isDark ? SUN_ICON : MOON_ICON}
            </button>
            <button onClick={handleLogout} className="logout-btn">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="main-content">
        {/* Search + Add */}
        <div className="toolbar">
          <div className="search-box">
            <span className="search-icon">{SEARCH_ICON}</span>
            <input
              className="search-input"
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch("")} className="clear-search">
                {CLOSE_ICON}
              </button>
            )}
          </div>
          <button
            onClick={() => { setEditNote(null); setShowModal(true); }}
            className="btn-primary add-btn"
          >
            {PLUS_ICON} Add Note
          </button>
        </div>

        {/* Category Filter */}
        <div className="cat-scroll">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`cat-chip ${activeCategory === cat ? "cat-active" : "cat-inactive"}`}
            >
              {cat}
              {cat !== "All" && (
                <span className="cat-count">
                  {notes.filter((n) => n.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Notes Grid */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
            <p>Loading your notes...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className={`empty-icon ${isDark ? "text-gray-600" : "text-gray-300"}`}>
              {NOTE_ICON}
            </div>
            <p className={`empty-title ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              {search ? `No notes matching "${search}"` : activeCategory !== "All" ? `No notes in ${activeCategory}` : "No notes yet"}
            </p>
            {!search && (
              <button
                onClick={() => { setEditNote(null); setShowModal(true); }}
                className="btn-primary mt-4"
              >
                {PLUS_ICON} Create your first note
              </button>
            )}
          </div>
        ) : (
          <>
            {search && (
              <p className={`results-count ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "{search}"
              </p>
            )}
            <div className="notes-grid">
              {filtered.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={(n) => { setEditNote(n); setShowModal(true); }}
                  onDelete={setDeleteNote}
                  onTogglePin={handleTogglePin}
                  isDark={isDark}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Modals */}
      {showModal && (
        <NoteModal
          note={editNote}
          onClose={() => { setShowModal(false); setEditNote(null); }}
          onSave={handleSaveNote}
          isDark={isDark}
        />
      )}
      {deleteNote && (
        <DeleteConfirm
          note={deleteNote}
          onClose={() => setDeleteNote(null)}
          onConfirm={handleDelete}
          isDark={isDark}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className={`toast ${toast.type === "error" ? "toast-error" : "toast-success"}`}>
          {toast.msg}
        </div>
      )}
    </>
  );
}

function getStyles(isDark, bg, surface, border, text, subtext, inputBg) {
  return `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: ${bg}; color: ${text}; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; min-height: 100vh; transition: background 0.3s, color 0.3s; }

    /* Header */
    .app-header {
      position: sticky; top: 0; z-index: 50;
      background: ${isDark ? "rgba(15,15,26,0.95)" : "rgba(255,255,255,0.95)"};
      backdrop-filter: blur(12px);
      border-bottom: 1px solid ${border};
      padding: 0 1.5rem;
    }
    .header-inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 0.9rem 0; gap: 1rem; }
    .header-brand { display: flex; align-items: center; gap: 0.75rem; }
    .brand-icon { font-size: 1.75rem; }
    .brand-name { font-size: 1.35rem; font-weight: 800; background: linear-gradient(135deg, #6366f1, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: -0.5px; }
    .brand-user { font-size: 0.75rem; color: ${subtext}; }
    .header-actions { display: flex; align-items: center; gap: 0.75rem; }
    .stats-pill { font-size: 0.75rem; color: ${subtext}; background: ${isDark ? "#2a2a45" : "#f3f4f6"}; padding: 0.3rem 0.75rem; border-radius: 999px; }
    .pin-stat { color: #f59e0b; font-weight: 600; }
    .theme-btn { width: 36px; height: 36px; border-radius: 50%; border: 1px solid ${border}; background: ${inputBg}; color: ${text}; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; }
    .theme-btn:hover { background: ${isDark ? "#2a2a45" : "#e5e7eb"}; transform: scale(1.05); }
    .logout-btn { font-size: 0.8rem; color: ${subtext}; border: 1px solid ${border}; background: transparent; padding: 0.4rem 0.9rem; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
    .logout-btn:hover { color: #ef4444; border-color: #ef4444; }

    /* Main */
    .main-content { max-width: 1200px; margin: 0 auto; padding: 1.5rem; }

    /* Toolbar */
    .toolbar { display: flex; gap: 1rem; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; }
    .search-box { flex: 1; min-width: 200px; position: relative; display: flex; align-items: center; }
    .search-icon { position: absolute; left: 0.85rem; color: ${subtext}; pointer-events: none; display: flex; }
    .search-input { width: 100%; padding: 0.65rem 2.5rem; border-radius: 12px; border: 1px solid ${border}; background: ${surface}; color: ${text}; font-size: 0.9rem; outline: none; transition: all 0.2s; }
    .search-input:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }
    .search-input::placeholder { color: ${subtext}; }
    .clear-search { position: absolute; right: 0.75rem; color: ${subtext}; cursor: pointer; background: none; border: none; display: flex; padding: 0.25rem; border-radius: 4px; }
    .clear-search:hover { color: ${text}; }
    .add-btn { display: flex; align-items: center; gap: 0.5rem; white-space: nowrap; }

    /* Category chips */
    .cat-scroll { display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.5rem; margin-bottom: 1.5rem; scrollbar-width: none; }
    .cat-scroll::-webkit-scrollbar { display: none; }
    .cat-chip { display: flex; align-items: center; gap: 0.4rem; padding: 0.4rem 0.9rem; border-radius: 999px; border: 1px solid ${border}; font-size: 0.8rem; font-weight: 500; cursor: pointer; white-space: nowrap; transition: all 0.2s; background: ${surface}; color: ${text}; }
    .cat-chip:hover { border-color: #6366f1; color: #6366f1; }
    .cat-active { background: #6366f1 !important; color: #fff !important; border-color: #6366f1 !important; }
    .cat-count { background: rgba(255,255,255,0.2); padding: 0.05rem 0.4rem; border-radius: 999px; font-size: 0.7rem; }
    .cat-chip:not(.cat-active) .cat-count { background: ${isDark ? "#2a2a45" : "#f3f4f6"}; color: ${subtext}; }

    /* Notes Grid */
    .notes-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 1rem; }
    .results-count { color: ${subtext}; font-size: 0.85rem; margin-bottom: 1rem; }

    /* Note Card */
    .note-card { border-radius: 16px; padding: 1.1rem; position: relative; transition: transform 0.2s, box-shadow 0.2s; border: 1px solid rgba(0,0,0,0.06); overflow: hidden; }
    .note-card:hover { transform: translateY(-3px); box-shadow: 0 8px 30px rgba(0,0,0,0.12); }
    .pinned-card { box-shadow: 0 0 0 2px #f59e0b; }
    .pin-badge { position: absolute; top: 0.7rem; right: 0.7rem; font-size: 0.85rem; }
    .note-category-tag { display: inline-block; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; padding: 0.2rem 0.6rem; border-radius: 999px; background: rgba(0,0,0,0.08); color: var(--card-text); margin-bottom: 0.5rem; }
    .note-title { font-size: 1rem; font-weight: 700; color: var(--card-text); margin-bottom: 0.4rem; line-height: 1.3; word-break: break-word; }
    .note-desc { font-size: 0.85rem; color: var(--card-text); opacity: 0.75; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 0.75rem; word-break: break-word; }
    .note-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 0.75rem; border-top: 1px solid rgba(0,0,0,0.08); padding-top: 0.65rem; }
    .note-date { font-size: 0.7rem; color: var(--card-text); opacity: 0.6; }
    .note-actions { display: flex; gap: 0.25rem; }
    .action-btn { width: 28px; height: 28px; border-radius: 8px; border: none; background: rgba(0,0,0,0.07); color: var(--card-text); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s; opacity: 0.7; }
    .action-btn:hover { opacity: 1; background: rgba(0,0,0,0.15); transform: scale(1.1); }
    .active-pin { background: rgba(245,158,11,0.3) !important; opacity: 1 !important; color: #b45309 !important; }
    .danger-btn:hover { background: rgba(239,68,68,0.2) !important; color: #dc2626 !important; }

    /* Buttons */
    .btn-primary { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: #fff; border: none; padding: 0.6rem 1.25rem; border-radius: 10px; font-size: 0.88rem; font-weight: 600; cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 0.4rem; }
    .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 15px rgba(99,102,241,0.4); }
    .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
    .btn-secondary { padding: 0.6rem 1.25rem; border-radius: 10px; font-size: 0.88rem; font-weight: 600; cursor: pointer; transition: all 0.2s; border: 1px solid ${border}; }
    .dark-btn-sec { background: #2a2a45; color: #e2e8f0; }
    .light-btn-sec { background: #f3f4f6; color: #374151; }
    .btn-danger { background: #ef4444; color: #fff; border: none; padding: 0.6rem 1.25rem; border-radius: 10px; font-size: 0.88rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
    .btn-danger:hover { background: #dc2626; }

    /* Modal */
    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.55); backdrop-filter: blur(6px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 1.25rem; }
    .modal-box { width: 100%; max-width: 580px; border-radius: 24px; overflow: hidden; animation: slideUp 0.28s cubic-bezier(0.34,1.56,0.64,1); }
    .delete-box { width: 100%; max-width: 400px; border-radius: 24px; padding: 2.5rem; text-align: center; animation: slideUp 0.28s ease; }
    .dark-modal { background: #16162a; border: 1px solid #2e2e50; box-shadow: 0 30px 80px rgba(0,0,0,0.5); }
    .light-modal { background: #ffffff; border: 1px solid #e0e7ff; box-shadow: 0 30px 80px rgba(99,102,241,0.12); }
    .modal-header { display: flex; align-items: center; justify-content: space-between; padding: 1.5rem 2rem; border-bottom: 1px solid ${border}; }
    .modal-header h2 { font-size: 1.2rem; font-weight: 800; letter-spacing: -0.3px; color: ${text}; }
    .modal-body { padding: 1.75rem 2rem; display: flex; flex-direction: column; gap: 1.4rem; max-height: 65vh; overflow-y: auto; }
    .modal-body::-webkit-scrollbar { width: 4px; }
    .modal-body::-webkit-scrollbar-track { background: transparent; }
    .modal-body::-webkit-scrollbar-thumb { background: ${isDark ? "#3a3a60" : "#d1d5db"}; border-radius: 4px; }
    .modal-footer { padding: 1.25rem 2rem; border-top: 1px solid ${border}; display: flex; justify-content: flex-end; gap: 0.75rem; background: ${isDark ? "rgba(0,0,0,0.1)" : "rgba(248,250,252,0.8)"}; }
    .icon-btn { background: none; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 10px; transition: background 0.2s; color: ${subtext}; }
    .icon-btn:hover { background: ${isDark ? "#2a2a45" : "#f3f4f6"}; color: ${text}; }
    .field-group { display: flex; flex-direction: column; gap: 0.5rem; }

    /* Modal input fields - upgraded */
    .modal-label { display: block; font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; }
    .modal-label-dark { color: #7c7caa; }
    .modal-label-light { color: #6366f1; }
    .modal-input {
      width: 100%; padding: 0.85rem 1.1rem;
      border-radius: 12px; border: 2px solid transparent;
      font-size: 0.95rem; line-height: 1.5;
      outline: none; transition: all 0.2s;
      font-family: inherit;
    }
    .modal-input-dark {
      background: #1e1e38; border-color: #2e2e50;
      color: #e8e8ff; caret-color: #8b5cf6;
    }
    .modal-input-dark::placeholder { color: #5a5a80; }
    .modal-input-dark:focus { border-color: #6366f1; background: #22223e; box-shadow: 0 0 0 4px rgba(99,102,241,0.15); }
    .modal-input-light {
      background: #f8f9ff; border-color: #e0e7ff;
      color: #1a1a3e; caret-color: #6366f1;
    }
    .modal-input-light::placeholder { color: #a5b4fc; }
    .modal-input-light:focus { border-color: #6366f1; background: #fff; box-shadow: 0 0 0 4px rgba(99,102,241,0.1); }
    select.modal-input { cursor: pointer; }
    select.modal-input-dark option { background: #1e1e38; color: #e8e8ff; }
    select.modal-input-light option { background: #ffffff; color: #1a1a3e; }
    textarea.modal-input { resize: none; }

    @keyframes slideUp { from { transform: translateY(24px) scale(0.97); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }

    /* Color picker */
    .color-grid { display: flex; flex-wrap: wrap; gap: 0.6rem; }
    .color-swatch { width: 40px; height: 40px; border-radius: 10px; border: 2.5px solid transparent; cursor: pointer; transition: all 0.18s; box-shadow: 0 2px 6px rgba(0,0,0,0.12); }
    .color-swatch:hover { transform: scale(1.18); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
    .color-swatch.selected { border-color: #6366f1; box-shadow: 0 0 0 4px rgba(99,102,241,0.35); transform: scale(1.12); }

    /* Pin toggle */
    .pin-toggle { width: 44px; height: 24px; border-radius: 999px; background: ${isDark ? "#2a2a45" : "#e5e7eb"}; position: relative; cursor: pointer; transition: background 0.25s; }
    .pin-toggle.pinned { background: #f59e0b; }
    .pin-thumb { position: absolute; top: 2px; left: 2px; width: 20px; height: 20px; border-radius: 50%; background: white; transition: transform 0.25s; }
    .pin-toggle.pinned .pin-thumb { transform: translateX(20px); }

    /* Empty & Loading */
    .empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.75rem; padding: 5rem 1rem; text-align: center; }
    .empty-icon { opacity: 0.4; }
    .empty-title { font-size: 1rem; }
    .loading-state { display: flex; flex-direction: column; align-items: center; gap: 1rem; padding: 4rem; color: ${subtext}; }
    .spinner { width: 36px; height: 36px; border: 3px solid ${border}; border-top-color: #6366f1; border-radius: 50%; animation: spin 0.7s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Toast */
    .toast { position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%); padding: 0.75rem 1.5rem; border-radius: 12px; font-size: 0.9rem; font-weight: 500; z-index: 200; animation: fadeInUp 0.3s ease; white-space: nowrap; box-shadow: 0 4px 20px rgba(0,0,0,0.2); }
    .toast-success { background: #10b981; color: white; }
    .toast-error { background: #ef4444; color: white; }
    @keyframes fadeInUp { from { opacity: 0; transform: translate(-50%, 10px); } to { opacity: 1; transform: translate(-50%, 0); } }

    /* Login */
    .login-screen { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 1.5rem; background: ${bg}; position: relative; }
    .top-right-btn { position: absolute; top: 1.25rem; right: 1.25rem; }
    .login-card { padding: 2.5rem; border-radius: 24px; text-align: center; width: 100%; max-width: 400px; }
    .login-logo { font-size: 3.5rem; margin-bottom: 0.5rem; }
    .login-title { font-size: 2rem; font-weight: 900; background: linear-gradient(135deg, #6366f1, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.5rem; }
    .login-sub { font-size: 0.9rem; margin-bottom: 1.75rem; line-height: 1.5; }
    .login-form { display: flex; flex-direction: column; gap: 0.75rem; }
    .login-input { width: 100%; padding: 0.75rem 1rem; border-radius: 12px; border: 1px solid ${border}; background: ${inputBg}; color: ${text}; font-size: 0.95rem; outline: none; text-align: center; transition: all 0.2s; }
    .login-input:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }
    .login-input::placeholder { color: ${subtext}; }
    .login-go-btn { width: 100%; justify-content: center; padding: 0.75rem; font-size: 0.95rem; border-radius: 12px; }
    .login-hint { font-size: 0.75rem; margin-top: 1rem; }

    /* Responsive */
    @media (max-width: 600px) {
      .header-inner { padding: 0.65rem 0; }
      .brand-name { font-size: 1.1rem; }
      .stats-pill { display: none; }
      .toolbar { gap: 0.75rem; }
      .add-btn span { display: none; }
      .notes-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 380px) {
      .main-content { padding: 1rem; }
    }
  `;
}
