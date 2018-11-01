System.register(['./View.js'], function (_export, _context) {
    "use strict";

    var View;
    return {
        setters: [function (_ViewJs) {
            View = _ViewJs.View;
        }],
        execute: function () {

            // Herdando da classe View
            class MensagemView extends View {

                template(model) {
                    // Se model for diferente de 0, undefined ou nulo,
                    // O bootstrap irá adicionar a barra de mensagem
                    // Após adicionar uma nova negociação
                    return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : `<p></p>`;
                }

            }

            _export('MensagemView', MensagemView);
        }
    };
});
//# sourceMappingURL=MensagemView.js.map