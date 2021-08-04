import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'
import { UserProvider } from '@auth0/nextjs-auth0'
import '../styles/global.css'

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)

  return (
    <UserProvider>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </UserProvider>
  );
}
