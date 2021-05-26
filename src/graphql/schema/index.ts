import { makeSchema, asNexusMethod } from 'nexus'
import { nexusPrisma } from 'nexus-plugin-prisma'
import { DateTimeResolver } from 'graphql-scalars'
import path from 'path'
import { applyMiddleware } from 'graphql-middleware'
import { permissions } from '../permissions'

import * as User from './types/User'
import * as ExampleQuery from './types/ExampleQuery'

export const GQLDate = asNexusMethod(DateTimeResolver, 'date')

export const baseSchema = makeSchema({
  types: [User, ExampleQuery, GQLDate],
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
      outputs: {
        typegen: path.join(process.cwd(), 'src/graphql/schema/nexus-prisma-typegen.ts'),
      },
    }),
  ],
  shouldGenerateArtifacts: process.env.NODE_ENV === 'development',
  outputs: {
    typegen: path.join(process.cwd(), 'src/graphql/schema/nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'src/graphql/schema/schema.graphql'),
  },
  contextType: {
    module: path.join(process.cwd(), 'src/graphql/context.ts'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})

export const schema = applyMiddleware(baseSchema, permissions)
