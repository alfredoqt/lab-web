const dotenv = require('dotenv');

dotenv.config();

const appConfig = {
    serverPort:  process.env.SERVER_PORT || 3000,
    env: process.env.NODE_ENV || 'development',
};

module.exports = appConfig;
