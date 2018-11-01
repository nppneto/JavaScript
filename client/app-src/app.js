import { NegociacaoController } from './controllers/NegociacaoController.js';

const controller = new NegociacaoController();
const $ = document.querySelector.bind(document);

// Associa o evento de submissão do formulário à chamada do método "adiciona"
$(".form").addEventListener("submit", controller.adiciona.bind(controller));
$("#botao-apaga").addEventListener("click", controller.apaga.bind(controller));
$("#botao-importa").addEventListener(
  "click",
  controller.importaNegociacoes.bind(controller)
);
