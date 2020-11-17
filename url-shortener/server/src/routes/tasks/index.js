const router = require("express").Router();

const { postOne } = require("../../controllers/urls");

router.post("/", postOne);

// Eeach route define its path
module.exports = {
  pathname: "/urls",
  router,
};
