-- Creating test database for health diary application
-- Inserting mock data for development purposes

-- Remove existing database completely (needs a root access to DBMS)
DROP DATABASE IF EXISTS test_health_diary;
-- Create a new database (needs a root access to DBMS)
CREATE DATABASE test_health_diary;
-- Connect to the database
USE test_health_diary;

-- Creating tables

-- Create a table for users
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    last_name VARCHAR(100),
    first_name VARCHAR(100),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_level VARCHAR(10) DEFAULT 'user'
);

-- Create a table for diary entries
CREATE TABLE diary_entries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    entry_date DATE NOT NULL,
    mood VARCHAR(50),
    weight DECIMAL(4,1),
    sleep_hours DECIMAL(4,2),
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create a table for drug entries
CREATE TABLE drug_entries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    entry_date DATE NOT NULL,
    drug_name VARCHAR(100) NOT NULL,
    drug_strength_amount DECIMAL(10,4) NOT NULL,
    drug_strength_unit VARCHAR(20) NOT NULL,
    drug_amount INT DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create a table for symptom entries
CREATE TABLE symptom_entries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    entry_date DATE NOT NULL,
    illness_name VARCHAR(100) NOT NULL,
    symptom_description TEXT,
    symptom_intensity VARCHAR(50),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- TODO
-- Creating tables for description of drug name, drug strength unit
-- Creating tables for description of symptom intensity
-- Creating table for describing user_level

-- Insert mock data to database

-- Insert mock data for users
INSERT INTO users (username, password, email, last_name, first_name, created_at) VALUES
    ('johndoe', 'hashed_password1', 'johndoe@example.com', 'Doe', 'John', '2025-01-01 18:00:00'),
    ('janedoe', 'hashed_password2', 'janedoe@example.com', 'Doe', 'Jane', '2025-01-01 19:00:00'),
    ('mikesmith', 'hashed_password3', 'mikesmith@example.com', 'Smith', 'Mike', '2025-01-01 20:00:00'),
    ('rosesmith', 'hashed_password4', 'rosesmith@example.com', 'Smith', 'Rose', '2025-01-01 21:00:00'),
    ('sergeholton', 'hashed_password5', 'sergeholton@example.com', 'Holton', 'Serge', '2025-01-01 22:00:00');

UPDATE users SET user_level = 'admin' WHERE user_id = 4;

-- Insert mock data for diary entries

INSERT INTO diary_entries (user_id, entry_date, mood, weight, sleep_hours, notes, created_at) VALUES
    (1, '2025-01-12', 'good', 12, 9.25, 'note1', '2025-01-01 20:00:00'),
    (2, '2025-01-26', 'bad', 61, 9.1, 'note2', '2025-01-01 20:00:00'),
    (2, '2025-02-01', 'ok', 62, 9, 'note3', '2025-01-01 20:00:00'),
    (2, '2025-02-02', 'ok', 64.2, 4.75, 'note4', '2025-01-01 20:00:00'),
    (3, '2025-01-31', 'good', 88, 6.5, 'note5', '2025-01-01 20:00:00'),
    (4, '2025-01-12', 'not too bad', 85, 5, 'note6', '2025-01-01 20:00:00'),
    (4, '2025-02-02', 'very good', 55.2, 8.12, 'note7', '2025-01-01 20:00:00'),
    (5, '2025-01-26', 'bad', 72, 8.25, 'note8', '2025-01-01 20:00:00');

-- Insert mock data for drug usage entries
INSERT INTO drug_entries (user_id, entry_date, drug_name, drug_strength_amount, drug_strength_unit, drug_amount, created_at) VALUES
    (1, '2025-01-12', 'Burana', 200, 'mg', 1, '2025-02-06 08:00:00'),
    (2, '2025-01-26', 'xyz', 5252, 'mg', 1, '2025-02-06 08:00:00'),
    (2, '2025-02-01', 'Burana', 400, 'mg', 2, '2025-02-06 08:00:00'),
    (2, '2025-02-02', 'Burana', 600, 'mg', 1, '2025-02-06 08:00:00'),
    (3, '2025-01-31', 'Burana', 400, 'kg', 2, '2025-02-06 08:00:00'),
    (4, '2025-01-12', 'xyz', 1236, 'mg', 1, '2025-02-06 08:00:00'),
    (4, '2025-02-02', 'xyz', 52, 'kg', 265, '2025-02-06 08:00:00'),
    (5, '2025-01-26', 'Burana', 600, 'mg', 3, '2025-02-06 08:00:00');

-- Insert mock data for symptom entries
-- using escape \ to have '-character in VARCHAR-string. Works although shows up syntax error in VS code language mode (MS SQL)
INSERT INTO symptom_entries (user_id, entry_date, illness_name, symptom_description, symptom_intensity, created_at) VALUES
    (1, '2025-01-12', 'headache', 'head hurts', ' a lot', '2025-02-06 08:00:00'),
    (2, '2025-01-26', 'back pain', 'burning pain', 'little bit', '2025-02-06 08:00:00'),
    (2, '2025-02-01', 'headache', 'head hurts', 'very painful', '2025-02-06 08:00:00'),
    (2, '2025-02-02', 'back pain', 'not able to move', 'painful', '2025-02-06 08:00:00'),
    (3, '2025-01-31', 'flu', 'low energy', 'not so big', '2025-02-06 08:00:00'),
    (4, '2025-01-12', 'headache', 'head hurts', 'a lot', '2025-02-06 08:00:00'),
    (4, '2025-02-02', 'headache', 'I can\'t concentrate', 'annoying', '2025-02-06 08:00:00'),
    (5, '2025-01-26', 'flu', 'I have to sneeze a lot', 'little pain', '2025-02-06 08:00:00');
