import { objectType, extendType } from '@nexus/schema'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.image()
    t.model.createdAt()
    t.model.updatedAt()
  },
})

export const UserQueries = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.user()
  },
})

export const UserMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.createOneUser()
  },
})
