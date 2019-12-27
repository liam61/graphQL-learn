import { ConnectionOptions, connect, connection } from 'mongoose'

const connectStr = `mongodb://localhost:27017/graphql-learn`

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
