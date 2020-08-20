module.exports = function error(err, request, response, next) {
  return response.status(500).send({ Mensagem: err.message });
};
