import { ConnectionFactory } from './ConnectionFactory.js';
import { NegociacaoDAO } from '../domain/negociacao/NegociacaoDAO.js';

export function getNegociacaoDAO() {
  return ConnectionFactory.getConnection().then(
    conn => new NegociacaoDAO(conn)
  );
}
