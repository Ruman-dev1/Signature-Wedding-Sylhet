const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const CONFIG_PATH = path.join(__dirname, 'config.json');
const SESSION_COOKIE = 'sw_session';
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const DEFAULT_PASSWORD = 'admin123';

function loadConfig() {
  if (fs.existsSync(CONFIG_PATH)) {
    return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  }
  const salt = crypto.randomBytes(16).toString('hex');
  const config = {
    passwordSalt: salt,
    passwordHash: hashPassword(DEFAULT_PASSWORD, salt),
    sessionSecret: crypto.randomBytes(32).toString('hex')
  };
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), { mode: 0o600 });
  return config;
}

function hashPassword(password, salt) {
  return crypto.createHash('sha256').update(salt + password).digest('hex');
}

function verifyPassword(password, salt, hash) {
  return hashPassword(password, salt) === hash;
}

function signSession(secret) {
  const payload = (Date.now() + SESSION_TTL_MS).toString();
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return `${payload}.${sig}`;
}

function verifySession(token, secret) {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const sig = crypto.createHmac('sha256', secret).update(parts[0]).digest('hex');
  if (sig !== parts[1]) return false;
  return Number(parts[0]) > Date.now();
}

let config = loadConfig();

function setPassword(newPassword) {
  config.passwordSalt = crypto.randomBytes(16).toString('hex');
  config.passwordHash = hashPassword(newPassword, config.passwordSalt);
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), { mode: 0o600 });
}

function checkPassword(password) {
  return verifyPassword(password, config.passwordSalt, config.passwordHash);
}

function sessionToken() {
  return signSession(config.sessionSecret);
}

function isValidSession(token) {
  return verifySession(token, config.sessionSecret);
}

module.exports = {
  SESSION_COOKIE,
  DEFAULT_PASSWORD,
  checkPassword,
  sessionToken,
  isValidSession,
  setPassword
};
