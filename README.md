# Jegyzetmegoszto-rendszer

Végpontok:
POST /api/notes
GET /api/notes
GET /api/notes/:id
PUT /api/notes/:id
DELETE /api/notes/:id

Táblák:
users(id, username, password_hash)
notes(id, user_id, title, content, is_public)

Frontend:
Nyilvános jegyzetek listája
Saját jegyzetek kezelése
Login / Register oldal

.env
PORT = 3000
JWT_SECRET_KEY = add2ef10e03001b8f69f5f10e1b822c45a1976ee0a8127eeea43e06edba0973eb4cfba20a5f6905b4dabcde47f1c80769a58fac27d9fec482ca2f3e64a0e04e4

TODO:
 másik ember jegyzetei