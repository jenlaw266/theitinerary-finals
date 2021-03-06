DROP TABLE IF EXISTS activities CASCADE;
CREATE TABLE activities (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  lat DECIMAL(8,6) NOT NULL,
  long DECIMAL(9,6) NOT NULL,
  heart BOOLEAN NOT NULL DEFAULT false,
  image VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  day_id INTEGER REFERENCES days(id) ON DELETE CASCADE,
  itinerary_id INTEGER REFERENCES itineraries(id) ON DELETE CASCADE
);