import { obrigatorio } from "../../util";

export class Negociacao {
  constructor(_data = obrigatorio('data'), 
        _quantidade = obrigatorio('quantidade'), 
        _valor = obrigatorio('valor')) {

    // if(!_data) {
    //   throw new Error('data é um parâmetro obrigatório');
    // }

    // if(!_quantidade) {
    //   throw new Error('quantidade é um parâmetro obrigatório');
    // }

    // if(!_valor) {
    //   throw new Error('valor é um parâmetro obrigatório');
    // }

    Object.assign(this, { _quantidade, _valor });
    this._data = new Date(_data.getTime());
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
