'use client';

import { ApolloLink, HttpLink } from '@apollo/client';
import { ApolloClient } from '@apollo/experimental-nextjs-app-support';
import { InMemoryCache } from '@apollo/experimental-nextjs-app-support';
import { SSRMultipartLink } from '@apollo/experimental-nextjs-app-support';
import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support';

function makeClient() {
  const httpLink = new HttpLink({
    uri: 'http://localhost:4000/api/graphql',
    fetchOptions: { cache: 'no-store' },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
