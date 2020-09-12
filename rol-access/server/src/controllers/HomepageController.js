exports.index = (req, res) => {
  console.log(req.user);
  res.render("homepage/index");
};
