import gql from 'graphql-tag'

const userFrag = gql`
  fragment UserFrag on User {
    name
    age
    gender
  }
`

export const getUserList = gql`
  query getUserList($payload: Filter) {
    userList(payload: $payload) {
      result
      data {
        ...UserFrag
      }
    }
  }
  ${userFrag}
`

export const userLogin = gql`
  query userLogin($payload: LoginPayload!) {
    login(payload: $payload) {
      result
      data {
        ...UserFrag
      }
    }
  }
  ${userFrag}
`

export const addUser = gql`
  mutation addUser($payload: AddPayload!) {
    addUser(payload: $payload) {
      result
      data {
        ...UserFrag
      }
    }
  }
  ${userFrag}
`

export const updateUser = gql`
  mutation updateUser($name: String!, $payload: UpdatePayload!) {
    updateUser(name: $name, payload: $payload) {
      result
      data {
        ...UserFrag
      }
    }
  }
  ${userFrag}
`

export const deleteUser = gql`
  mutation deleteUser($name: String!) {
    deleteUser(name: $name) {
      result
    }
  }
`
