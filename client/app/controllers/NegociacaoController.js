class NegociacaoController {


    constructor() {

        const $ = document.querySelector.bind(document);

        this._inputQuantidade = $('#quantidade');
        this._inputData = $('#data');
        this._inputValor = $('#valor');

        // Criação do Proxy
        this._negociacoes = ProxyFactory.create(
            new Negociacoes(),
            ['adiciona', 'esvazia'],
            model => this._negociacoesView.update(model)
        );

        this._negociacoesView = new NegociacoesView('#negociacoes');

        // Recebe inicialmente o modelo que encapsula uma lista vazia
        this._negociacoesView.update(this._negociacoes);

        this._mensagem = ProxyFactory.create(
            new Mensagem(),
            ['texto'],
            model => this._mensagemView.update(model)
        );
        // Instância da View de mensagens
        this._mensagemView = new MensagemView('#mensagemView');
        this._mensagemView.update(this._mensagem);
    }

    adiciona(event) {

        // Cancela a submissão do formulário
        event.preventDefault();
        this._negociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = "Negociação adicionada com sucesso!";

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
    }

}