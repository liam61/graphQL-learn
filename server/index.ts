import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'
import { typeDefs, resolvers } from './models/user/redis'
import { serverPort, graphqlPath, host } from 'common/const'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app })

app.listen(serverPort, () => {
  console.log(
    `🚀 graphQL server ready at http://${host}:${serverPort}${graphqlPath || server.graphqlPath}`,
  )
})
