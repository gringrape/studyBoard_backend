import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { typeDefs } from './typeDefs/typeDefs';
import { resolvers } from './resolvers/resolvers';
import depthLimit from 'graphql-depth-limit';
import dotenv from 'dotenv';
import helmet from 'helmet';

dotenv.config();

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  validationRules: [depthLimit(10)]
});

const app = express();
app.use(helmet());

server.applyMiddleware({ app });

app.listen({port: 4000}, () => {
  console.log('server is listening on port 4000');
});