## Web-sovelluskehitys -kurssi 1/2025-3/2025 @ Metropolia Ammattikorkeakoulu

#### Backend-tehtävä, viikko 4

---

https://github.com/mattpe/hyte-web-dev/blob/main/07-express-mvc-db.md#week-assignment-4---express-mvc-and-database

#### Tehtävänanto

##### Week Assignment 4 - Express MVC and database

Think about requirements of a health diary app. What kind of data is needed?

- [x] Continue your existing Express app and create a branch express-db
  - [ ] Implement MVC model (file or feature based project structure, your choice)
    You can use the teacher's example code as a starting point (see Oma).
    - [ ] Convert your existing API resources (/api/entries and /api/users) to use the MVC model
    - [ ] Use react.Router to modularize your routes for separate endpoints
    - [ ] Connect to the database (mysql2) and use appropriate SQL statements in the data models
    - [ ] Use the previous week's example database instead of mock data
    - [ ] Implement all of the following endpoints:
      - [ ] GET /api/entries - list all diary entries
      - [ ] GET /api/entries/:id - get diary entry by id
      - [ ] PUT /api/entries/:id - update a diary entry (optional)
      - [ ] DELETE /api/entries/:id - delete entry (optional)
      - [x] GET /api/users - list all users
      - [x] GET /api/users/:id - get user by id
      - [x] POST /api/users - add a new user
      - [x] PUT /api/users/:id - update user (optional)
      - [x] DELETE /api/users/:id - delete user (optional)

Extra:
- [ ] Design and implement endpoints for medications, exercises or your own custom resource
- [ ] Think about what the user of application would need to do with the data
  - [ ] Describe your implementations and the use cases for it
    - [ ] What features/functions you implemented and why?
    - [ ] How they work?

- [ ] Returning: See assignment in Oma.

---

#### Kurssin työkalut

- node.js
- nodemon
- express.js
