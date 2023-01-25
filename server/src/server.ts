import { context } from './context'
import { resolvers, typeDefs } from './schema'
import { createServer } from 'http'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'

const startServer = async () => {
  const app = express()
  const httpServer = createServer(app)

  const apolloServer = new ApolloServer({ typeDefs, resolvers, context })

  await apolloServer.start()

  apolloServer.applyMiddleware({ app, path: '/' })

  httpServer.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(
      `Server listening on localhost:4000${apolloServer.graphqlPath}`,
    ),
  )
}

startServer()
