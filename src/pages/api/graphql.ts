import { createContext } from 'graphql/context'
import { schema } from 'graphql/schema'
import cors from 'micro-cors'
import { ApolloServer } from 'apollo-server-micro'
import { NextApiHandler, PageConfig } from 'next'

// Apollo Server Micro takes care of body parsing
export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
}

const apolloServer = new ApolloServer({
  schema,
  context: createContext,
})

let apolloServerHandler: NextApiHandler

async function getApolloServerHandler() {
  if (!apolloServerHandler) {
    await apolloServer.start()

    apolloServerHandler = apolloServer.createHandler({
      path: '/api/graphql',
    })
  }

  return apolloServerHandler
}

const handler: NextApiHandler = async (req, res) => {
  const apolloServerHandler = await getApolloServerHandler()

  if (req.method === 'OPTIONS') {
    res.end()
    return
  }

  return apolloServerHandler(req, res)
}

// Enable studio in development mode
const corsConfig =
  process.env.NODE_ENV === 'development'
    ? {
        origin: 'https://studio.apollographql.com',
        allowCredentials: true,
      }
    : {}

export default cors(corsConfig)(handler)
