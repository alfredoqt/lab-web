function checkIfLoggedUser(req, res, next) {
  // If not defined, redirect to register
  if (!req.user) {
    return res.redirect("register");
  }
  next();
}

// Dependent of checkIfLoggedUser
function checkIfAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      error: {
        message: "Unauthorized",
      },
    });
  }
  next();
}

module.exports = {
  checkIfLoggedUser,
  checkIfAdmin,
};
