import { commentRepo } from '../repos/commentRepo';
import { postRepo } from '../repos/postRepo';

export const commentResolvers = {
  Mutation: {
    addComment: async (_, {input}) => {
      const data = Object.assign(input, {at: new Date()});
      const {count} = await postRepo.findById(input.post_id);
      const postExist = count == 1; 
      if (!postExist) throw new Error('Post does not exist!');
      return commentRepo.insertComment(data);    
    },
    deleteComment: (_, {id}) => {
      return commentRepo.deleteCommentById(id);
    },
    modifyComment: (_, {input}) => {
      return commentRepo.updateComment(input);
    }
  }
};
