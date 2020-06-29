import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { typeDefs } from './typeDefs/typeDefs';
import { postTypeDefs } from './typeDefs/postTypeDefs';
import { commentTypeDefs } from './typeDefs/commentTypeDefs';
import { merge, fromPairs } from 'lodash';
import { postResolvers } from './resolvers/postResolvers';
import { commentResolvers } from './resolvers/commentResolvers';
import dotenv from 'dotenv';

dotenv.config();

const server = new ApolloServer({
  typeDefs: [typeDefs, postTypeDefs, commentTypeDefs],
  resolvers: merge(postResolvers, commentResolvers)
});

const app = express();

server.applyMiddleware({ app });

app.listen({port: 4000}, () => {
  console.log('server is listening on port 4000');
});