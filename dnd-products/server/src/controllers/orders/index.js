const Order = require("../../models/Order");

async function getAll(request, response) {
  const orders = await Order.getAll();
  // await delay(5000);
  response.send({ data: orders });
}

async function postOne(request, response) {
  const { name } = request.body;

  // Should probably catch this
  const insert = await Order.insertOne(name);

  // Now get the inserted product and give it back to the user
  const inserted = await Order.getOne(insert[0]);

  response.send({ data: inserted });
}

async function putStatus(request, response) {
  const { id } = request.params;
  const { newStatus } = request.body;

  // Now get the inserted product and give it back to the user
  const changed_status_at = new Date().toISOString();
  const prev = await Order.getOne(id);
  const prevStatus = prev.currentStatus;
  await Order.updateOne(id, {
    current_status: newStatus,
    previous_status: prev,
    changed_status_at,
  });

  const updated = await Order.getOne(id);

  response.send({ data: updated });
}

module.exports = {
  getAll,
  postOne,
  putStatus,
};
