-- This file contains examples to select, update and delete data in the test database of Health Diary

-- Mock operations for diary_entries
-- Select statements for diary_entries
--
SELECT * FROM diary_entries WHERE created_at BETWEEN '2025-01-01' AND '2025-01-31';
--
SELECT u.first_name, u.last_name, COUNT(de.entry_id) as NumberOfEntries FROM diary_entries AS de
INNER JOIN users AS u ON de.user_id = u.user_id GROUP BY de.user_id ORDER BY NumberOfEntries DESC;
-- Update mock data for diary_entries
-- Update weight entry for id 5. MariaDB fixes if data is too "long" ex. "88.99" -> "89.0".
UPDATE diary_entries SET weight = 88.99 WHERE entry_id = 5;
--


-- Delete mock data for diary_entries
--
DELETE FROM diary_entries WHERE created_at BETWEEN '2025-01-01' AND '2025-01-31';
--
DELETE FROM diary_entries WHERE user_id = 4;


-- Mock operations for drug_entries
-- Select statements for drug_entries
SELECT DISTINCT drug_name, user_id FROM drug_entries GROUP BY user_id;
SELECT users.username, drug_name, (drug_strength_amount * drug_amount), drug_amount, drug_strength_unit FROM drug_entries INNER JOIN users ON users.user_id = drug_entries.user_id;
-- Update mock data for drug entries
--
UPDATE drug_entries SET drug_name = 'xyz-2' WHERE entry_id = 6;
--
UPDATE drug_entries SET drug_amount = 364, drug_strength_unit = 'g' WHERE entry_id = 7;
-- Delete mock data for drug entries
--
DELETE FROM drug_entries WHERE entry_id = 5;
--
DELETE FROM drug_entries WHERE user_id = 2;

-- Mock operations for symptom_entries
-- Select statements for symptom_entries
-- Select count of entries of different illnesses for certain user
SELECT COUNT(entry_id), illness_name from symptom_entries WHERE user_id = 5 GROUP BY illness_name;
--
SELECT entry_date, illness_name, symptom_intensity FROM symptom_entries WHERE entry_date BETWEEN '2025-01-20' AND '2025-02-05' ORDER BY entry_date;
-- Update mock data for symptom entries
UPDATE symptom_entries SET entry_date = '2025-02-28' WHERE entry_id = 3;
--
UPDATE symptom_entries
SET entry_date = '2025-02-26', illness_name = 'fever',
symptom_intensity = 'hard', symptom_description = 'feeling cold, sneezing'
WHERE entry_id = 8;

-- Delete mock data for symptom entries
--
DELETE FROM symptom_entries WHERE entry_id = 6;
--
DELETE FROM symptom_entries WHERE user_id = 2 AND illness_name = 'back pain';
