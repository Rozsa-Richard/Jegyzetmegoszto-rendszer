import db from "./db.js";
db.pragma("foreign_keys=ON");

db.prepare(
  "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT,  userId INTEGER, title TEXT, content TEXT, is_public BOOL, FOREIGN KEY (userId) REFERENCES users(id))"
).run();