const router = require("express").Router();

const { getAll, postOne, putStatus } = require("../../controllers/orders");

router.get("/", getAll);
router.post("/", postOne);
router.put("/:id", putStatus);

// Eeach route define its path
module.exports = {
  pathname: "/orders",
  router,
};
