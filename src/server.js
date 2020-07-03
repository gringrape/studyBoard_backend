// server, middleware
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
// schema
import { typeDefs } from './typeDefs/typeDefs';
import { resolvers } from './resolvers/resolvers';
// security
import depthLimit from 'graphql-depth-limit';
import helmet from 'helmet';
// dataloader
import { commentsDataLoader } from './dataloaders/commentDataLoader';
// env
import dotenv from 'dotenv';
dotenv.config();

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  playground: true,
  introspection: false,
  context: () => ({
    loaders: {
      commentsLoader: commentsDataLoader()
    }
  }),
  validationRules: [
    depthLimit(10)
  ]
});

const app = express();
app.use(helmet());

server.applyMiddleware({ app });

app.listen({port: 4000}, () => {
  console.log('server is listening on port 4000');
});