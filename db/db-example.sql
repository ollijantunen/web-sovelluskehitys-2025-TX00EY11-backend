-- Windows: MySQL Client (MariaDB)
-- Mysql client käynnistys komentoriviltä yllä olevassa clientissä, ei cmd tai git bash automaattisesti
-- mysql -u root -pMUNSALASANA
-- tai mysql -u root -p -> kysyy salasanaa, peittää merkit.

-- Tämän skriptin suorittaminen (opettajan kone) sql clientissa:
-- source /Users/mattpe/code/hyte/server-example-25/db/db-examples.sql

-- Remove existing database completely (needs a root access to DBMS)
-- DROP DATABASE IF EXISTS database_name;
-- Create a new database (needs a root access to DBMS)
-- CREATE DATABASE database_name;
-- Connect to the database
-- USE database_name;

-- Example
DROP DATABASE IF EXISTS testHealthDiary;
CREATE DATABASE testHealthDiary;
USE testHealthDiary;

-- Create a table for users
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create a table for diary entries
CREATE TABLE DiaryEntries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    entry_date DATE NOT NULL,
    mood VARCHAR(50),
    weight DECIMAL(5,2),
    sleep_hours DECIMAL(4,2),
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- ALTER example, adding a new column to existing table
ALTER TABLE Users
ADD COLUMN user_level VARCHAR(10) DEFAULT 'regular';

-- Inserting a single record, without specifying column names
INSERT INTO Users VALUES
  (1, 'johndoe', 'temp-pw-1', 'jonhdoe@example.com', '2025-01-01 01:00:00', 'regular');

-- Inserting multiple user rows at once (default values like created_at are inserted without need to specify them)
INSERT INTO Users (username, password, email, user_level) VALUES
  ('janedoe', 'temp-pw-2', 'janedoe@example.com', 'admin'),
  ('michael_smith', 'temp-pw-3', 'michaelsmith@example.com', 'moderator'),
  ('rose_smith', 'temp-pw-4', 'rosesmith@example.com', 'regular');

-- -- Example when FK constraint fails (if user_id 15 does not exist)
-- INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes, created_at) VALUES
--   (15, '2024-01-10', 'Happy', 70.5, 8, 'Had a great day, felt energetic', '2024-01-10 20:00:00');

-- Inserting multiple diary entries
INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes, created_at) VALUES
  (1, '2024-01-10', 'Happy', 70.5, 8, 'Had a great day, felt energetic', '2024-01-10 20:00:00'),
  (1, '2024-01-11', 'Tired', 70.2, 6, 'Long day at work, need rest', '2024-01-11 20:00:00'),
  (2, '2024-01-10', 'Stressed', 65.0, 7, 'Busy day, a bit stressed out', '2024-01-10 21:00:00');

-- Change user_level of user with id 1 to 'admin'
UPDATE Users SET user_level = 'admin' WHERE user_id = 1;

-- Change mood of entry with id 1 to 'Outstanding'
UPDATE DiaryEntries SET mood = 'Outstanding' WHERE entry_id = 2;
