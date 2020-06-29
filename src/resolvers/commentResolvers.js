import { commentRepo } from '../repos/commentRepo';

export const commentResolvers = {
  Mutation: {
    addComment: (_, {input}) => {
      const data = Object.assign(input, {at: new Date()});
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