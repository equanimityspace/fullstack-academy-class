require("dotenv").config();
const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/reservations_db"
);

const init = async () => {
  try {
    await client.connect();

    const SQL = `
        DROP TABLE IF EXISTS customers CASCADE;
        DROP TABLE IF EXISTS restaurants CASCADE;
        DROP TABLE IF EXISTS reservations CASCADE;

        CREATE TABLE customers(
           id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
           name VARCHAR(100)
        );

        CREATE TABLE restaurants(
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR(100)
        );

        CREATE TABLE reservations(
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            date DATE DEFAULT CURRENT_DATE NOT NULL,
            party_count INTEGER NOT NULL,
            restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
            customer_id UUID REFERENCES customers(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
            UNIQUE(restaurant_id, customer_id)
        );

        INSERT INTO customers(name) VALUES('Ryan');
        INSERT INTO customers(name) VALUES('Cathy');
        INSERT INTO customers(name) VALUES('Christopher');

        INSERT INTO restaurants(name) VALUES('The Market');
        INSERT INTO restaurants(name) VALUES('Curry and Kebab');
        INSERT INTO restaurants(name) VALUES('Stonefish');

        INSERT INTO reservations(party_count, customer_id, restaurant_id) VALUES (
        (4),
        (SELECT id FROM customers WHERE name = 'Christopher'),
        (SELECT id FROM restaurants WHERE name = 'The Market'));
        
        INSERT INTO reservations(party_count, customer_id, restaurant_id) VALUES (
        (3),
        (SELECT id FROM customers WHERE name = 'Cathy'),
        (SELECT id FROM restaurants WHERE name = 'Stonefish'));
        
        INSERT INTO reservations(party_count, customer_id, restaurant_id) VALUES (
        (2),
        (SELECT id FROM customers WHERE name = 'Ryan'),
        (SELECT id FROM restaurants WHERE name = 'Curry and Kebab'));
        `;

    await client.query(SQL);
    await client.end();
    console.log("database seeded!");
  } catch (error) {
    console.error(error);
  }
};

init();
