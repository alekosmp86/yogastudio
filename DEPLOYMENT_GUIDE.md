# Deployment Guide (Vercel)

This document outlines the necessary configuration to deploy the Yoga App to Vercel, especially considering the modular Prisma schema system.

## Vercel Project Settings

### Build & Install Settings

To ensure the modular schema is correctly merged and applied before the application builds, configure the following commands in the Vercel Dashboard (**Settings > General**):

- **Build Command:**

  ```bash
  npm run prisma-generate && npx prisma migrate deploy && npx prisma generate && npm run build
  ```

  > [!NOTE]
  > This sequence:
  >
  > 1. Merges `base.prisma` and module `models.prisma` files.
  > 2. Applies any pending database migrations.
  > 3. Generates the Prisma Client.
  > 4. Builds the Next.js application.

- **Install Command:**
  ```bash
  npm install
  ```

---

## Environment Variables

Configure these variables in **Settings > Environment Variables**:

| Variable                      | Description                                                                       |
| :---------------------------- | :-------------------------------------------------------------------------------- |
| `DATABASE_URL`                | Connection string for your PostgreSQL database (e.g., Supabase or Neon).          |
| `GOOGLE_CLIENT_ID`            | OAuth Client ID for Google Authentication.                                        |
| `GOOGLE_CLIENT_SECRET`        | OAuth Client Secret for Google Authentication.                                    |
| `NEXT_PUBLIC_APP_URL`         | The public URL of your application (e.g., `https://your-app.vercel.app`).         |
| `CRON_SECRET`                 | A secure random string used to verify cron job requests.                          |
| `NEXT_PRIVATE_RESEND_API_KEY` | API key for the Resend service used for sending emails.                           |
| `JWT_SECRET`                  | Secret key used for signing and verifying JSON Web Tokens for session management. |

---

## First Deployment Checklist

1.  **Database Connection:** Ensure the `DATABASE_URL` is correct and the database is accessible from Vercel.
2.  **Initial Migration:** Before the first deploy, make sure you have generated an initial migration locally using `npx prisma migrate dev --name init` and pushed the `prisma/migrations` folder to GitHub.
3.  **Variable Scope:** Ensure all environment variables are enabled for the relevant environments (Production, Preview, Development).
