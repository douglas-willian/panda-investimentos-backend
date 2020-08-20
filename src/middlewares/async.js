/*
Request Handler para todas as requisições.
Evita repetição do bloco try catch pra cada rota
*/

module.exports = function asyncMiddleware(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (err) {
      next(err);
    }
  };
};
