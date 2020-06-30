import { commentResolvers } from './commentResolvers';
import { postResolvers } from './postResolvers';
import { merge } from 'lodash';

export const resolvers = merge(
  commentResolvers, 
  postResolvers
);