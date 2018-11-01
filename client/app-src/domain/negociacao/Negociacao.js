export class Negociacao {
  constructor(_data, _quantidade, _valor) {
    Object.assign(this, { _quantidade, _valor });
    this._data = new Date(_data.getTime());
    // this._data = new Date(data.getTime());
    // this._quantidade = quantidade;
    // this._valor = valor;
    Object.freeze(this);
  }

  get volume() {
    return this._quantidade * this._valor;
  }

  get data() {
    // Programação defensiva
    return new Date(this._data.getTime());
  }

  get quantidade() {
    return this._quantidade;
  }

  get valor() {
    return this._valor;
  }

  // equals(negociacao) {
  //   return (
  //     this.data.getDate() == negociacao.data.getDate() &&
  //     this.data.getMonth() == negociacao.data.getMonth() &&
  //     this.data.getFullYear() == negociacao.data.getFullYear() &&
  //     this.quantidade == negociacao.quantidade &&
  //     this.valor == negociacao.valor
  //   );
  // }

  equals(negociacao) {
    // JSON.stringify converte um objeto em string.
    // Sendo assim, podemos usar o operador == para comparação.
    // Esta solução só funciona ser houver a comparação de todas
    // As propriedades do objeto
    return JSON.stringify(this) == JSON.stringify(negociacao);
  }
}
