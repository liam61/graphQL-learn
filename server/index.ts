import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'
import { typeDefs, resolvers } from './models/user'
import { initMongoClient } from './db'

const app = express()
const PORT = 4000

initMongoClient()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app })

app.listen(PORT, () => {
  console.log(`🚀 graphQL server ready at http://localhost:${PORT}${server.graphqlPath}`)
})
