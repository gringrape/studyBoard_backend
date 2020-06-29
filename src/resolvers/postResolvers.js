import { postRepo } from '../repos/postRepo';

export const postResolvers = {
  Query: {
    getPosts: () => postRepo.getPosts(),
    getPost: (_, {id}) => postRepo.getPostById(id)
  },
  Mutation: {
    createPost: async (_, {input: {title, writer, content, tags}}) => {
      const data = {
        title,
        writer,
        content,
        tags: tags,
        heartsCount: 0,
        at: new Date()
      };
      const { id } = await postRepo.insertPost(data);
      return Object.assign(data, {id: id});
    },
    modifyPost: (_, { input }) => {
      return postRepo.updatePost(input);
    },
    deletePost: (_, {id}) => {
      return postRepo.deletePostById(id);
    }
  },
  Post: {
    comments: () => []
  }
};
