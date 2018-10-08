// Herdando da classe View
class MensagemView extends View {

    template(model) {
        // Se model for diferente de 0, undefined ou nulo,
        // O bootstrap irá adicionar a barra de mensagem
        // Após adicionar uma nova negociação
        return model.texto 
            ? `<p class="alert alert-info">${model.texto}</p>` 
            : `<p></p>`;
    }

}