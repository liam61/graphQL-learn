export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export interface AddPayload {
  name: Scalars['String']
  password: Scalars['String']
  gender?: Maybe<Gender>
  age?: Maybe<Scalars['Int']>
}

export interface AddResult {
  result: Scalars['Boolean']
  data?: Maybe<User>
}

export interface DeleteResult {
  result: Scalars['Boolean']
}

export interface Filter {
  name?: Maybe<Scalars['String']>
  gender?: Maybe<Gender>
  age?: Maybe<Scalars['Int']>
}

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
}

export interface LoginPayload {
  name: Scalars['String']
  password: Scalars['String']
}

export interface LoginResult {
  result: Scalars['Boolean']
  data?: Maybe<User>
}

export interface Mutation {
  addUser: AddResult
  deleteUser: DeleteResult
  updateUser: UpdateResult
}

export interface MutationAddUserArgs {
  payload: AddPayload
}

export interface MutationDeleteUserArgs {
  name: Scalars['String']
}

export interface MutationUpdateUserArgs {
  name: Scalars['String']
  payload: UpdatePayload
}

export interface Query {
  userList: QueryResult
  login: LoginResult
}

export interface QueryUserListArgs {
  payload?: Maybe<Filter>
}

export interface QueryLoginArgs {
  payload: LoginPayload
}

export interface QueryResult {
  result: Scalars['Boolean']
  data: Array<Maybe<User>>
}

export interface UpdatePayload {
  name?: Maybe<Scalars['String']>
  gender?: Maybe<Gender>
  age?: Maybe<Scalars['Int']>
}

export interface UpdateResult {
  result: Scalars['Boolean']
  data?: Maybe<User>
}

export interface User {
  name: Scalars['String']
  password?: Maybe<Scalars['String']>
  gender?: Maybe<Gender>
  age?: Maybe<Scalars['Int']>
}
