import { Document } from 'mongoose'

export interface Payload<T> {
  payload: T
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export interface UserType extends Document {
  name: string
  gender?: Gender
  age?: number
}

export interface Filter {
  name?: string
  gender?: Gender
  age?: number
}

export interface LoginPayload {
  name: string
  password: string
}

export interface AddPayload {
  name: string
  password: string
  gender?: Gender
  age?: number
}

export interface UpdateType {
  name: string
  payload: Filter
}
