const { prisma } = require("../common");

const router = require("express").Router();
const db = require("../db");
const jwt = require("jsonwebtoken");

// use prisma to register instructor
router.post("/register", async (req, res, next) => {
  const response = await prisma.user.create({
    data: {
      username: req.body.username,
      password: req.body.password,
    },
  });
  return res.status(202).send(response);
});

// use prisma to log into account
router.post("/login", async (req, res, next) => {
  try {
    const response = await prisma.user.findFirst({
      where: {
        username: req.body.username,
        password: req.body.password,
      },
    });
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

// use prisma to get current logged in instructor
router.get("/me", async (req, res, next) => {
  try {
    const response = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
    });
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
