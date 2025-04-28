require("dotenv").config();

const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/acme_auth_store_db"
);

module.exports = { client };
