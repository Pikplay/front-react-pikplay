import cookieCutter from 'cookie-cutter'
import { InMemoryCache, ApolloClient } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createHttpLink } from 'apollo-link-http'
import VARS from '../lib/variables'

let token = null
if (typeof window !== 'undefined') {
  token = cookieCutter.get('token')
}

const httpLink = createHttpLink({
  uri: VARS.API_URL,
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: token,
    },
  }
})

const graphqlClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
})

export default graphqlClient
