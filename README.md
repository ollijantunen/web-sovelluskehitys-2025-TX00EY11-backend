## Web-sovelluskehitys -kurssi 1/2025-3/2025 @ Metropolia Ammattikorkeakoulu

### Backend-tehtävä, viikko 7

---

https://github.com/mattpe/hyte-web-dev/blob/main/11-documentation.md#assignment---api-documentation

#### Tehtävänanto

##### Week Assignment 7 - API Documentation

Continue your existing Express app and create a new branch docs (see teachers's lecture example)
  - [ ] Create API documentation for your app using apidoc, Swagger or other similar tool of your own choice
    - [x] install needed packages
    - [x] generate documentation (for example to docs folder using npm script)
    - [x] serve the documentation within your app (use express.static middleware for serving the docs folder)

Returning: No specific return is needed. The documentation should be available for your individual project.

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
|GET, PUT|/api/users/:id|User|
|DELETE|/api/users/:id|Admin|
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
