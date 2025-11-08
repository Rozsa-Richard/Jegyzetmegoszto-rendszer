import db from "./database.js";
db.pragma("foreign_keys=ON");

db.prepare(
  "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT,  userId INTEGER, title TEXT, content TEXT, is_public BOOLEAN, FOREIGN KEY (userId) REFERENCES users(id))"
).run();

export const getAllPublic = () => {
  return db.prepare("SELECT * FROM notes WHERE is_public = 1 ORDER BY id DESC").all();
};

export const getNoteById = (id) => {
  return db.prepare("SELECT * FROM notes WHERE id = ?").get(id);
};

export const getNotesByUser = (userId) => {
  return db.prepare("SELECT * FROM notes WHERE userId = ? ORDER BY id DESC").get(userId);
};

export const saveNote = (userId, title, content, is_public) => {
  db.prepare("INSERT INTO notes (userId, title, content, is_public) VALUES (?,?,?,?)").run(userId,title,content,is_public);
};

export const updateNote = (id, userId, title, content, is_public) => {
  db.prepare("UPDATE notes SET userId = ?, title = ?, content = ?, is_public = ? WHERE id = ?").run(userId,title,content,is_public,id);
};

export const deleteNote = (id) => {
  db.prepare("DELETE FROM notes WHERE id = ?").run(id);
};

export const getUserNotesById = (userId) => {
  return db.prepare("SELECT * FROM notes WHERE (userId = ? AND is_public = 0) ORDER BY id DESC").get(userId);
};