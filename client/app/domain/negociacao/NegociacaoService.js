class NegociacaoService {

  obterNegociacoesDaSemana() {
    return new Promise((resolve, reject) => {

      const xhr = new XMLHttpRequest()
      xhr.open('GET', 'negociacoes/semana')
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const negociacoes = JSON
              .parse(xhr.responseText)
              .map(
                objeto =>
                new Negociacao(
                  new Date(objeto.data),
                  objeto.quantidade,
                  objeto.valor));

            resolve(negociacoes);
          } else {

            reject('Não foi possível obter as negociaçoes da semana');
          }
        }
      }

      xhr.send();

    });
  }
}