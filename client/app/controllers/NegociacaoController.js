class NegociacaoController {
  constructor() {
    const $ = document.querySelector.bind(document);

    this._inputQuantidade = $("#quantidade");
    this._inputData = $("#data");
    this._inputValor = $("#valor");

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
  }

  adiciona(event) {
    try {
      // Cancela a submissão do formulário
      event.preventDefault();
      this._negociacoes.adiciona(this._criaNegociacao());
      this._mensagem.texto = "Negociação adicionada com sucesso!";
      this._limpaFormulario();
      // this._limpaForm();
    } catch (err) {
      console.log(err);
      console.log(err.stack);

      if (err instanceof DataInvalidaException) {
        this._mensagem.texto = err.message;
      } else {
        // Mensagem genérica para qualquer problema que possa acontecer
        this._mensagem.texto =
          "Um erro inexperado aconteceu. Entre em contato com o suporte!";
      }
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

  apaga() {
    this._negociacoes.esvazia();
    this._mensagem.texto = "Negociações apagadas com sucesso!";
  }
}
