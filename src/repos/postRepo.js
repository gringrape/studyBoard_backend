import { query, queryOne } from './base';

const findById = (id) => {
  const sql = `
  SELECT count(*)
  FROM posts
  WHERE id = $1;
  `
  return queryOne(sql, [id]);
}

const getPosts = (number) => {
  const sql = `
  SELECT *
  FROM posts
  ORDER BY id
  LIMIT $1;
  `;
  return query(sql, [number]);
};

const getPostById = (id) => {
  const sql = `
  SELECT *
  FROM posts
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

export const postRepo = {
  getPosts, 
  getPostById, 
  insertPost, 
  deletePostById,
  updatePost,
  findById 
};