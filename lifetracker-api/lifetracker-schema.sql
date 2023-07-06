-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NULL,
    email VARCHAR(255) NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

-- Create the activity table
CREATE TABLE IF NOT EXISTS activity (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    calories INTEGER NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the exercise table
CREATE TABLE IF NOT EXISTS exercise (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    calories INTEGER NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the nutrition table
CREATE TABLE IF NOT EXISTS nutrition (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    calories INTEGER NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL, FOREIGN KEY (user_id) REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the sleep table
CREATE TABLE IF NOT EXISTS sleep (
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    category   VARCHAR(255) NOT NULL,
    calories   INTEGER NOT NULL,
    image_url  VARCHAR(255) NOT NULL,
    user_id    INTEGER NOT NULL REFERENCES users(id), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);