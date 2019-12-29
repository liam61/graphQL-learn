import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import App from './app'
import { host, serverPort, graphqlPath } from 'common'
import './assets/css/font-awesome.min.css'
import 'bulma/css/bulma.css'
import './index.less'

const client = new ApolloClient({ uri: `http://${host}:${serverPort}${graphqlPath}` })

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.querySelector('#app'),
)
