import { objectType, extendType } from '@nexus/schema'

export const ExampleQueryType = objectType({
  name: 'Example',
  definition(t) {
    t.string('message')
  },
})

export const Queries = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('example', {
      type: 'Example',
      resolve: async (parent, args, ctx) => {
        return {
          message: 'Hello there!',
        }
      },
    })
  },
})
