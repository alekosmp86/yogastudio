# Magic Link Authentication Architecture (HTTP-Only Cookies)

This document explains the complete architecture and request flow of your Magic Link authentication system using **Next.js (frontend)** + **Node.js/Express + Prisma (backend)**, with **HTTP-only JWT cookies** for secure session management.

The goal: **simple structure**, **centralized session validation**, **no duplicated logic**, and **secure short-lived sessions (15 minutes)**.

---

## 📌 Overview

Your authentication system works like this:

1. **User enters email** → backend generates **magic link** + stores a record.
2. User clicks magic link → frontend calls backend to **verify token**.
3. Backend validates token → sets secure **HTTP-only cookie** (15 min lifetime).
4. User is redirected to `/`.
5. Frontend immediately calls `/auth/me` to validate session.
6. Backend reads & verifies **session cookie** → returns user & role.
7. Frontend redirects user to the correct dashboard based on role.
8. Any protected page/layout automatically checks `/auth/me` and blocks navigation if invalid.

---

## 📁 Project Structure

### **Frontend (Next.js App Router)**

```
app/
  auth/
    verify/        → Uses token from magic link, calls /token-validation
  customer/
    layout.tsx     → Protected layout (CLIENT)
  owner/
    layout.tsx     → Protected layout (OWNER)
  page.tsx         → Root → redirects based on role via /auth/me
components/
  protected-layout/
    withLayoutAuth.tsx → Layout wrapper that checks session once

lib/
  api.ts           → fetch wrapper for /auth/me
```

### **Backend (Express)**

```
src/
  auth/
    auth.controller.ts
    auth.routes.ts
    auth.service.ts
  users/
    UserService.ts
  prisma/
    schema.prisma
```

---

## 🔐 Authentication Flow (Step-by-step)

### **1. User Requests Magic Link**

`GET /auth/magic-link?email=user@example.com`

Backend:

- Validates email
- Creates a magic link entry in DB with expiration
- Sends the user a URL like:

```
http://localhost:3000/auth/verify?token=abc123
```

---

### **2. User Clicks Magic Link**

Next.js route: `app/auth/verify/page.tsx`

Frontend:

- Extracts token from URL
- Calls backend `/auth/token-validation` with that token

```
POST /auth/token-validation
```

Backend:

- Validates token (DB check)
- Generates **JWT session cookie** valid for **15 minutes**
- Sends cookie to browser

Frontend:

- Redirects to `/`

---

## **3. Homepage Auto-revalidates Session**

`app/page.tsx`

Immediately calls:

```
GET /auth/me
```

with the HTTP-only cookie.

Backend:

- Verifies JWT signature
- Ensures it’s not expired
- Loads user
- Returns `{ authenticated: true, user }`

Result:

- `/customer/home` for CLIENT
- `/owner/dashboard` for OWNER
- `/login` if invalid

---

## **4. Protected Layouts**

### Centralized, no duplication.

Example: `app/customer/layout.tsx`

```tsx
export default withLayoutAuth(CustomerLayout, "CLIENT");
```

This wrapper:

- calls `/auth/me` **once on layout load**
- redirects if session invalid or role mismatch
- children render normally otherwise

No need to do this per page.

---

## 🍪 Cookie Structure

The session cookie:

```
Set-Cookie: session=<jwt>; HttpOnly; Secure; SameSite=Strict; Max-Age=900
```

**Why?**

- Prevents XSS reading token
- Cannot be stolen from JS
- Works on all pages

---

## 🧩 JWT Payload Structure

```
{
  userId: 123,
  role: "CLIENT",
  iat: 1710000000,
  exp: 1710000900 // 15 minutes
}
```

---

## 🔄 Session Renewal (Sliding Session)

Every time `/auth/me` is called, backend refreshes cookie:

```
maxAge: 15 * 60 * 1000
```

User remains logged in **as long as they stay active**.

If inactive → cookie expires → session ends.

---

## 🚫 What is NOT stored?

- No JWT in localStorage
- No user in localStorage
- No token in URL after verification

**All in cookies—safer.**

---

## 📌 Security Notes

- Session expires after **15 minutes of inactivity**
- Magic links expire quickly (recommended 10 minutes)
- JWT cannot be accessed by JS (HTTP-only)
- Routes cannot be accessed if cookie is invalid

---

## 🏁 Summary

Your authentication system now has:

✔ Secure sessions (HTTP-only JWT)

✔ Centralized validation (`/auth/me`)

✔ Protected layouts without code duplication

✔ Clear flow: magic link → cookie → validated session → dashboard

✔ Sliding expiration for active users
