const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const { seedIfEmpty, getAllData, getSection, createItem, updateItem, deleteItem, getSettings, saveSettings, SECTIONS } = require('./db');
const { SESSION_COOKIE, DEFAULT_PASSWORD, checkPassword, sessionToken, isValidSession, setPassword } = require('./auth');

const ROOT = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const UPLOAD_DIR = path.join(ROOT, 'public', 'uploads');
const PORT = process.env.PORT || 3000;

fs.mkdirSync(UPLOAD_DIR, { recursive: true });

seedIfEmpty();

const app = express();
app.use(express.json({ limit: '2mb' }));

function requireAuth(req, res, next) {
  if (isValidSession(req.cookies ? req.cookies[SESSION_COOKIE] : undefined)) {
    return next();
  }
  return res.status(401).json({ error: 'Not authenticated' });
}

function cookies(req) {
  const header = req.headers.cookie || '';
  const out = {};
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx > -1) out[part.slice(0, idx).trim()] = part.slice(idx + 1).trim();
  }
  return out;
}

app.use((req, res, next) => {
  req.cookies = cookies(req);
  next();
});

app.get('/api/data', (req, res) => {
  res.json(getAllData());
});

app.post('/api/admin/login', (req, res) => {
  const password = req.body && req.body.password;
  if (!password || !checkPassword(password)) {
    return res.status(401).json({ error: 'Invalid password' });
  }
  res.setHeader('Set-Cookie', `${SESSION_COOKIE}=${sessionToken()}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`);
  res.json({ ok: true });
});

app.post('/api/admin/logout', (req, res) => {
  res.setHeader('Set-Cookie', `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
  res.json({ ok: true });
});

app.get('/api/admin/session', (req, res) => {
  res.json({ loggedIn: isValidSession(req.cookies[SESSION_COOKIE]) });
});

app.post('/api/admin/change-password', requireAuth, (req, res) => {
  const { current, next: nextPassword } = req.body || {};
  if (!current || !checkPassword(current)) {
    return res.status(401).json({ error: 'Current password is incorrect' });
  }
  if (!nextPassword || String(nextPassword).length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters' });
  }
  setPassword(String(nextPassword));
  res.json({ ok: true });
});

app.get('/api/admin/data', requireAuth, (req, res) => {
  res.json(getAllData());
});

app.put('/api/admin/settings', requireAuth, (req, res) => {
  const allowed = ['whatsapp_number', 'email', 'hours', 'location', 'instagram', 'facebook', 'youtube', 'home_hero_image', 'about_hero_image'];
  const current = getSettings();
  for (const key of allowed) {
    if (req.body && req.body[key] !== undefined) current[key] = String(req.body[key]);
  }
  res.json(saveSettings(current));
});

const upload = multer({
  storage: multer.diskStorage({
    destination: UPLOAD_DIR,
    filename(req, file, cb) {
      const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
      cb(null, `${Date.now()}-${crypto.randomBytes(4).toString('hex')}${ext}`);
    }
  }),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter(req, file, cb) {
    const ok = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.mimetype);
    cb(ok ? null : new Error('Only image uploads allowed'), ok);
  }
});

app.post('/api/admin/upload', requireAuth, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ url: '/uploads/' + req.file.filename });
});

app.post('/api/admin/:section', requireAuth, (req, res) => {
  const section = req.params.section;
  if (!SECTIONS.includes(section)) return res.status(400).json({ error: 'Unknown section' });
  const data = req.body || {};
  const item = createItem(section, data);
  res.status(201).json(item);
});

app.put('/api/admin/:section/:id', requireAuth, (req, res) => {
  const section = req.params.section;
  if (!SECTIONS.includes(section)) return res.status(400).json({ error: 'Unknown section' });
  const item = updateItem(section, Number(req.params.id), req.body || {});
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
});

app.delete('/api/admin/:section/:id', requireAuth, (req, res) => {
  const section = req.params.section;
  if (!SECTIONS.includes(section)) return res.status(400).json({ error: 'Unknown section' });
  if (!deleteItem(section, Number(req.params.id))) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json({ ok: true });
});

app.get('/admin', (req, res) => res.redirect('/admin/login.html'));

app.use(express.static(PUBLIC_DIR));

app.use('/admin', express.static(path.join(PUBLIC_DIR, 'admin')));

app.get('/health', (req, res) => res.json({ ok: true }));

const server = app.listen(PORT, () => {
  console.log(`Signature Wedding server running at http://localhost:${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}/admin/login.html (default password: ${DEFAULT_PASSWORD})`);
});

module.exports = server;
