import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    // this needs to be an absolute url, as relative urls cannot be used in SSR
    uri: process.env.NEXT_PUBLIC_API,
    credentials: 'same-origin',
    // you can disable result caching here if you want to
    // fetchOptions: { cache: "no-store" },
  }),
});

export default client;
