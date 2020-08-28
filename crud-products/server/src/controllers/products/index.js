const Product = require('../../models/Product');

async function getAll(request, response) {
  const products = await Product.getAll();
  response.send({ data: products });
}

async function postOne(request, response) {
  const { name, description, price } = request.body;

  // Should probably catch this
  const insert = await Product.insertOne(
    Product.factory(name, description, price),
  );

  // Now get the inserted product and give it back to the user
  const inserted = await Product.getOne(insert[0]);

  response.send({data: inserted[0]});
}

async function getOne(request, response) {
  const { id } = request.params;

  // Now get the inserted product and give it back to the user
  const inserted = await Product.getOne(id);

  response.send({data: inserted[0]});
}

module.exports = {
    getAll,
    postOne,
    getOne,
};
