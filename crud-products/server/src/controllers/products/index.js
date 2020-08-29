const Product = require('../../models/Product');

// Simulate a delay
function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  })
}

async function getAll(request, response) {
  const products = await Product.getAll();
  // await delay(5000);
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

  const got = await Product.getOne(id);

  response.send({data: got[0]});
}

async function putOne(request, response) {
  const { id } = request.params;
  const { name, description, price } = request.body;

  // Now get the inserted product and give it back to the user
  await Product.updateOne(
    id,
    Product.factory(name, description, price),
  );

  const updated = await Product.getOne(id);

  response.send({data: updated[0]});
}

async function deleteOne(request, response) {
  const { id } = request.params;

  await Product.deleteOne(id);

  response.send({data: {id: Number.parseInt(id, 10)}});
}

module.exports = {
    getAll,
    postOne,
    getOne,
    putOne,
    deleteOne,
};
