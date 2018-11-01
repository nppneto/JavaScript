export class Mensagem {
  // Se texto não for passado como parâmetro,
  // Por padrão, atruibuirá a string em branco
  constructor(texto = "") {
    this._texto = texto;
  }

  get texto() {
    return this._texto;
  }

  set texto(texto) {
    this._texto = texto;
  }
}
