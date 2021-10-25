DROP TABLE IF EXISTS itineraries CASCADE;
CREATE TABLE itineraries (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  start_date VARCHAR(255) NOT NULL,
  end_date VARCHAR(255) NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false
);