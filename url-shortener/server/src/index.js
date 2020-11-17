const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const exphbs = require("express-handlebars");
const hbshelpers = require("handlebars-helpers");

const appConfig = require("./configs/app");
const routes = require("./routes");

const multihelpers = hbshelpers();
const extNameHbs = "hbs";
const hbs = exphbs.create({
  extname: extNameHbs,
  helpers: multihelpers,
});

const app = express();

app.engine(extNameHbs, hbs.engine);
app.set("view engine", extNameHbs);
app.set("views", path.join(__dirname, "./views"));
app.use(express.static("public"));

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Init routes
routes.forEach((route) => app.use(route.pathname, route.router));

app.listen(appConfig.serverPort, () => {
  console.log(`App listening at http://localhost:${appConfig.serverPort}`);
});
