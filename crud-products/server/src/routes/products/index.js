const router = require('express').Router();

const { getAll, postOne, getOne } = require('../../controllers/products');

router.get('/', getAll);
router.post('/', postOne);
router.get('/:id', getOne);

// Eeach route define its path
module.exports = {
  pathname: '/products',
  router,
};
