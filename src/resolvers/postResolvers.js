import { commentRepo, postRepo } from '../repos/repos';

export const postResolvers = {
  Query: {
    getPosts: (_, {number}) => {
      const requestLimit = 100;
      if (number > requestLimit) throw new Error('query amount exceeded!'); // schema 확인에서 걸러질 수 있도록 처리
      return postRepo.getPosts(number);
    },
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
      const {id} = await postRepo.insertPost(data);
      return Object.assign(data, {id: id});
    },
    modifyPost: (_, {input}) => {
      return postRepo.updatePost(input);
    },
    deletePost: (_, {id}) => {
      return postRepo.deletePostById(id);
    }
  },
  Post: {
    comments: ({id}) => commentRepo.getCommentsByPostId(id)
  }
};
