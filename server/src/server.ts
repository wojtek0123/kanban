import { ApolloServer } from 'apollo-server'
import { resolvers, typeDefs } from './schema'
import { context } from './context'

new ApolloServer({ resolvers, typeDefs, context }).listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000`),
)
