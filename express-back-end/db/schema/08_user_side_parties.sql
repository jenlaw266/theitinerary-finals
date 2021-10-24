DROP TABLE IF EXISTS users_side_parties CASCADE;
CREATE TABLE users_side_parties (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  activity_id INTEGER REFERENCES activities(id) ON DELETE CASCADE,
  side_party_id INTEGER REFERENCES side_parties(id) ON DELETE CASCADE
);