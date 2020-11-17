const router = require("express").Router();

const { home } = require("../../controllers/home");
const { postOne, redirect } = require("../../controllers/urls");

router.get("/", home);
router.post("/urls", postOne);
// Overwrite all but urls
router.get("/:id", redirect);

// Eeach route define its path
module.exports = {
  pathname: "/",
  router,
};
