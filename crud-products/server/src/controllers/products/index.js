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


  response.send('ok');
}

module.exports = {
    getAll,
    postOne,
};
