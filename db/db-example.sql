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
DROP DATABASE IF EXIST HealthDiaryExample;
CREATE DATABASE HealthDiaryExample;
USE HealthDiaryExample;

-- Create a table for users

-- Create a table for diary entries

-- ALTER example, adding a new column to existing table
