import { NegociacaoController } from "./controllers/NegociacaoController.js";
import { debounce } from "./util/Debounce.js";

const controller = new NegociacaoController();
const $ = document.querySelector.bind(document);

// Associa o evento de submissão do formulário à chamada do método "adiciona"
$(".form").addEventListener("submit", controller.adiciona.bind(controller));
$("#botao-apaga").addEventListener("click", controller.apaga.bind(controller));
// $("#botao-importa").addEventListener(
//   "click",
//   debounce(() => controller.importaNegociacoes.bind(controller), 1000)
// );
$("#botao-importa").addEventListener(
  "click",
  debounce(() => {
    console.log("EXECUTOU A OPERAÇÃO DEBOUNCE");
    controller.importaNegociacoes();
  }, 1000)
);
