const express = require("express");
const app = express();
const path = require("path");
const pg = require("pg");
const PORT = process.env.PORT || 3000;

const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/acme_hr_db"
);

const init = async (req, res) => {
  try {
    await client.connect();
    const SQL = `
        DROP TABLE IF EXISTS users;
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50),
            is_admin BOOLEAN DEFAULT FALSE
        );
        INSERT INTO users(name, is_admin) VALUES ('Ryan', true);
        INSERT INTO users(name) VALUES ('Tor');
        INSERT INTO users(name) VALUES ('Nat');
    `;
    await client.query(SQL);
    await client.end();
    console.log("seeded database");
  } catch (error) {
    console.error(error);
  }
};

init();
