## Web-sovelluskehitys -kurssi 1/2025-3/2025 @ Metropolia Ammattikorkeakoulu

### Backend-tehtävä, viikko 6

---

https://github.com/mattpe/hyte-web-dev/blob/main/09-validation.md#assignment---input-validation-and-error-handling

#### Tehtävänanto

##### Week Assignment 6 - Input validation and error handling

- [ ] Implement error handler middleware
  - [ ] Use the error handler in your controllers instead of "hard-coded" sending error responses
- [ ] Implement proper server-side validation and sanitization for input data
  - [ ] Use express-validator
  - [ ] Specify the validation rules for each field in the request bodies

- [ ] Returning: See related assignment in Oma.

###### Omaan:
Kommentit:

---

### Authentication and authorization rules for routes

#### Routes without authentication
|Method|Route|For|
|---|---|---|
|GET|/|All|
|GET|/api|All|
|POST|/api/users|All|
|POST|/api/auth/login|All|

---
Credentials must be provided in the authorization header with the request.
`Authorization: Bearer <your-token>`

#### Routes requiring authentication
|Method|Route|For|
|---|---|---|
|GET|/api/auth/me|User|
|GET, POST|/api/entries/diaries/|User|
|GET, POST|/api/entries/drugs/|User|
|GET, POST|/api/entries/symptoms/|User|

##### Routes requiring authorization (and authentication)
|Method|Route|For|
|---|---|---|
|GET|/api/users|Admin|
|GET, PUT, DELETE|/api/users/:id|User|
|GET, PUT, DELETE|/api/entries/diaries/all|Admin|
|GET, PUT, DELETE|/api/entries/diaries/:id|User|
|GET, PUT, DELETE|/api/entries/drugs/all|Admin|
|GET, PUT, DELETE|/api/entries/drugs/:id|User|
|GET, PUT, DELETE|/api/entries/symptoms/all|Admin|
|GET, PUT, DELETE|/api/entries/symptoms/:id|User|

#### Kurssin työkalut

- node.js
- nodemon
- express.js
