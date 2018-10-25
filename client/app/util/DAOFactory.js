function getNegociacaoDAO() {
  return ConnectionFactory.getConnection().then(
    conn => new NegociacaoDAO(conn)
  );
}
