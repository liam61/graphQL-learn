import { Schema, model, Document } from 'mongoose'
import { User as BaseUser } from 'common/types'

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

export interface UserType extends BaseUser, Document {}

export const User = model<UserType>('User', userSchema)
