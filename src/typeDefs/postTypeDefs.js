import {gql} from 'apollo-server-express';

// TODO: at property 의 타입을 custom Date type 으로 수정

export const postTypeDefs = gql`
  input PostInput {
    title: String!
    writer: String!
    content: String!
    tags: [String]
  }

  input ModifyPostInput {
    id: String!
    title: String
    content: String
    tags: [String]
    heartsCount: Int
  }

  type SinglePostOutput {
    id: ID!
    title: String!
    writer: String!
    content: String!
    comments: [Comment]
    tags: [String]
    heartsCount: Int
    at: String
    prev_id: String
    prev_title: String
    next_id: String
    next_title: String 
  }

  type Post {
    id: ID!
    title: String!
    writer: String!
    content: String!
    comments: [Comment]
    tags: [String]
    heartsCount: Int
    at: String 
  }

  type Tag {
    name: String
    count: Int
  }

  type Query {
    getPosts(offset: Int!, limit: Int!, tag: String, titleQuery: String): [Post]
    getPost(id: ID!): SinglePostOutput
    getTags: [Tag]
  }

  type Mutation {
    createPost(input: PostInput): Post
    modifyPost(input: ModifyPostInput): Post
    deletePost(id: String!): Post
  }
`;
