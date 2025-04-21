const { client } = require("./common");

createCustomer = async (name) => {
  const SQL = `
        INSERT INTO customers (name)
        VALUES ($1)
        RETURNING * 
    `;
  const response = await client.query(SQL, [name]);
  return response.rows;
};

createRestaurant = async (name) => {
  const SQL = `
          INSERT INTO restaurants (name) 
          VALUES ($1) 
          RETURNING * 
      `;
  const response = await client.query(SQL, [name]);
  return response.rows;
};

// get all customers
fetchCustomers = async () => {
  const SQL = `
        SELECT * FROM customers
        `;
  const response = await client.query(SQL);
  return response.rows;
};

// get all restaurants
fetchRestaurants = async () => {
  const SQL = `
          SELECT * FROM restaurants
          `;
  const response = await client.query(SQL);
  return response.rows;
};

// create reservation
createReservation = async (party_count, customer_name, restaurant_name) => {
  const SQL = `
        INSERT INTO reservations (party_count, customer_id, restaurant_id)
        VALUES ($1,
            (SELECT id FROM customers WHERE name = $2),
            (SELECT id FROM restaurants WHERE name = $3)
        )
        RETURNING *
    `;
  const response = await client.query(SQL, [
    party_count,
    customer_name,
    restaurant_name,
  ]);
  return response.rows;
};

// delete reservation
destroyReservation = async (id) => {
  const SQL = `
        DELETE FROM reservations WHERE id = $1
    `;
  await client.query(SQL, [id]);
};

module.exports = {
  createCustomer,
  createRestaurant,
  fetchCustomers,
  fetchRestaurants,
  createReservation,
  destroyReservation,
};
