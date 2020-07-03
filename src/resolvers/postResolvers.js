import { postRepo } from '../repos/repos';
import { countBy } from 'ramda';

export const postResolvers = {
  Query: {
    getPosts: (_, {number}) => {
      const requestLimit = 100;
      if (number > requestLimit) throw new Error('query amount exceeded!'); // schema 확인에서 걸러질 수 있도록 처리
      return postRepo.getPosts(number);
    },
    getPost: (_, {id}) => postRepo.getPostById(id),
    getTags: async () => {
      const tags = await postRepo.getAllTags(); // [{tag: 'tag1'}, {tag: 'tag2'}];
      const obj = countBy(tag => tag)(tags.map(({tag}) => tag)); // [['tag1', 1], ['tag2', 2]]; ==> [[tag, count]]
      return Object.entries(obj).map(([name, count]) => ({name, count})); // [{name: 'tag1', count: 1} ...]
    }
  },
  Mutation: {
    createPost: async (_, {input: {title, writer, content, tags}}) => {
      const data = {
        title,
        writer,
        content,
        tags: tags,
        heartsCount: 0,
        at: new Date() // TODO: 날짜가 처리되는 부분, 일단 데이트로 처리되기는 한다. 
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
    comments: ({id: post_id}, _, {loaders}) => {
      const {commentsLoader} = loaders;
      return commentsLoader.load(post_id);
    }
  }
};