import { objectType, extendType } from 'nexus'

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
      resolve: async (_parent, _args, _context) => {
        return {
          message: 'Hello there!',
        }
      },
    })
  },
})
