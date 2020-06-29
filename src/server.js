import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import dotenv from 'dotenv';

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const app = express();

server.applyMiddleware({ app });

app.listen({port: 4001}, () => {
  console.log('server is listening on port 4000');
});