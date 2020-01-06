import { User, UserType } from './model'
import {
  QueryResult,
  LoginResult,
  AddResult,
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
      // 实际上 graphql 控制了返回值，如果 QueryResult 没有定义 password，就算从数据库取出来，获取时也会报错
      const res = (await User.find(payload, '-password')) || []
      return { result: !!res.length, data: res }
    },
    async login(_: unknown, { payload }: QueryLoginArgs): Promise<LoginResult> {
      const res = await User.findOne(payload, '-password')
      return { result: !!res, data: res }
    },
  },
  Mutation: {
    async addUser(_: unknown, { payload }: MutationAddUserArgs): Promise<AddResult> {
      try {
        // 添加重复的 name 会抛错
        const res = await User.create(payload)
        return { result: !!res, data: res }
      } catch {
        return { result: false }
      }
    },
    async deleteUser(_: unknown, conditions: MutationDeleteUserArgs): Promise<DeleteResult> {
      const res = await User.findOneAndDelete(conditions)
      return { result: !!res }
    },
    async updateUser(_: unknown, { name, payload }: MutationUpdateUserArgs): Promise<UpdateResult> {
      if (!payload || !Object.keys(payload).length) return { result: false }
      const res = await User.findOneAndUpdate({ name }, payload)
      let newUser: UserType = null
      if (res) {
        newUser = await User.findOne({ name: payload.name || name }, '-password')
      }
      return { result: !!res, data: newUser }
    },
  },
}
