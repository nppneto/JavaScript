class NegociacaoController {


    constructor() {

        const $ = document.querySelector.bind(document);

        this._inputQuantidade = $('#quantidade');
        this._inputData = $('#data');
        this._inputValor = $('#valor');

        // const self = this;

        // Resolvemos a questão do contexto com a Arrow Function
        // Pois o escopo do seu this é léxico, e não dinâmico
        this._negociacoes = new Negociacoes(model => {
            // console.log(this);
            // self._negociacoesView.update(model);
            this._negociacoesView.update(model);
        });

        this._negociacoesView = new NegociacoesView('#negociacoes');

        // Recebe inicialmente o modelo que encapsula uma lista vazia
        this._negociacoesView.update(this._negociacoes);

        this._mensagem = new Mensagem();
        // Instância da View de mensagens
        this._mensagemView = new MensagemView('#mensagemView');
        this._mensagemView.update(this._mensagem);
    }

    adiciona(event) {

        // Cancela a submissão do formulário
        event.preventDefault();
        this._negociacoes.adiciona(this._criaNegociacao());

        this._mensagem.texto = "Negociação adicionada com sucesso!";
        this._mensagemView.update(this._mensagem);
        this._limpaFormulario();

    }

    _limpaFormulario() {

        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

    _criaNegociacao() {
        return new Negociacao (
            DateConverter.paraData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }

    apaga() {
        this._negociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso!';
        this._mensagemView.update(this._mensagem);
    }

}