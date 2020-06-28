import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import { typeDefs } from './typeDefs';

const server = new ApolloServer({
  typeDefs,
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