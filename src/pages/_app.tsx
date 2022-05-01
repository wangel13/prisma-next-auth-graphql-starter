import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import '../styles/global.css'

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: '/api/graphql',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  )
}
