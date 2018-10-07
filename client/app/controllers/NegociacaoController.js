class NegociacaoController {


    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputQuantidade = $('#quantidade');
        this._inputData = $('#data');
        this._inputValor = $('#valor');
    }

    adiciona(event) {

        // Cancela a submissão do formulário
        event.preventDefault();

        // console.log(typeof(this._inputData.value));

         //LIVRO PÁGINA 102

        // let converter = new DateConverter();

        let data = DateConverter.paraData(this._inputData.value);

        let negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );

        let diaMesAno = DateConverter.paraTexto(negociacao.data);

        console.log(negociacao.data);

        console.log(diaMesAno);

        // Tirando este trecho deste bloco e colocando-o no construtor,
        // O programa só precisará buscar uma vez as tags no DOM
        //-----------------------------------------------------
        // Realizando o bind(), querySelector mantém document como seu contexto this
        // let negociacao = new Negociacao(
        //     this._inputData.value,
        //     parseInt(this._inputQuantidade.value),
        //     parseFloat(this._inputValor.value)
        // );
        
        // console.log(negociacao);

        // 2016-11-12
        // let data = new Date(...
        //     this._inputData.value
        //         .split('-')
        //         .map((item, indice) => {
        //             return item - indice % 2;
        //         })
        //     );

        // console.log(data);

        // let negociacao = new Negociacao(
        //     this._inputQuantidade.value,
        //     this._inputData.value,
        //     this._inputValor.value
        // );

        // console.log(negociacao);

        // Adicionar a negociação em uma lista

    }

}