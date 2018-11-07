export class HttpService {
  
  _handleErros(res) {

    // se não estiver ok, lança a exceção
    if(!res.ok) throw new Error(res.statusText);

    // se nenhuma exceção foi lançada, retorna a própria resposta
    return res;
  }

  get(url) {

    return fetch(url)
        .then(res => this._handleErros(res))
        .then(res => res.json());
  }
  // get(url) {
  //   return new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.open("GET", url);
  //     xhr.onreadystatechange = () => {
  //       if (xhr.readyState === 4) {
  //         if (xhr.status === 200) {
  //           resolve(JSON.parse(xhr.responseText));
  //         } else {
  //           console.log(xhr.responseText);
  //           reject(xhr.responseText);
  //         }
  //       }
  //     };

  //     xhr.send();
  //   });
  // }
}
