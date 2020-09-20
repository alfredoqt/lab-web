const Task = require("../../models/Task");

// Simulate a delay
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function getAll(request, response) {
  const tasks = await Task.getAll();
  // await delay(5000);
  response.send({ data: tasks });
}

async function postOne(request, response) {
  const { description } = request.body;

  // Should probably catch this
  const insert = await Task.insertOne({ description });

  // Now get the inserted product and give it back to the user
  const inserted = await Task.getOne(insert[0]);

  response.send({ data: inserted });
}

async function getOne(request, response) {
  const { id } = request.params;

  const got = await Task.getOne(id);

  response.send({ data: got });
}

async function putOne(request, response) {
  const { id } = request.params;
  const { description, status } = request.body;

  // Now get the inserted product and give it back to the user
  await Task.updateOne(id, { description, status });

  const updated = await Task.getOne(id);

  response.send({ data: updated });
}

async function deleteOne(request, response) {
  const { id } = request.params;

  await Task.deleteOne(id);

  response.send({ data: { id: Number.parseInt(id, 10) } });
}

module.exports = {
  getAll,
  postOne,
  getOne,
  putOne,
  deleteOne,
};
