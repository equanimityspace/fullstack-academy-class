const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const PORT = process.env.PORT || 3000;
require("dotenv").config();
app.use(express.json());
const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgress://localhost/acme_icecream_shop"
);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// app.get("/", (req, res, next) => {
//   try {
//     res.send("This is working");
//   } catch (error) {
//     next(error);
//   }
// });

app.get("/api/flavors", async (req, res, next) => {
  try {
    const SQL = `
            SELECT * FROM flavors
        `;
    const response = await client.query(SQL);
    res.status(200).send(response.rows);
  } catch (error) {
    next(error);
  }
});

app.get("/api/flavors/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const SQL = `
            SELECT * FROM flavors WHERE id = $1
        `;
    const response = await client.query(SQL, [id]);
    res.status(200).send(response.rows);
  } catch (error) {
    next(error);
  }
});

app.post("/api/flavors", async (req, res, next) => {
  try {
    const { name, is_favorite } = req.body;
    const SQL = `
            INSERT INTO flavors (name, is_favorite) VALUES ($1, $2) RETURNING *
        `;
    const response = await client.query(SQL, [name, is_favorite]);
    res.status(201).json(response.rows);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/flavors/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const SQL = `
            DELETE FROM flavors WHERE id = $1
        `;
    await client.query(SQL, [id]);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

app.put("/api/flavors/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const SQL = `
            UPDATE flavors SET name = $2 WHERE id = $1 RETURNING *;
        `;
    const response = await client.query(SQL, [id, name]);
    res.status(200).json(response.rows);
  } catch (error) {
    next(error);
  }
});

const init = async () => {
  try {
    await client.connect();
  } catch (error) {
    console.error(error);
  }
};

init();
