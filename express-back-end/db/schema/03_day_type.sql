DROP TABLE IF EXISTS day_types CASCADE;
CREATE TABLE day_types (
  id SERIAL PRIMARY KEY NOT NULL,
  type VARCHAR(255) NOT NULL
);