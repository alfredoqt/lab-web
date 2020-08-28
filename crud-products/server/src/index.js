const express = require('express');
const bodyParser = require('body-parser');

const appConfig = require('./configs/app');
const routes =  require('./routes');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Init routes
routes.forEach(route => app.use(route.pathname, route.router));

app.listen(appConfig.serverPort, () => {
  console.log(`App listening at http://localhost:${appConfig.serverPort}`);
});
