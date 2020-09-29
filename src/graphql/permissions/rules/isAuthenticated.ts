import { getSession } from 'next-auth/client'
import { rule } from 'graphql-shield'

export const isAuthenticated = rule({ cache: 'contextual' })(async (parent, args, { req }, info) => {
  const session = await getSession({ req })
  return Boolean(session)
})
