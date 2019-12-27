import { UserType } from './types'
import { Schema, model } from 'mongoose'

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['MALE', 'FEMALE'],
    },
    age: Number,
  },
  {
    timestamps: true,
  },
)

export const User = model<UserType>('User', userSchema)
