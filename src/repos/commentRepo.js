import { query, queryOne } from './base';

const insertComment = ({title, writer, content, post_id}) => {
  const sql = `
  INSERT INTO comments(title, writer, content, post_id)
  VALUES($1, $2, $3, $4)
  RETURNING id;
  `;
  return queryOne(sql, [title, writer, content, post_id]);
};

export const postRepo = {
  insertComment
};