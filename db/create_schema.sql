CREATE TABLE universities (
  id SERIAL PRIMARY KEY,

  name text,
  description text,

  country text,
  region text,
  city text
)

CREATE TABLE majors (
  id SERIAL PRIMARY KEY,
  university_id SERIAL,

  name text,
  description text,

  ECTS int NULL,
  points_to_qualify int NULL
)

CREATE TABLE subjects_to_majors (
  major_id SERIAL,
  subject_id SERIAL
)

CREATE TABLE subject (
  id SERIAL PRIMARY KEY,

  name text,
  description text,

  number_of_lectures int
)
