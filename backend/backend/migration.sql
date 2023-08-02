-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";



CREATE TABLE IF NOT EXISTS "users"(
  id SERIAL PRIMARY KEY,
  login VARCHAR(32),
  password VARCHAR(32),
  email VARCHAR(64),
  reg_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  name VARCHAR(50),
  surname VARCHAR(50),
  city VARCHAR(50),
  photo_link VARCHAR(255)
);


CREATE TABLE IF NOT EXISTS courses(
  id SERIAL PRIMARY KEY,
  title VARCHAR(64),
  details VARCHAR(255),
  textCourse text,
  hardlevel INT,
  users_id INT[]
);

CREATE TABLE IF NOT EXISTS courses_achivements(
  id SERIAL PRIMARY KEY,
  title VARCHAR(64),
  description VARCHAR(255),
  id_course INT,
  hardlevel INT,
  users_id INT[]
);

CREATE TABLE IF NOT EXISTS practics_for_courses(
  id SERIAL PRIMARY KEY,
  id_course INT,
  title VARCHAR(64),
  description VARCHAR(255),
  image_url VARCHAR(255),
  practics_text TEXT,
  hardlevel INT,
  users_id INT[]
);

CREATE TABLE IF NOT EXISTS practics_achivements(
  id SERIAL PRIMARY KEY,
  title VARCHAR(64),
  description VARCHAR(255),
  id_practics INT,
  hardlevel INT,
  users_id INT[]
);