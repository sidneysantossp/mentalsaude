const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'data', 'local.db');
const db = new Database(dbPath);

console.log('=== USERS TABLE ===');
const users = db.prepare('SELECT * FROM users').all();
console.log(users);

console.log('\n=== TESTS TABLE ===');
const tests = db.prepare('SELECT * FROM tests').all();
console.log(tests);

console.log('\n=== TABLE SCHEMA ===');
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log('Tables:', tables.map(t => t.name));

db.close();