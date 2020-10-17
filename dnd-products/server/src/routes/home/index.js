const router = require("express").Router();

const { home } = require("../../controllers/home");

router.get("/", home);

// Eeach route define its path
module.exports = {
  pathname: "/",
  router,
};
