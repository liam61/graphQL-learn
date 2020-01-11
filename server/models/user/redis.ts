import { User } from './redis-model'
import {
  AddResult,
  QueryResult,
  LoginResult,
  DeleteResult,
  UpdateResult,
  MutationUpdateUserArgs,
  MutationAddUserArgs,
  MutationDeleteUserArgs,
  QueryLoginArgs,
  QueryUserListArgs,
} from 'common/types'

export * from './schema'

export const resolvers = {
  Query: {
    async userList(_: unknown, { payload }: QueryUserListArgs): Promise<QueryResult> {
      const res = await User.find(payload)
      return { result: !!res.length, data: res }
    },
    async login(_: unknown, { payload }: QueryLoginArgs): Promise<LoginResult> {
      const { name, password } = payload
      const id = await User.getId(name)
      if (!id) return { result: false }

      const res = await User.findById(id, { password })
      return { result: !!res, data: res }
    },
  },
  Mutation: {
    async addUser(_: unknown, { payload }: MutationAddUserArgs): Promise<AddResult> {
      const res = await User.create(payload)
      return { result: !!res, data: res }
    },
    async deleteUser(_: unknown, { name }: MutationDeleteUserArgs): Promise<DeleteResult> {
      const res = await User.deleteByName(name)
      return { result: !!res }
    },
    async updateUser(_: unknown, { name, payload }: MutationUpdateUserArgs): Promise<UpdateResult> {
      if (!payload || !Object.keys(payload).length) return { result: false }

      const res = await User.updateByName(name, payload)
      return { result: !!res, data: res }
    },
  },
}
