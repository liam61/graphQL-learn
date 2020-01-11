import { client } from '../../db/redis'
import { AddPayload, UpdatePayload, Filter, User as UserType } from 'common/types'

export class User {
  constructor(payload: AddPayload) {
    User.create(payload)
  }

  static create(payload: AddPayload): Promise<UserType> {
    return new Promise((resolve, reject) => {
      User.getId(payload.name)
        .then(id => {
          if (id) throw new Error('deprecated user name')

          client.incr('user:ids', (err, newId) => {
            if (err) throw err

            client.set(`user:id:${payload.name}`, newId + '', (err, _) => {
              if (err) throw err

              client.hmset(`user:${newId}`, payload as any, (err, _) => {
                if (err) throw err

                delete payload.password
                resolve(payload)
              })
            })
          })
        })
        .catch(reject)
    })
  }

  static find(payload: Filter): Promise<UserType[]> {
    return new Promise((resolve, reject) => {
      client.get('user:ids', (err, count) => {
        if (err) return reject(err)
        if (!count) return resolve([]) // 没 user

        const userListPromise = Array.from({ length: +count }, (_, i) =>
          User.findById(i + 1 + '', payload),
        )

        Promise.all(userListPromise)
          .then(userList => {
            resolve(userList.filter(Boolean))
          })
          .catch(reject)
      })
    })
  }

  static updateByName(name: string, payload: UpdatePayload): Promise<UserType | null> {
    return new Promise((resolve, reject) => {
      User.getId(name)
        .then(id => {
          if (!id) return resolve(null)

          if (payload.name) {
            client.del(`user:id:${name}`, (err, _) => {
              if (err) throw err

              client.set(`user:id:${payload.name}`, id, (err, _) => {
                if (err) throw err
              })
            })
          }

          client.hmset(`user:${id}`, payload as any, err => {
            if (err) throw err

            User.findById(id).then(user => {
              resolve(user)
            })
          })
        })
        .catch(reject)
    })
  }

  static deleteByName(name: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      User.getId(name)
        .then(id => {
          if (!id) return resolve(false)

          client.del(`user:id:${name}`, (err, _) => {
            if (err) throw err
          })

          client.hdel(`user:${id}`, ['name', 'password', 'age', 'gender'], (err, _) => {
            if (err) throw err

            resolve(true)
          })
        })
        .catch(reject)
    })
  }

  static getId(name: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      client.get(`user:id:${name}`, (err, id) => {
        if (err) return reject(err)
        resolve(id)
      })
    })
  }

  static findById(id: string, conditions: Partial<UserType> = {}): Promise<UserType | null> {
    return new Promise((resolve, reject) => {
      client.hgetall(`user:${id}`, (err, user) => {
        if (err) return reject(err)
        if (!user) return resolve(null)

        const drop = Object.entries(conditions).some(([k, v]) => {
          if (!['', undefined, null].includes(v as any) && user[k] !== v + '') return true

          typeof v === 'number' && ((user as any)[k] = +v)
          return false
        })

        !drop && delete user.password
        resolve(drop ? null : (user as any))
      })
    })
  }
}
