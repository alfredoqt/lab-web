const dotenv = require('dotenv');

dotenv.config();

const appConfig = {
    serverPort:  process.env.SERVER_PORT || 4001,
};

module.exports = appConfig;
