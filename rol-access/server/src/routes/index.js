const passport = require("passport");
const router = require("express").Router();
const homepageController = require("../controllers/HomepageController");
const authController = require("../controllers/AuthController");
const dashboardController = require("../controllers/AppDashboardController");
const authValidator = require("../validators/AuthValidators");
const {
  checkIfAdmin,
  checkIfLoggedUser,
} = require("../middleware/RoleAccessMiddleware");
checkIfLoggedUser;

router.get("/", homepageController.index);

// Authentication routes
router.get("/login", authController.login);
router.get("/register", authController.register);

router.post("/register", authValidator.store, authController.store);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login-fail",
    successRedirect: "/dashboard",
  })
);

router.get("/dashboard", checkIfLoggedUser, dashboardController.userDashboard);
router.get(
  "/users",
  checkIfLoggedUser,
  checkIfAdmin,
  dashboardController.adminDashboard
);

router.get("/login-fail", (req, res) => {
  res.send("El usuario no tiene una sesión válida");
});

module.exports = router;
