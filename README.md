# Booking Website (MERN Stack)

## Booking Website
The website makes booking accommodations while traveling easier. The website includes client-side functionalities such as viewing hotels, searching for hotels, logging in, and registering an account. On the admin-side, the owner can add/edit/delete rooms, track revenue, and monitor occupied rooms.

## Demo

\*Note: Please open link server-side first.

- Server side: [Link](https://booking-server-9cpa.onrender.com/)
- Client side: [Link](https://asm3-client-504fd.web.app/)
- Admin side: [Link](https://booking-admin-8d9bb.web.app/login)
- Client-role account: `email: test@test.com`, `password: 12345`
- Admin-role account: `email: test2@test.com`, `password: 12345`

## Project Breakdown

### API Server

- Directory: Server
- Features:
  - [x] Building API server (MVC model) - CRUD operations.
  - [x] Generating schema models.
  - [x] Session-cookie to store data login user.
  - [x] Authenticating, encrypt password with bcrypt.
  - [x] Live chat with socket.io.

### Client App

- Directory: Client App
- Features:
  - [x] Login, sign up account.
  - [x] Home page, shop page, detail product page.
  - [x] Cart page, check out page, history orders page (for logged in user).
  - [x] Redux/redux-toolkit to store data.
  - [x] React-router.
  - [x] Live chat.
  - [x] Send email when order successfully.

### Admin App

- Directory: Admin App
- Features: 
  - [x] Login.
  - [x] Dashboard page - summarize data.
  - [x] Create/update/delete products.
  - [x] Show and manage orders of users.
  - [x] Live chat with customer.

### Deployment on local

#### Prerequisites

- MongoDB 
- NodeJS
- npm

#### Client-side (Dir: Client App)
- Access src/util/url.js, change root to 'http://localhost:5000' (domain of server on port 5000).

```
$ cd  client      // go to client folder
$ yarn # or npm i     // install packages
$ npm start     // run it locally
```

#### Admin-side (Dir: Admin App)
- Access ./src/utils/url.js, change root to 'http://localhost:5000' (domain of server on port 5000).

```
$ cd  Admin App      // go to client folder
$ yarn # or npm i     // install packages
$ npm start     // run it locally
```

#### Server-side (Dir: Server)
- Access ./src/utils/url.js, change root to 'http://localhost:5000' (domain of server on port 5000).
- In ./nodemon.json, add your mongoDB credential
- Create products collection by import ./products.json file

```
$ cd  Admin App      // go to client folder
$ yarn # or npm i     // install packages
$ npm run start:dev     // run it locally
```
