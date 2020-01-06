import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type User {
    name: String!
    # password: String 该字段不显示和操作
    gender: Gender
    age: Int
  }

  enum Gender {
    MALE
    FEMALE
  }

  type Query {
    userList(payload: Filter): QueryResult!
    login(payload: LoginPayload!): LoginResult!
  }

  type Mutation {
    addUser(payload: AddPayload!): AddResult!
    deleteUser(name: String!): DeleteResult!
    updateUser(name: String!, payload: UpdatePayload!): UpdateResult!
  }

  input Filter {
    name: String
    gender: Gender
    age: Int
  }

  type QueryResult {
    result: Boolean!
    data: [User]!
  }

  input LoginPayload {
    name: String!
    password: String!
  }

  type LoginResult {
    result: Boolean!
    data: User
  }

  input AddPayload {
    name: String!
    password: String!
    gender: Gender
    age: Int
  }

  type AddResult {
    result: Boolean!
    data: User
  }

  type DeleteResult {
    result: Boolean!
  }

  input UpdatePayload {
    name: String
    gender: Gender
    age: Int
  }

  type UpdateResult {
    result: Boolean!
    data: User
  }
`
