import db from "./db.js";
db.pragma("foreign_keys=ON");

db.prepare(
  "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT,  userId INTEGER, title TEXT, content TEXT, is_public BOOL, FOREIGN KEY (userId) REFERENCES users(id))"
).run();

export const getAllPublic = () => {
  return db.prepare("SELECT * FROM notes WHERE is_public = false").all();
};

export const getNoteById = (id) => {
  return db.prepare("SELECT * FROM notes WHERE id = ?").run(id);
};

export const getNotesByUser = (userId) => {
  return db.prepare("SELECT * FROM notes WHERE userId = ?").run(userId);
};

export const saveNote = (userId, title, content, is_public) => {
  return db.prepare("INSERT INTO notes (userId, title, content, is_public) VALUES (?,?,?,?)").run(userId,title,content,is_public);
};

export const deleteNote = (id) => {
  db.prepare("DELETE FROM notes WHERE id = ?").run(id);
};