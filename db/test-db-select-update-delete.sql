-- This file contains examples to select, update and delete data in the test database of Health Diary


-- Mock operations for drug_entries
-- Select statements for drug_entries
-- Update mock data for drug entries
UPDATE drug_entries SET drug_name = 'xyz-2' WHERE entry_id = 6;
UPDATE drug_entries SET drug_amount = 364, drug_strength_unit = 'g' WHERE entry_id = 7;
-- Delete mock data for drug entries
DELETE FROM drug_entries WHERE entry_id = 5;
DELETE FROM drug_entries WHERE user_id = 2;

-- Mock operations for symptom_entries
-- Select statements for symptom_entries
-- Select count of entries of different illnesses for certain user
SELECT COUNT(entry_id), illness_name from symptom_entries WHERE user_id = 5 GROUP BY illness_name;
SELECT entry_date, illness_name, symptom_intensity FROM symptom_entries WHERE entry_date BETWEEN '2025-01-20' AND '2025-02-05' ORDER BY entry_date;
-- Update mock data for symptom entries
UPDATE symptom_entries SET entry_date = '2025-02-28' WHERE entry_id = 3;

UPDATE symptom_entries
SET entry_date = '2025-02-26', illness_name = 'fever',
symptom_intensity = 'hard', symptom_description = 'feeling cold, sneezing'
WHERE entry_id = 8;

-- Delete mock data for symptom entries
DELETE FROM symptom_entries WHERE entry_id = 6;
DELETE FROM symptom_entries WHERE user_id = 2 AND illness_name = 'back pain';
