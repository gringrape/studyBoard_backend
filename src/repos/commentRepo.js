import { query, queryOne } from './base';

const insertComment = ({writer, content, post_id, at}) => {
  const sql = `
  INSERT INTO comments(writer, content, post_id, at)
  VALUES($1, $2, $3, $4)
  RETURNING *;
  `;
  return queryOne(sql, [writer, content, post_id, at]);
};

const getCommentsByPostIds = (post_ids) => {
  const sql = `
  SELECT * 
  FROM comments
  WHERE post_id = any($1)
  `;
  return query(sql, [post_ids]);
};

const deleteCommentById = (id) => {
  const sql = `
  DELETE FROM comments
  WHERE id = $1
  RETURNING *
  `;
  return queryOne(sql, [id]);
}

const updateComment = ({id, content}) => {
  const sql = `
  UPDATE comments SET 
  content = COALESCE($2, content)
  WHERE id = $1
  RETURNING *
  `;
  return queryOne(sql, [id, content]);
}

export const commentRepo = {
  insertComment,
  getCommentsByPostIds,
  deleteCommentById,
  updateComment
};