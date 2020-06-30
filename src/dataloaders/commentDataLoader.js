import { commentRepo } from '../repos/commentRepo';
import { groupBy, map } from 'ramda';
import DataLoader from 'dataloader';
// 작업 순서
// 1. 쿼리 전송 함수를 생성한다.
// 2. 데이터 로더에 넣는다
// 3. 데이터 로더를 컨텍스트에 넣는다.
// 4. 컨텍스트에서 빼서 사용한다.

const commentsOfPosts = async (postIds) => {
  const comments = await commentRepo.getCommentsByPostIds(postIds); // 결과값 받기
  const groupedByPostId = groupBy(comment => comment.post_id, comments); // post_id 로 묶기
  return map(postId => groupedByPostId[postId] ,postIds);
};

export const commentsDataLoader = () => new DataLoader(commentsOfPosts);
