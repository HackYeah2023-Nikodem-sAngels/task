CREATE TABLE universities (
  id int,

  name text,
  description text,

  country text,
  region text,
  city text
)

CREATE TABLE majors (
  id int,
  university_id int,

  name text,
  description text,

  ECTS int NULL,
  points_to_qualify int
)

CREATE TABLE subjects_to_majors (
  major_id int,
  subject_id int
)

CREATE TABLE subject (
  id int,

  name text,
  description text,

  number_of_lectures int
)
