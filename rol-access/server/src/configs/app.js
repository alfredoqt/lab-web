const dotenv = require("dotenv");

dotenv.config();

const appConfig = {
  serverPort: process.env.SERVER_PORT || 4001,
  env: process.env.NODE_ENV || "development",
  secret: process.env.APP_SECRET || "YOU_SHOULD_NOT_USE_THIS_SECRET",
};

module.exports = appConfig;
