const dotenv = require('dotenv');

dotenv.config();

const appConfig = {
    serverPort:  process.env.SERVER_PORT || 3000,
};

console.log(process.env);

module.exports = appConfig;
