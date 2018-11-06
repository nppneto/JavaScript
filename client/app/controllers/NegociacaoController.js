System.register(["../domain/index.js", "../UI/index.js", "../util/index.js"], function (_export, _context) {
  "use strict";

  var Negociacoes, NegociacaoService, Negociacao, NegociacoesView, MensagemView, Mensagem, DataInvalidaException, DateConverter, getNegociacaoDAO, Bind;

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

  return {
    setters: [function (_domainIndexJs) {
      Negociacoes = _domainIndexJs.Negociacoes;
      NegociacaoService = _domainIndexJs.NegociacaoService;
      Negociacao = _domainIndexJs.Negociacao;
    }, function (_UIIndexJs) {
      NegociacoesView = _UIIndexJs.NegociacoesView;
      MensagemView = _UIIndexJs.MensagemView;
      Mensagem = _UIIndexJs.Mensagem;
      DataInvalidaException = _UIIndexJs.DataInvalidaException;
      DateConverter = _UIIndexJs.DateConverter;
    }, function (_utilIndexJs) {
      getNegociacaoDAO = _utilIndexJs.getNegociacaoDAO;
      Bind = _utilIndexJs.Bind;
    }],
    execute: function () {

      // exporta a classe NegociacaoController para quem precisar importar
      class NegociacaoController {
        constructor() {
          const $ = document.querySelector.bind(document);

          this._inputQuantidade = $("#quantidade");
          this._inputData = $("#data");
          this._inputValor = $("#valor");

          // Através de Bind , passamos a instância do modelo, a instância
          // da View e as propriedades ou métodos que desejamos ativar a
          // atualização automática.
          this._negociacoes = new Bind(new Negociacoes(), new NegociacoesView("#negociacoes"),
          // Não passamos mais os parâmetros de armadilha
          // Dentro de um array
          "adiciona", "esvazia");

          this._negociacoesView = new NegociacoesView("#negociacoes");

          // Recebe inicialmente o modelo que encapsula uma lista vazia
          // Chamando o Update
          this._negociacoesView.update(this._negociacoes);

          this._mensagem = new Bind(new Mensagem(), new MensagemView("#mensagemView"),
          // Não passamos mais os parâmetros de armadilha
          // Dentro de um array
          "texto");
          // Instância da View de mensagens
          this._mensagemView = new MensagemView("#mensagemView");
          // Chamando o Update
          this._mensagemView.update(this._mensagem);

          this._service = new NegociacaoService();

          this._init();
        }

        _init() {
          var _this = this;

          return _asyncToGenerator(function* () {
            try {
              const dao = yield getNegociacaoDAO();
              const negociacoes = yield dao.listaTodos();
              negociacoes.forEach(function (negociacao) {
                return _this._negociacoes.adiciona(negociacao);
              });
            } catch (err) {
              // err.message extrai apenas a mensagem de erro da exceção

              _this._mensagem.texto = err.message;
            }
            // getNegociacaoDAO()
            // .then(dao => dao.listaTodos())
            // .then(negociacoes =>
            //     negociacoes.forEach(negociacao =>
            //         this._negociacoes.adiciona(negociacao)))
            // .catch(err => this._mensagem.texto = err);
          })();
        }

        adiciona(event) {
          var _this2 = this;

          return _asyncToGenerator(function* () {
            // Cancela a submissão do formulário

            try {
              event.preventDefault();
              const negociacao = _this2._criaNegociacao();

              const dao = yield getNegociacaoDAO();
              yield dao.adiciona(negociacao);
              _this2._negociacoes.adiciona(negociacao);
              _this2._mensagem.texto = "Negociação adicionada com sucesso!";

              _this2._limpaFormulario();
            } catch (err) {
              _this2._mensagem.texto = err.message;
            }
          })();
        }

        importaNegociacoes() {
          var _this3 = this;

          return _asyncToGenerator(function* () {
            try {
              const negociacoes = yield _this3._service.obterNegociacoesDoPeriodo();
              console.log(negociacoes);
              negociacoes.filter(function (novaNegociacao) {
                return !_this3._negociacoes.paraArray().some(function (negociacaoExistente) {
                  return novaNegociacao.equals(negociacaoExistente);
                });
              }).forEach(function (negociacao) {
                return _this3._negociacoes.adiciona(negociacao);
              });
              _this3._mensagem.texto = 'Negociações do período importadas com sucesso!';
            } catch (err) {
              _this3._mensagem.texto = err.message;
            }
          })();
        }

        _limpaFormulario() {
          this._inputData.value = "";
          this._inputQuantidade.value = 1;
          this._inputValor.value = 0.0;
          this._inputData.focus();
        }

        _criaNegociacao() {
          return new Negociacao(DateConverter.paraData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
        }

        apaga() {
          var _this4 = this;

          return _asyncToGenerator(function* () {
            try {
              const dao = yield getNegociacaoDAO();
              yield dao.apagaTodos();
              _this4._negociacoes.esvazia();
              _this4._mensagem.texto = "Negociações apagadas com sucesso!";
            } catch (err) {
              _this4._mensagem.texto = err.message;
            }
          })();
        }
      }

      _export("NegociacaoController", NegociacaoController);
    }
  };
});
//# sourceMappingURL=NegociacaoController.js.map