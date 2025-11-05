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