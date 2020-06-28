import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';

const server = new ApolloServer({
  typeDefs: gql`
    type Query {
      hello: String
    }
  `,
  resolvers: {
    Query: {
      hello: () => 'hello world!'
    }
  }
});

const app = express();

server.applyMiddleware({ app });

app.listen({port: 4000}, () => {
  console.log('server is listening on port 4000');
});