const router = require('express').Router();

const { getAll, postOne } = require('../../controllers/products');

router.get('/', getAll);
router.post('/', postOne);

// Eeach route define its path
module.exports = {
  pathname: '/products',
  router,
};
