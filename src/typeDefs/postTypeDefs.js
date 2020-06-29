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
`;