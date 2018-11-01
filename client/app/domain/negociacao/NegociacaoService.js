System.register(['../../util/HttpService.js', './Negociacao.js'], function (_export, _context) {
  "use strict";

  var HttpService, Negociacao;
  return {
    setters: [function (_utilHttpServiceJs) {
      HttpService = _utilHttpServiceJs.HttpService;
    }, function (_NegociacaoJs) {
      Negociacao = _NegociacaoJs.Negociacao;
    }],
    execute: function () {
      class NegociacaoService {
        constructor() {
          this._http = new HttpService();
        }

        obterNegociacoesDaSemana() {
          return this._http.get("negociacoes/semana").then(dados => dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)), err => {
            throw new Error("Não foi possível obter as negociações da semana");
          });
        }

        obterNegociacoesDaSemanaAnterior() {
          return this._http.get("negociacoes/anterior").then(dados => dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)), err => {
            throw new Error("Não foi possível obter as negociações da semana anterior");
          });
        }

        obterNegociacoesDaSemanaRetrasada() {
          return this._http.get("negociacoes/retrasada").then(dados => dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)), err => {
            throw new Error("Não foi possível obter as negociações da semana anterior");
          });
        }

        obterNegociacoesDoPeriodo() {
          return Promise.all([this.obterNegociacoesDaSemana(), this.obterNegociacoesDaSemanaAnterior(), this.obterNegociacoesDaSemanaRetrasada()]).then(periodo => periodo.reduce((novoArray, item) => novoArray.concat(item), [])
          // Ordenando o array de negociações por ordem decrescente de data
          // resultados: iguais = 0, primeiro maior que o segundo >= 1,
          // primeiro menor que o segundo <= -1.
          .sort((a, b) => b.data.getTime() - a.data.getTime())).catch(err => {
            console.log(err);
            throw new Error("Não foi possível obter as negociações do período.");
          });
        }
      }

      _export('NegociacaoService', NegociacaoService);
    }
  };
});
//# sourceMappingURL=NegociacaoService.js.map