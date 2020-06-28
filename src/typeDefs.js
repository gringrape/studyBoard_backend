import {gql} from 'apollo-server-express';

// TODO: at property 의 타입을 custom Date type 으로 수정
// TODO: Post 의 mutation 연산 추가
// TODO: Comment 의 input type 추가
// TODO: Comment 의 mutation 연산 추가

export const typeDefs = gql`
  input PostInput {
    title: String!
    writer: String!
    content: String!
  }

  type Query {
    getPosts: [Post]
    getPost: Post
  }
  type Mutation {
    createPost(input: PostInput): Post
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
  type Comment {
    id: ID!
    writer: String!
    at: String!
    content: String
    post_id: String!
  }
`;