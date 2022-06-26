import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL,
  // In this project we'll be using POST methods directly from FE, but this is highly not recommended for any application that will go to production
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
  },
  cache: new InMemoryCache()
});