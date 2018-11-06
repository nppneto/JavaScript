System.register(['./ConnectionFactory.js', '../domain/negociacao/NegociacaoDAO.js'], function (_export, _context) {
  "use strict";

  var ConnectionFactory, NegociacaoDAO;
  return {
    setters: [function (_ConnectionFactoryJs) {
      ConnectionFactory = _ConnectionFactoryJs.ConnectionFactory;
    }, function (_domainNegociacaoNegociacaoDAOJs) {
      NegociacaoDAO = _domainNegociacaoNegociacaoDAOJs.NegociacaoDAO;
    }],
    execute: function () {
      function _asyncToGenerator(fn) {
        return function () {
          var gen = fn.apply(this, arguments);
          return new Promise(function (resolve, reject) {
            function step(key, arg) {
              try {
                var info = gen[key](arg);
                var value = info.value;
              } catch (error) {
                reject(error);
                return;
              }

              if (info.done) {
                resolve(value);
              } else {
                return Promise.resolve(value).then(function (value) {
                  step("next", value);
                }, function (err) {
                  step("throw", err);
                });
              }
            }

            return step("next");
          });
        };
      }

      let getNegociacaoDAO = (() => {
        var _ref = _asyncToGenerator(function* () {
          let conn = yield ConnectionFactory.getConnection();
          return new NegociacaoDAO(conn);
        });

        return function getNegociacaoDAO() {
          return _ref.apply(this, arguments);
        };
      })();

      _export('getNegociacaoDAO', getNegociacaoDAO);
    }
  };
});
//# sourceMappingURL=DAOFactory.js.map