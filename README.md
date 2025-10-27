# Student-Record-API

Minimal student records web app using Express, EJS, MongoDB and JWT auth.

## Features
- User signup / login with hashed passwords and JWT sessions.
- Create, edit, delete student records scoped to the authenticated user.
- Simple responsive UI with TailwindCSS.

## Quick start

1. Install dependencies
```sh
npm install
```

2. Create a `.env` (see [`.env`](.env)) and set:
- `MONGO_URI`
- `JWT_SECRET`
- `PORT` (optional)

3. Run in development:
```sh
npm run dev
```
The app starts from [app.js](app.js).

## Project structure (key files)
- Core entry: [app.js](app.js)
- Routes:
  - Authentication: [routes/auth.js](routes/auth.js)
  - Student CRUD: [routes/students.js](routes/students.js)
- Models:
  - [`User`](models/User.js) — user schema and password hashing
  - [`Student`](models/Student.js) — student schema (references `User`)
- Middleware:
  - [`auth` middleware](middleware/auth.js) — verifies JWT from cookies
- Views (EJS):
  - [views/landing.ejs](views/landing.ejs)
  - [views/login.ejs](views/login.ejs)
  - [views/signup.ejs](views/signup.ejs)
  - [views/dashboard.ejs](views/dashboard.ejs)
  - [views/editStudent.ejs](views/editStudent.ejs)
  - [views/404.ejs](views/404.ejs)
  - Partials: [views/partials/header.ejs](views/partials/header.ejs), [views/partials/footer.ejs](views/partials/footer.ejs)
- Static/CSS: [public/css](public/css) and [tailwind.config.js](tailwind.config.js)
- Config: [package.json](package.json), [.env](.env)

## Auth flow
- Signup creates a user via [routes/auth.js](routes/auth.js) and [`User`](models/User.js).
- Login issues a JWT signed with `JWT_SECRET` (from [.env](.env)) and stored in a cookie.
- Protected routes use [`auth`](middleware/auth.js) to set `req.user` before handling requests in [routes/students.js](routes/students.js).

## Notes
- MongoDB connection string is read from `MONGO_URI` in [.env](.env).
- Passwords are hashed automatically in the [`User`](models/User.js) schema pre-save hook.

## Contributing
Open issues/PRs on the repo listed in [package.json](package.json).

## License
ISC