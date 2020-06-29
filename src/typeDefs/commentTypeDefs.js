import { gql } from 'apollo-server-express';

export const commentTypeDefs =  gql`
  input CommentInput {
    post_id: String!
    writer: String!
    content: String!
  }

  input ModifyCommentInput {
    id: String!
    content: String
  }

  type Comment {
    id: ID!
    writer: String!
    at: String!
    content: String
    post_id: String!
  }
`;