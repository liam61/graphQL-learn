import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'
import { typeDefs, resolvers } from './models/user'
import { initMongoClient } from './db'
import { serverPort, graphqlPath, host } from './../common/index'

const app = express()

initMongoClient()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app })

app.listen(serverPort, () => {
  console.log(
    `🚀 graphQL server ready at http://${host}:${serverPort}${graphqlPath || server.graphqlPath}`,
  )
})
