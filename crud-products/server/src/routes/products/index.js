const router = require('express').Router();

const { getAll } = require('../../controllers/products');

router.get('/', getAll);

// Eeach route define its path
module.exports = {
  pathname: '/products',
  router,
};
