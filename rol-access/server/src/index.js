const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const exphbs = require("express-handlebars");
const hbshelpers = require("handlebars-helpers");

const appConfig = require("./configs/app");
const router = require("./routes");

const sessionStore = new session.MemoryStore();
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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());
app.use(cookieParser());
app.use(
  session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: "true",
    secret: appConfig.secret,
  })
);
app.use(flash());

require("./configs/passport");
app.use(passport.initialize());
app.use(passport.session());

// Init routes
app.use(router);

app.listen(appConfig.serverPort, () => {
  console.log(`App listening at http://localhost:${appConfig.serverPort}`);
});
