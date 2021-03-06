import { query, queryOne } from './base';

const findById = (id) => {
  const sql = `
  SELECT count(*)
  FROM posts
  WHERE id = $1;
  `
  return queryOne(sql, [id]);
}

const getPosts = (offset, limit, tag, titleQuery) => {
  const sql = `
  SELECT *
  FROM posts
  ${tag ? `WHERE $3=ANY(tags)` : `WHERE 1=1`}
  AND
  ${titleQuery ? `title LIKE '%' || $4 || '%'`: `1=1`}
  ORDER BY at DESC
  OFFSET $1
  LIMIT $2;
  `;
  return query(sql, [offset, limit, tag, titleQuery]);
};

const getPostById = (id) => {
  const sql = `
  WITH tempView AS (
    SELECT *,
      lag(id, 1) OVER (ORDER BY at) prev_id,
      lag(title, 1) OVER (ORDER BY at) prev_title,
      lead(id, 1) OVER (ORDER BY at) next_id,
      lead(title, 1) OVER (ORDER BY at) next_title
    FROM posts
  )
  SELECT *
  FROM tempView
  WHERE id = $1;
  `;
  return queryOne(sql, [id]);
}

const insertPost = ({title, writer, content, tags, heartsCount, at}) => {
  const sql = `
  INSERT INTO posts(title, writer, content, tags, heartsCount, at)
  VALUES($1, $2, $3, $4, $5, $6)
  RETURNING id;
  `;
  return queryOne(sql, [title, writer, content, tags, heartsCount, at]);
}

const deletePostById = (id) => {
  const sql = `
  DELETE FROM posts
  WHERE id = $1
  RETURNING *
  `;
  return queryOne(sql, [id]);
}

const updatePost = ({id, title, content, tags, heartsCount}) => {
  const sql = `
  UPDATE posts SET 
  title = COALESCE($2, title),
  content = COALESCE($3, content),
  tags = COALESCE($4, tags),
  heartsCount = COALESCE($5, heartsCount)
  WHERE id = $1
  RETURNING *
  `;
  return queryOne(sql, [id, title, content, tags, heartsCount]);
}

const getAllTags = () => {
  const sql = `
  SELECT unnest(tags) 
  AS tag
  FROM posts
  `;
  return query(sql);
}

export const postRepo = {
  getPosts, 
  getPostById, 
  insertPost, 
  deletePostById,
  updatePost,
  findById,
  getAllTags
};