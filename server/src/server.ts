import { context } from './context'
import { resolvers, typeDefs } from './schema'
import { createServer } from 'http'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import { makeExecutableSchema } from '@graphql-tools/schema'
// import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
// import { ApolloServer } from '@apollo/server'
// import { ApolloServer } from 'apollo-server'

const startServer = async () => {
  const app = express()
  const httpServer = createServer(app)

  // const schema = makeExecutableSchema({ typeDefs, resolvers })

  // const wsServer = new WebSocketServer({
  //   server: httpServer,
  //   path: '/',
  // })

  // const wsServerCleanup = useServer({ schema, context }, wsServer)

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({ app, path: '/' })
  // app.use()

  httpServer.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(
      `Server listening on localhost:4000${apolloServer.graphqlPath}`,
    ),
  )
}

startServer()
