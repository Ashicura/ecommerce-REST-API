
require('dotenv').config();

const PORT = process.env.PORT;
const DB = {
  PGHOST: process.env.PGHOST,
  PGUSER: process.env.PGUSER,
  PGDATABASE: process.env.PGDATABASE,
  PGPASSWORD: process.env.PGPASSWORD,
  PGPORT: process.env.PGPORT
};
const SESSION_SECRET = process.env.SESSION_SECRET;

module.exports = {
  PORT,
  DB,
  SESSION_SECRET
};
