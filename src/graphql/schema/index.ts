import { makeSchema, asNexusMethod } from '@nexus/schema'
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema'
import { GraphQLDate } from 'graphql-iso-date'
import path from 'path'
import { applyMiddleware } from 'graphql-middleware'
import { permissions } from '../permissions'

import * as User from './types/User'
import * as ExampleQuery from './types/ExampleQuery'

export const GQLDate = asNexusMethod(GraphQLDate, 'date')

export const baseSchema = makeSchema({
  types: [User, ExampleQuery, GQLDate],
  plugins: [
    nexusSchemaPrisma({
      experimentalCRUD: true,
      outputs: {
        typegen: path.join(process.cwd(), 'src/graphql/schema/nexus-prisma-typegen.ts'),
      },
    }),
  ],
  outputs: {
    typegen: path.join(process.cwd(), 'src/graphql/schema/nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'src/graphql/schema/schema.graphql'),
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: path.join(process.cwd(), 'src/graphql/context.ts'),
        alias: 'Context',
      },
    ],
  },
})

export const schema = applyMiddleware(baseSchema, permissions)
