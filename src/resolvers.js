import { posts } from './db/posts';

export const resolvers = {
  Query: {
    getPosts: () => posts, // o.k.
    getPost: (_, {id}) => posts.find(({id: postId}) => postId === id) 
  },
  Mutation: {
    createPost: (_, {input: {title, writer, content}}) => {
      posts.push({
        title,
        writer,
        content,
        id: `00${posts.length + 1}`,
        tags: [],
        heartsCount: 0,
        at: (new Date()).toString()
      });
      return posts.slice(-1)[0];
    },
    modifyPost: (_, {input: {id, title, content}}) => {
      let post = posts.find(({id: postId}) => postId === id);
      Object.assign(post, {
        title: (title) ? title : post.title,
        content: (content) ? content : post.content
      });
      return post;
    },
    deletePost: (_, {id}) => {
      const idx = posts.findIndex(({id: postId}) => postId === id);
      return posts.splice(0, 1)[0];
    }
  },
  Post: {
    comments: () => []
  }
};
