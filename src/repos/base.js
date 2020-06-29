require('dotenv').config();
const initOptions = {
  query(e) {
    console.log('BEGIN ---------------------------------');
    console.log(`QUERY: ${e.query}`);
    console.log('END -----------------------------------');
  }
}
const pgp = require('pg-promise')(initOptions);

const connection = {
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  max: 30
};

const db = pgp(connection);

const query = async (sql, params) => {
  try {
    return await db.any(sql, params);
  } catch(err) {
    console.log(err);
  }
}

const queryOne = async (sql, params) => {
  try {
    return await db.one(sql, params);
  } catch(err) {
    console.log(err);
  }
}

export { db, query, queryOne };