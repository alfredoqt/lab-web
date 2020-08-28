const Product = require('../../models/Product');

function getAll(request, response) {
    response.send({ data: [{ id: 1 }] });
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

module.exports = {
    getAll,
    postOne,
};
