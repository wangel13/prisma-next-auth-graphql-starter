import NextAuth from 'next-auth'
import TwitchProvider from 'next-auth/providers/twitch'
import GitHubProvider from 'next-auth/providers/github'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

// Enable studio auth in development mode
const cookiesPolicy =
  process.env.NODE_ENV === 'development'
    ? {
        sessionToken: {
          name: `_Secure_next-auth.session-token`,
          options: {
            httpOnly: true,
            sameSite: 'None',
            path: '/',
            secure: true,
          },
        },
      }
    : {}

const prisma = new PrismaClient()

export default NextAuth({
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    TwitchProvider({
      clientId: process.env.PROVIDER_TWITCH_CLIENT_ID,
      clientSecret: process.env.PROVIDER_TWITCH_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.PROVIDER_GITHUB_ID,
      clientSecret: process.env.PROVIDER_GITHUB_SECRET,
    }),
    EmailProvider({
      server: {
        host: process.env.PROVIDER_SMTP_HOST,
        port: Number(process.env.PROVIDER_SMTP_PORT),
        auth: {
          user: process.env.PROVIDER_SMTP_USER,
          pass: process.env.PROVIDER_SMTP_PASSWORD,
        },
      },
      from: process.env.PROVIDER_SMTP_FROM,
    }),
  ],
  cookies: cookiesPolicy,
})
