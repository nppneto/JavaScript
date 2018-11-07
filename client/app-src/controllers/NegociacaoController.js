import { Negociacoes, NegociacaoService, Negociacao } from "../domain/index.js";
import {
  NegociacoesView,
  MensagemView,
  Mensagem,
  DateConverter
} from "../UI/index.js";
import { getNegociacaoDAO, Bind, getExceptionMessage, debounce, controller } from "../util/index.js";

@controller('#data', '#quantidade', '#valor')
// exporta a classe NegociacaoController para quem precisar importar
export class NegociacaoController {
  constructor(_inputData, _inputQuantidade, _inputValor) {

    Object.assign(this, {_inputData, _inputQuantidade, _inputValor});
    // Através de Bind , passamos a instância do modelo, a instância
    // da View e as propriedades ou métodos que desejamos ativar a
    // atualização automática.
    this._negociacoes = new Bind(
      new Negociacoes(),
      new NegociacoesView("#negociacoes"),
      // Não passamos mais os parâmetros de armadilha
      // Dentro de um array
      "adiciona",
      "esvazia"
    );

    this._negociacoesView = new NegociacoesView("#negociacoes");

    // Recebe inicialmente o modelo que encapsula uma lista vazia
    // Chamando o Update
    this._negociacoesView.update(this._negociacoes);

    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView("#mensagemView"),
      // Não passamos mais os parâmetros de armadilha
      // Dentro de um array
      "texto"
    );
    // Instância da View de mensagens
    this._mensagemView = new MensagemView("#mensagemView");
    // Chamando o Update
    this._mensagemView.update(this._mensagem);

    this._service = new NegociacaoService();

    this._init();
  }

  async _init() {
    try {
      const dao = await getNegociacaoDAO();
      const negociacoes = await dao.listaTodos();
      negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao));
    } catch (err) {
      // err.message extrai apenas a mensagem de erro da exceção

      this._mensagem.texto = getExceptionMessage(err);
    }
    // getNegociacaoDAO()
    // .then(dao => dao.listaTodos())
    // .then(negociacoes =>
    //     negociacoes.forEach(negociacao =>
    //         this._negociacoes.adiciona(negociacao)))
    // .catch(err => this._mensagem.texto = err);
  }

  async adiciona(event) {
    // Cancela a submissão do formulário

    try {
      event.preventDefault();
      const negociacao = this._criaNegociacao();

      const dao = await getNegociacaoDAO();
      await dao.adiciona(negociacao);
      this._negociacoes.adiciona(negociacao);
      this._mensagem.texto = "Negociação adicionada com sucesso!";

      this._limpaFormulario();
    } catch (err) {
      this._mensagem.texto = getExceptionMessage(err);
    }
  }

  @debounce(1500)
  async importaNegociacoes() {
    try {
      const negociacoes = await this._service.obterNegociacoesDoPeriodo();
      console.log(negociacoes);
      negociacoes
        .filter(
          novaNegociacao =>
            !this._negociacoes
              .paraArray()
              .some(negociacaoExistente =>
                novaNegociacao.equals(negociacaoExistente)
              )
        )
        .forEach(negociacao => this._negociacoes.adiciona(negociacao));
      this._mensagem.texto = "Negociações do período importadas com sucesso!";
    } catch (err) {
      this._mensagem.texto = getExceptionMessage(err);
    }
  }

  _limpaFormulario() {
    this._inputData.value = "";
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;
    this._inputData.focus();
  }

  _criaNegociacao() {
    return new Negociacao(
      DateConverter.paraData(this._inputData.value),
      parseInt(this._inputQuantidade.value),
      parseFloat(this._inputValor.value)
    );
  }

  async apaga() {
    try {
      const dao = await getNegociacaoDAO();
      await dao.apagaTodos();
      this._negociacoes.esvazia();
      this._mensagem.texto = "Negociações apagadas com sucesso!";
    } catch (err) {
      this._mensagem.texto = getExceptionMessage(err);
    }
  }
}
