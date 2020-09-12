const passport = require("passport");
const router = require("express").Router();
const homepageController = require("../controllers/HomepageController");
const authController = require("../controllers/AuthController");
const authValidator = require("../validators/AuthValidators");

router.get("/", homepageController.index);

// Authentication routes
router.get("/login", authController.login);
router.get("/register", authController.register);

router.post("/register", authValidator.store, authController.store);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login-fail",
    successRedirect: "/protected",
  })
);
router.get("/protected", (req, res) => {
  res.send("Usuario logueado con éxito");
});
router.get("/login-fail", (req, res) => {
  res.send("El usuario no tiene una sesión válida");
});

module.exports = router;
