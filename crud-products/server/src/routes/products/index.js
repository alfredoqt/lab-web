const router = require('express').Router();

const {
  getAll,
  postOne,
  getOne,
  putOne,
} = require('../../controllers/products');

router.get('/', getAll);
router.post('/', postOne);
router.get('/:id', getOne);
router.put('/:id', putOne);

// Eeach route define its path
module.exports = {
  pathname: '/products',
  router,
};
