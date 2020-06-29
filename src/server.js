import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { postTypeDefs } from './typeDefs/postTypeDefs';
import { commentTypeDefs } from './typeDefs/commentTypeDefs';
import { merge } from 'lodash';
import { postResolvers } from './resolvers/postResolvers';
import { commentResolvers } from './resolvers/commentResolvers';
import dotenv from 'dotenv';

dotenv.config();

const server = new ApolloServer({
  typeDefs: [postTypeDefs, commentTypeDefs],
  resolvers: merge(postResolvers, commentResolvers)
});

const app = express();

server.applyMiddleware({ app });

app.listen({port: 4001}, () => {
  console.log('server is listening on port 4000');
});