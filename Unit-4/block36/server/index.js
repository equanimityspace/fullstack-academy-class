const { client } = require("./common");

require("dotenv").config();
const {
  createTables,
  createUser,
  createProduct,
  createFavorite,
  fetchUsers,
  fetchProducts,
  fetchFavorites,
  destroyFavorite,
  authenticate,
  findUserWithToken,
} = require("./db");

const JWT_SECRET = process.env.JWT_SECRET || "1234";
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
app.use(express.json());

//for deployment only
const path = require("path");
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../client/dist/index.html"))
);
app.use(
  "/assets",
  express.static(path.join(__dirname, "../client/dist/assets"))
);

// create jwt
const setToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "8h" });
};

// check if logged in
const isLoggedIn = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  const token = authHeader?.slice(7);
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    req.userId = id;
    next();
  } catch (error) {
    next(error);
  }
};

// register
app.post("/register", async (req, res, next) => {
  try {
    const response = await createUser(req.body);
    const token = setToken(response.id);
    res.status(200).json(token);
  } catch (error) {
    next(error);
  }
});

app.post("/api/auth/login", async (req, res, next) => {
  try {
    const response = await authenticate(req.body);
    const token = setToken(response.id);
    // console.log(token);
    res.send({ token });
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/auth/me", async (req, res, next) => {
  const { id } = jwt.verify(req.headers.authorization, JWT_SECRET);
  try {
    res.send(await findUserWithToken(id));
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/users", async (req, res, next) => {
  try {
    res.send(await fetchUsers());
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/users/:id/favorites", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await fetchFavorites(req.params.id));
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/users/:id/favorites", isLoggedIn, async (req, res, next) => {
  try {
    res.status(201).send(
      await createFavorite({
        user_id: req.params.id,
        product_id: req.body.product_id,
      })
    );
  } catch (ex) {
    next(ex);
  }
});

app.delete(
  "/api/users/:user_id/favorites/:id",
  isLoggedIn,
  async (req, res, next) => {
    try {
      await destroyFavorite({ user_id: req.params.user_id, id: req.params.id });
      res.sendStatus(204);
    } catch (ex) {
      next(ex);
    }
  }
);

app.get("/api/products", async (req, res, next) => {
  try {
    res.send(await fetchProducts());
  } catch (ex) {
    next(ex);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res
    .status(err.status || 500)
    .send({ error: err.message ? err.message : err });
});

const init = async () => {
  const port = process.env.PORT || 3000;
  await client.connect();
  console.log("connected to database");

  await createTables();
  console.log("tables created");

  const [moe, lucy, ethyl, curly, foo, bar, bazz, quq, fip] = await Promise.all(
    [
      createUser({ username: "moe", password: "m_pw" }),
      createUser({ username: "lucy", password: "l_pw" }),
      createUser({ username: "ethyl", password: "e_pw" }),
      createUser({ username: "curly", password: "c_pw" }),
      createProduct({ name: "foo" }),
      createProduct({ name: "bar" }),
      createProduct({ name: "bazz" }),
      createProduct({ name: "quq" }),
      createProduct({ name: "fip" }),
    ]
  );

  console.log(await fetchUsers());
  console.log(await fetchProducts());

  console.log(await fetchFavorites(moe.id));
  const favorite = await createFavorite({
    user_id: moe.id,
    product_id: foo.id,
  });
  app.listen(port, () => console.log(`listening on port ${port}`));
};

init();
