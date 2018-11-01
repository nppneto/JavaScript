System.register(['./ConnectionFactory.js', '../domain/negociacao/NegociacaoDAO.js'], function (_export, _context) {
  "use strict";

  var ConnectionFactory, NegociacaoDAO;
  function getNegociacaoDAO() {
    return ConnectionFactory.getConnection().then(conn => new NegociacaoDAO(conn));
  }

  _export('getNegociacaoDAO', getNegociacaoDAO);

  return {
    setters: [function (_ConnectionFactoryJs) {
      ConnectionFactory = _ConnectionFactoryJs.ConnectionFactory;
    }, function (_domainNegociacaoNegociacaoDAOJs) {
      NegociacaoDAO = _domainNegociacaoNegociacaoDAOJs.NegociacaoDAO;
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=DAOFactory.js.map