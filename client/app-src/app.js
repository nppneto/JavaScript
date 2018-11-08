import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '../css/meucss.css';

import { NegociacaoController } from "./controllers/NegociacaoController.js";
// import { debounce } from "./util/Debounce.js";
import { Negociacao } from "./domain/index.js";

const controller = new NegociacaoController();
// const $ = document.querySelector.bind(document);

const negociacao = new Negociacao(new Date(), 1, 200);
const headers = new Headers();
headers.set('Content-Type', 'application/json');

const body = JSON.stringify(negociacao);
const method = 'POST';

const config = {
  method,
  headers,
  body
};

fetch('http://localhost:3000/negociacoes', config)
  .then(() => console.log('Dado enviado com sucesso!'));

// Associa o evento de submissão do formulário à chamada do método "adiciona"
// $(".form").addEventListener("submit", controller.adiciona.bind(controller));
// $("#botao-apaga").addEventListener("click", controller.apaga.bind(controller));
// // $("#botao-importa").addEventListener(
// //   "click",
// //   debounce(() => controller.importaNegociacoes.bind(controller), 1000)
// // );
// $("#botao-importa").addEventListener(
//   "click", controller.importaNegociacoes().bind(controller));
