const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');
const { SEED, SECTIONS } = require('./seed-data');

const DB_PATH = path.join(__dirname, 'site.db');
const db = new DatabaseSync(DB_PATH);

db.exec(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    data TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    section TEXT NOT NULL,
    data TEXT NOT NULL,
    position INTEGER NOT NULL DEFAULT 0
  );
  CREATE INDEX IF NOT EXISTS idx_items_section ON items(section);
`);

function seedIfEmpty() {
  const settings = db.prepare('SELECT id FROM settings WHERE id = 1').get();
  if (!settings) {
    db.prepare('INSERT INTO settings (id, data) VALUES (1, ?)').run(JSON.stringify(SEED.settings));
  }
  const insert = db.prepare('INSERT INTO items (section, data, position) VALUES (?, ?, ?)');
  for (const section of SECTIONS) {
    const count = db.prepare('SELECT COUNT(*) AS c FROM items WHERE section = ?').get(section).c;
    if (count === 0) {
      SEED[section].forEach((entry, index) => {
        insert.run(section, JSON.stringify(entry), index);
      });
    }
  }
}

function getSection(section) {
  const rows = db.prepare('SELECT id, data, position FROM items WHERE section = ? ORDER BY position ASC, id ASC').all(section);
  return rows.map((row) => Object.assign({ id: row.id }, JSON.parse(row.data)));
}

function createItem(section, data, position) {
  const maxPos = db.prepare('SELECT COALESCE(MAX(position), -1) AS p FROM items WHERE section = ?').get(section).p;
  const pos = typeof position === 'number' ? position : maxPos + 1;
  const result = db.prepare('INSERT INTO items (section, data, position) VALUES (?, ?, ?)').run(section, JSON.stringify(data), pos);
  return { id: Number(result.lastInsertRowid), ...data };
}

function updateItem(section, id, data) {
  const row = db.prepare('SELECT id FROM items WHERE section = ? AND id = ?').get(section, id);
  if (!row) return null;
  db.prepare('UPDATE items SET data = ? WHERE section = ? AND id = ?').run(JSON.stringify(data), section, id);
  return { id, ...data };
}

function deleteItem(section, id) {
  return db.prepare('DELETE FROM items WHERE section = ? AND id = ?').run(section, id).changes > 0;
}

function getSettings() {
  const row = db.prepare('SELECT data FROM settings WHERE id = 1').get();
  return row ? JSON.parse(row.data) : SEED.settings;
}

function saveSettings(data) {
  db.prepare('INSERT INTO settings (id, data) VALUES (1, ?) ON CONFLICT(id) DO UPDATE SET data = excluded.data')
    .run(JSON.stringify(data));
  return data;
}

function getAllData() {
  const out = { settings: getSettings() };
  for (const section of SECTIONS) {
    out[section] = getSection(section);
  }
  return out;
}

module.exports = {
  db,
  seedIfEmpty,
  getSection,
  createItem,
  updateItem,
  deleteItem,
  getSettings,
  saveSettings,
  getAllData,
  SECTIONS
};
