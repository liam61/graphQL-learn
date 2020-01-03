import { ConnectionOptions, connect, connection } from 'mongoose'
import { dbName, host } from 'common/const'

const connectStr = `mongodb://${host}:27017/${dbName}`

const defaultOpts: ConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}

export function initMongoClient(url = connectStr, options?: ConnectionOptions) {
  connect(url, Object.assign(defaultOpts, options))
  initListeners()
}

function initListeners() {
  connection.on('connected', () => console.log('mongodb connection succeed'))
  connection.on('error', error => console.log('mongodb connection failed', error))
  connection.on('disconnected', error => console.log('mongodb is disconnected', error))
}
