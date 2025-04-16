const express = require("express");
const app = express();
const path = require("path");
const pg = require("pg");
const PORT = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors());
require("dotenv").config();

const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/acme_hr_db"
);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// app.get("/", (req, res) => {
//   res.send("Does this work");
// });

app.get("/api/notes", async (req, res, next) => {
  try {
    const SQL = `
            SELECT * from users
        `;
    const response = await client.query(SQL);
    res.status(200).send(response.rows);
  } catch (error) {
    next(error);
  }
});

const init = async (req, res) => {
  try {
    await client.connect();
  } catch (error) {
    console.error(error);
  }
};

init();
