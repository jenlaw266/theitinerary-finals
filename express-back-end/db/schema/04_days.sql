DROP TABLE IF EXISTS days CASCADE;
CREATE TABLE days (
  id SERIAL PRIMARY KEY NOT NULL,
  day_type_id INTEGER REFERENCES day_types(id) ON DELETE CASCADE,
  itinerary_id INTEGER REFERENCES itineraries(id) ON DELETE CASCADE
);