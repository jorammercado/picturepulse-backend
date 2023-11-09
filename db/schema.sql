DROP DATABASE IF EXISTS movies_dev;
CREATE DATABASE movies_dev;

\c movies_dev;

CREATE TABLE movies (
 id SERIAL PRIMARY KEY,
 movie_name VARCHAR(20) NOT NULL,
 poster_link TEXT,
 studio VARCHAR(20),
 director VARCHAR(20),
 starring VARCHAR(20),
 overview TEXT,
 runtime INT DEFAULT 0,
 release_year INT,
 budget INT,
 current_balance INT DEFAULT 0,
 schedule TEXT,
 genre TEXT,
 in_production BOOLEAN DEFAULT false
);

CREATE TABLE actors (
    id SERIAL PRIMARY KEY,
    actor_name TEXT NOT NULL,
    actor_img TEXT,
    active BOOLEAN DEFAULT false,
    age INT,
    movie_id INTEGER REFERENCES movies (id)
    ON DELETE CASCADE
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    task_name VARCHAR(20) NOT NULL,
    description TEXT NOT NULL,
    department TEXT,
    cost INT DEFAULT 0,
    completed BOOLEAN DEFAULT false,
    movie_id INTEGER REFERENCES movies (id)
    ON DELETE CASCADE
);