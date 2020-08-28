function getAll(request, response) {
    response.send({ data: [{ id: 1 }] });
}

module.exports = {
    getAll,
};
