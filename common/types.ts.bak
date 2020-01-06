import { Document } from 'mongoose'

export interface Payload<T> {
  payload: T
}

export interface BaseResult {
  result: boolean
}

export interface UserType extends Document {
  name: string
  gender?: GENDER
  age?: number
}

export enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export interface Filter {
  name?: string
  gender?: GENDER
  age?: number
}

export interface QueryResult extends BaseResult {
  data: UserType[]
}

export interface LoginPayload {
  name: string
  password: string
}

export interface LoginResult extends BaseResult {
  data?: UserType
}

export interface AddPayload {
  name: string
  password: string
  gender?: GENDER
  age?: number
}

export interface AddResult extends BaseResult {
  data: UserType
}

export interface DeleteResult extends BaseResult {}

export interface UpdateType {
  name: string
  payload: Filter
}

export interface UpdateResult extends BaseResult {
  data?: UserType
}
