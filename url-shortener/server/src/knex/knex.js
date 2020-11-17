const appConfig = require('../configs/app');
const config = require('../knexfile.js')[appConfig.env];

module.exports = require('knex')(config);
