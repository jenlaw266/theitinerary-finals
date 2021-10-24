DROP TABLE IF EXISTS main_parties CASCADE;
CREATE TABLE main_parties (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  itinerary_id INTEGER REFERENCES itineraries(id) ON DELETE CASCADE,
  creator BOOLEAN NOT NULL DEFAULT false
);