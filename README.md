## Web-sovelluskehitys -kurssi 1/2025-3/2025 @ Metropolia Ammattikorkeakoulu

#### Backend-tehtävä, viikko 5

---

https://github.com/mattpe/hyte-web-dev/blob/main/08-state-auth.md#assignment

#### Tehtävänanto

##### Week Assignment 5 - Application State and User Authentication

Continue your existing Express app and create a branch authentication
  See the teacher's example (link in Oma) for reference to get started
  - [ ] Implement user authentication to your app
    - [ ] Add endpoint POST /api/auth/login
    - [ ] Use JWT for authentication
    - [ ] Use bcrypt for password hashing
  - [ ] Implement proper authorization for protected routes, e.g.:
    - [ ] PUT /api/entries/:id - only entry owner can update entry
    - [ ] DELETE /api/entries/:id - only entry owner can delete entry
    - [ ] PUT /api/users/ - users can update only their own user info
    - [ ] and so on...
    - [ ] describe your rules in README.md
  - [ ] Extra (optional): think about how existing endpoints should work and what other endpoints you might need for your app and     implement them with proper authentication and authorization. e.g.:
    - [ ] GET /api/entries - list only user's own entries: get all entries by user id from token
    - [ ] GET /api/entries/stats - get some statistics about entries like sleep time average, etc.
  - [ ] Extra (optional): implement user roles (e.g. admin, user) with different permissions (role based resource authorization)
    - [ ] Regular users can only delete and edit their own data
      Modify the DELETE and UPDATE SQL queries in models so that queries will also check that the owner of the item (user_id) matches the user_id property in the req.user object. req.user is decoded from the token and needs to be passed as a parameter from controller to corresponding model method.
    - [ ] Admin level users can see, update or delete any diary entries, user info, etc.
      You cant create a new function in the user model that checks if the user is an admin and returns a boolean value.
      Add another DELETE and UPDATE SQL queries into model functions that do not check the user_id property. Instead, you need to check that the user id from the token belongs to an admin user.
      Use e.g. conditional statements in the models to decide which SQL query to use based on the user level.

- [ ] Returning: See related assignment in Oma.

###### Omaan:
Kommentit:

---

#### Kurssin työkalut

- node.js
- nodemon
- express.js
