require("dotenv").config();
const { client } = require("./common");
const express = require("express");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

const {
  createCustomer,
  createRestaurant,
  fetchCustomers,
  fetchRestaurants,
  createReservation,
  destroyReservation,
} = require("./db");

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// add new customer
app.post("/api/customers", async (req, res, next) => {
  try {
    const { name } = req.body;
    const response = await createCustomer(name);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

// add new restaurant
app.post("/api/restaurants", async (req, res, next) => {
  try {
    const { name } = req.body;
    const response = await createRestaurant(name);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

// get all customers
app.get("/api/customers", async (req, res, next) => {
  try {
    const response = await fetchCustomers();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// get all restaurants
app.get("/api/restaurants", async (req, res, next) => {
  try {
    const response = await fetchRestaurants();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// create reservation
app.post("/api/reservations", async (req, res, next) => {
  try {
    const { party_count, customer_name, restaurant_name } = req.body;
    const response = await createReservation(
      party_count,
      customer_name,
      restaurant_name
    );
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

// delete reservation
app.delete("/api/reservations/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await destroyReservation(id);
    res.sendStatus(204);
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
