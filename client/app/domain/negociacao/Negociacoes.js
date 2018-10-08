class Negociacoes {

    constructor() {

        this._negociacoes = [];
    }

    adiciona(negociacao) {

        this._negociacoes.push(negociacao);

    }

    paraArray() {
        // Não será possível apagar o array original com 
        // this._negociacoes.paraArray().length = 0;
        // Pois o .lenght só conseguirá acessar a cópia do array
        // E não o original, tornando nosso código imutável
        return [].concat(this._negociacoes);
    }

    get volumeTotal() {

        return this._negociacoes
            .reduce((total, negociacao) => 
                total + negociacao.volume, 0);
    }

    esvazia() {

        this._negociacoes = [];
    }

}