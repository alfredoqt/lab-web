const UserModel = require("../models/User");

function userDashboard(req, res) {
  const user = req.user;
  res.render("dashboard/index", {
    user: user,
    isAdmin: req.user.role === "admin",
  });
}

function adminDashboard(req, res) {
  const user = req.user;
  UserModel.getAll().then((users) => {
    res.render("dashboard/admin", {
      user: user,
      all: users,
    });
  });
}

module.exports = {
  userDashboard,
  adminDashboard,
};
