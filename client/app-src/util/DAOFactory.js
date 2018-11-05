import { ConnectionFactory } from './ConnectionFactory.js';
import { NegociacaoDAO } from '../domain/negociacao/NegociacaoDAO.js';

export async function getNegociacaoDAO() {
  let conn = await ConnectionFactory.getConnection();
  return new NegociacaoDAO(conn);
}
