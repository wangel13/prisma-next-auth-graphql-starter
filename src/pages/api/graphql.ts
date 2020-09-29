import { ApolloServer } from 'apollo-server-micro'
import { createContext } from 'graphql/context'
import { schema } from 'graphql/schema'

const apolloServer = new ApolloServer({
  schema,
  context: createContext,
  playground: process.env.NODE_ENV !== 'production',
})

export default apolloServer.createHandler({ path: '/api/graphql' })

export const config = {
  api: {
    bodyParser: false,
  },
}
