# Blog Application - Frontend Documentation

## Overview

Frontend for a multi-role blog app built with React, Vite, and Tailwind CSS. Supports article reading, authentication, dashboards, and article management.

---

## Tech Stack

* React 19
* Vite 7
* Tailwind CSS 4
* React Router 7
* Zustand
* Axios
* React Hook Form
* React Hot Toast
* ESLint

---

## Project Structure

```bash
frontend/
├── src/
│   ├── components/
│   ├── store/
│   ├── styles/
│   └── assets/
├── public/
├── package.json
├── vite.config.js
└── README.md
```

---

## Installation

```bash
git clone <repo-url>
cd frontend
npm install
npm run dev
```

App runs at:

```bash
http://localhost:5173
```

---

## Environment Variables

```env
VITE_API_URL=http://localhost:4000
VITE_PROD_API_URL=https://your-backend.com
```

---

## Main Components

### Authentication

* `Login.jsx` – User login
* `Register.jsx` – User registration
* `ProtectedRoute.jsx` – Route protection

### Dashboards

* `UserDashboard.jsx`
* `AuthorDashboard.jsx`
* `AdminDashboard.jsx`

### Articles

* `Home.jsx`
* `ArticleCard.jsx`
* `ArticleDetail.jsx`
* `AddArticle.jsx`
* `EditArticle.jsx`

---

## State Management

Uses Zustand for authentication.

```js
const authStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: async () => {},
  register: async () => {},
  logout: () => {}
}));
```

---

## Routing

```jsx
<Route path="/" element={<Home />} />
<Route path="/login" element={<Login />} />

<Route
  path="/author/dashboard"
  element={<ProtectedRoute><AuthorDashboard /></ProtectedRoute>}
/>
```

---

## API Integration

Axios setup:

```js
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});
```

Example APIs:

```js
POST /common-api/login
GET /user-api/read-articles
POST /author-api/articles
```

---

## Authentication Flow

1. User logs in
2. Backend returns JWT
3. Token stored in localStorage
4. Axios sends token in headers
5. Protected routes become accessible

---

## Styling

Uses Tailwind CSS.

```jsx
<button className="bg-blue-500 text-white px-4 py-2 rounded">
  Submit
</button>
```

---

## Build & Deployment

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

### Deployment

Configured for Vercel using `vercel.json`.

---

## Common Issues

| Issue         | Fix                 |
| ------------- | ------------------- |
| CORS error    | Check backend CORS  |
| 401 error     | Verify JWT token    |
| Styling issue | Restart Vite server |
| API failure   | Check backend URL   |

---

## Future Enhancements

* Dark mode
* Search & filters
* Notifications
* PWA support
* Offline mode

---

## Version

**Version:** 1.0.0
**Updated:** May 2026
