# Boilerplate starter with next-auth, prisma, next.js
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## First steps

Up local postgres by `docker-compose`, setup [`.env`](#env) and start `dev` server

```
npm i
npm run dev
```

## Migrations

```
// modify schema && make migrations
npx prisma migrate save --name init --experimental
npx prisma migrate up --experimental
// generate client
npm run generate
```

## Prisma studio

Open prisma studio interface

```
npm run studio
```

## ENV

Use `.env.local` on production or `.env.development` on dev. [Read more](https://nextjs.org/docs/basic-features/environment-variables)

```
# Database
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/prisma?schema=public"

# Auth providers
AUTH_SECRET="this-is-a-secret-value-with-at-least-32-characters"
NEXTAUTH_URL="http://localhost:3000"

PROVIDER_GITHUB_ID=""
PROVIDER_GITHUB_SECRET=""
PROVIDER_SMTP_HOST=""
PROVIDER_SMTP_PORT=""
PROVIDER_SMTP_USER=""
PROVIDER_SMTP_PASSWORD=""
PROVIDER_SMTP_FROM=""
```
