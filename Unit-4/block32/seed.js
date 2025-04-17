require("dotenv").config();
const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgress://localhost/acme_icecream_shop"
);

const init = async () => {
  try {
    await client.connect();
    const SQL = `
            DROP TABLE IF EXISTS flavors;
            CREATE TABLE flavors(
               id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
               name VARCHAR(50),
               is_favorite BOOLEAN DEFAULT FALSE,
               created_at time DEFAULT CURRENT_TIMESTAMP,
               updated_at time DEFAULT CURRENT_TIMESTAMP
            );
            INSERT INTO flavors(name) VALUES ('Vanilla');
            INSERT INTO flavors(name, is_favorite) VALUES ('Rocky Road', true);
            INSERT INTO flavors(name) VALUES ('Chocolate');
            INSERT INTO flavors(name) VALUES ('Cookie Dough');
        `;
    await client.query(SQL);
    await client.end();
    console.log("seeded successfully");
  } catch (error) {
    console.error(error);
  }
};

init();
