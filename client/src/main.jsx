import React from 'react';
import ReactDOM from 'react-dom/client';

// apollo
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';

import App from './App';
import './index.css';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

// client.query({
//   query: gql `
//     query GetBooks {
//       books {
//         id
//         name
//         genre
//       }
//     }
//   `
// })
//   .then( result => console.log(result));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
