import redis, { ClientOpts, RedisClient } from 'redis'
import { host } from 'common/const'

const defaultOpts: ClientOpts = {
  host,
}

function initRedisClient(options?: ClientOpts) {
  const client = redis.createClient(Object.assign(defaultOpts, options))
  initListeners(client)
  return client
}

function initListeners(client: RedisClient) {
  client.on('connect', () => console.log('redis connection succeed'))
  client.on('error', error => console.log('redis db failed', error))
  client.on('end', () => console.log('redis is disconnected'))
}

export const client = initRedisClient()
