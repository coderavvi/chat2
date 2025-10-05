const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbpath = path.resolve(__dirname, 'ladiDB.db');
const db = new sqlite3.Database(dbpath);

// Create tables if not exist
db.serialize(() => {
  db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    alias TEXT UNIQUE NOT NULL,
    gender TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

  db.run(`
  CREATE TABLE IF NOT EXISTS conversations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    role TEXT,
    message TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`);
});

module.exports = db;
