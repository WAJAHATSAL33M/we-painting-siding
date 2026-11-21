import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import initialPosts from '../data/blog-posts.json' with { type: 'json' };

let database;
export function wpsStore() {
  if (database) return database;
  const defaultPath = process.env.NODE_ENV === 'production'
    ? join(homedir(), '.wps-data', 'wepaintsiding.com', 'site.sqlite')
    : '.wps-data/site.sqlite';
  const path = resolve(process.env.WPS_DATABASE_PATH || defaultPath);
  mkdirSync(dirname(path), { recursive: true, mode: 0o700 });
  const db = new DatabaseSync(path);
  db.exec(`
    PRAGMA busy_timeout = 5000;
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('draft', 'published')),
      data TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY);
    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      status TEXT NOT NULL DEFAULT 'new',
      kind TEXT NOT NULL,
      page TEXT NOT NULL,
      email TEXT NOT NULL,
      details TEXT NOT NULL,
      notes TEXT NOT NULL DEFAULT ''
    );
    CREATE TABLE IF NOT EXISTS photos (
      id INTEGER PRIMARY KEY,
      enquiry_id INTEGER NOT NULL REFERENCES enquiries(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      content BLOB NOT NULL
    );
  `);
  db.exec('BEGIN IMMEDIATE');
  try {
    if (db.prepare("INSERT OR IGNORE INTO settings VALUES ('imported-posts')").run().changes) {
      const insert = db.prepare("INSERT INTO posts (slug, status, data) VALUES (?, 'published', ?)");
      for (const post of [...initialPosts].reverse()) insert.run(post.slug, JSON.stringify(post));
    }
    db.exec('COMMIT');
  } catch (error) {
    db.exec('ROLLBACK');
    db.close();
    throw error;
  }
  database = db;
  return db;
}

export function getPosts(status) {
  const sql = 'SELECT id, status, data FROM posts';
  const db = wpsStore();
  const rows = status
    ? db.prepare(sql + ' WHERE status = ? ORDER BY id DESC').all(status)
    : db.prepare(sql + ' ORDER BY id DESC').all();
  return rows.map(({ id, status, data }) => {
    const post = JSON.parse(data
      .replace(/the GTA, Golden Horseshoe and/gi, 'the GTA and')
      .replace(/Southern Ontario/gi, 'Ontario')
      .replace(/"service":"\/cabinet-painting"/g, '"service":"/interior-painting/cabinet-painting"'));
    return { ...post, id, status };
  });
}

export function recordEnquiry({ kind, page, email, details, attachments }) {
  const db = wpsStore();
  db.exec('BEGIN IMMEDIATE');
  try {
    const { lastInsertRowid } = db.prepare(
      'INSERT INTO enquiries (kind, page, email, details) VALUES (?, ?, ?, ?)'
    ).run(kind, page, email, details);
    const insert = db.prepare('INSERT INTO photos (enquiry_id, name, content) VALUES (?, ?, ?)');
    for (const attachment of attachments) insert.run(lastInsertRowid, attachment.filename, attachment.content);
    db.exec('COMMIT');
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
}
