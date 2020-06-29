import { gql } from 'apollo-server-express';

export const typeDefs =  gql`
  type Query {
    getPosts: [Post]
    getPost(id: ID!): Post
  }

  type Mutation {
    createPost(input: PostInput): Post
    modifyPost(input: ModifyPostInput): Post
    deletePost(id: String!): Post

    addComment(input: CommentInput): Comment
    deleteComment(id: String!): Comment
    modifyComment(input: ModifyCommentInput): Comment
  }
`;