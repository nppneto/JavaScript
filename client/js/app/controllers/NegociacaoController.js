class NegociacaoController {


    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputQuantidade = $('#quantidade');
        this._inputData = $('#data');
        this._inputValor = $('#valor');
    }

    adiciona(event) {

        event.preventDefault();

        // Tirando este trecho deste bloco e colocando-o no construtor,
        // O programa só precisará buscar uma vez as tags no DOM
        //-----------------------------------------------------
        // let $ = document.querySelector.bind(document);
        // let inputQuantidade = $('#quantidade');
        // let inputData = $('#data');
        // let inputValor = $('#valor');

        //console.log(typeof(this._inputData.value));

        // 2016-11-12
        let data = new Date(...
            this._inputData.value
                .split('-')
                .map(function(item, indice) {
                    return item - indice % 2;
                })
            );

        console.log(data);

        // let negociacao = new Negociacao(
        //     this._inputQuantidade.value,
        //     this._inputData.value,
        //     this._inputValor.value
        // );

        // console.log(negociacao);

        // Adicionar a negociação em uma lista

    }

}