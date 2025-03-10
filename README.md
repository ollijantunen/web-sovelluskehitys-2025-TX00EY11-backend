## Web-sovelluskehitys -kurssi 1/2025-3/2025 @ Metropolia Ammattikorkeakoulu

#### Backend-tehtävä, viikko 4

---

https://github.com/mattpe/hyte-web-dev/blob/main/07-express-mvc-db.md#week-assignment-4---express-mvc-and-database

#### Tehtävänanto

##### Week Assignment 4 - Express MVC and database

Think about requirements of a health diary app. What kind of data is needed?

- [x] Continue your existing Express app and create a branch express-db
  - [x] Implement MVC model (file or feature based project structure, your choice)
    You can use the teacher's example code as a starting point (see Oma).
    - [x] Convert your existing API resources (/api/entries and /api/users) to use the MVC model
    - [x] Use react.Router to modularize your routes for separate endpoints
    - [x] Connect to the database (mysql2) and use appropriate SQL statements in the data models
    - [x] Use the previous week's example database instead of mock data
    - [x] Implement all of the following endpoints:
      - [x] GET /api/entries - list all diary entries
      - [x] GET /api/entries/:id - get diary entry by id
      - [x] PUT /api/entries/:id - update a diary entry (optional)
      - [x] DELETE /api/entries/:id - delete entry (optional)
      - [x] GET /api/users - list all users
      - [x] GET /api/users/:id - get user by id
      - [x] POST /api/users - add a new user
      - [x] PUT /api/users/:id - update user (optional)
      - [x] DELETE /api/users/:id - delete user (optional)

Extra:
- [x] Design and implement endpoints for medications, exercises or your own custom resource
- [x] Think about what the user of application would need to do with the data
  - [x] Describe your implementations and the use cases for it
    - [x] What features/functions you implemented and why?
    - [ ] How they work?

- [ ] Returning: See assignment in Oma.

###### Omaan:
Kommentit:

Toteutin mvc-mallin mukaisen reitityksen tiedostojakoon (routes-controllers-models) perustuen.
Lisäresursseina "drug entries" ja "symptom entries" mahdollistamaan lääkkeiden oton ja sairauksien oireiden seurannan käyttäjälle.
-> Käyttäjä syöttää dataa, voi muokata dataansa, lukea sitä, poistaa sen.
Lisäresurssit sekä diary entries ovat toiminnoiltaan samanlaisia /api/entries/-polun alla. Käytössä samat toiminnallisuudet (CRUD) kuin users-resurssilla.

---

#### Kurssin työkalut

- node.js
- nodemon
- express.js
