System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      class Negociacoes {
        constructor(armadilha) {
          this._negociacoes = [];
          // this._armadilha = armadilha;
          Object.freeze(this);
        }

        adiciona(negociacao) {
          this._negociacoes.push(negociacao);
          // this._armadilha(this);
        }

        paraArray() {
          // Não será possível apagar o array original com
          // this._negociacoes.paraArray().length = 0;
          // Pois o .lenght só conseguirá acessar a cópia do array
          // E não o original, tornando nosso código imutável
          return [].concat(this._negociacoes);
        }

        get volumeTotal() {
          return this._negociacoes.reduce((total, negociacao) => total + negociacao.volume, 0);
        }

        esvazia() {
          this._negociacoes.length = 0;
          // this._armadilha(this);
        }
      }

      _export("Negociacoes", Negociacoes);
    }
  };
});
//# sourceMappingURL=Negociacoes.js.map