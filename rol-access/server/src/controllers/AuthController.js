const { validationResult } = require("express-validator");
const UserModel = require("../models/User");

exports.login = (req, res) => {
  res.render("auth/login", { layout: "auth" });
};

exports.register = (req, res) => {
  res.render("auth/register", {
    layout: "auth",
    errors: req.flash("errors"),
  });
};

exports.store = (req, res) => {
  // Identifica si hubieron errores en el request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Si los hubieron entonces regresa a la petición anterior
    req.flash("errors", errors.array());
    return res.redirect("back");
  }
  UserModel.create(req.body)
    .then((data) => {
      return data[0];
    })
    .then((id) => {
      return UserModel.findById(id);
    })
    .then((user) => {
      // Login user in passport and direct it to dashboard
      // A better experience IMHO
      console.log(user);
      req.login(user, function (err) {
        if (err) {
          console.log(err);
        }
        return res.redirect("/protected");
      });
      //   res.send("s");
    })
    .catch((error) => {
      console.log(error);
    });
  // res.send('Registrar usuario');
};
