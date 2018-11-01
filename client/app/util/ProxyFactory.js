System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      class ProxyFactory {
        static create(objeto, props, armadilha) {
          // Recebe o objeto como parâmetro
          return new Proxy(objeto, {
            get(target, prop, receiver) {
              // Usa o array props para realizar o includes
              // Utilizando o método estático _ehFuncao
              if (ProxyFactory._ehFuncao(target[prop]) && props.includes(prop)) {
                return function () {
                  console.log(`"${prop}" disparou uma armadilha!`);
                  target[prop].apply(target, arguments);
                  // Executa a armadilha que recebe
                  // O objeto original
                  armadilha(target);
                };
              } else {
                return target[prop];
              }
            },

            set(target, prop, value, receiver) {
              const updated = Reflect.set(target, prop, value);

              // Se fizer parte da lista, executamos a armadilha
              if (props.includes(prop)) armadilha(target);

              return updated;
            }
          });
        }

        // Novo método estático
        static _ehFuncao(fn) {
          return typeof fn == typeof Function;
        }
      }

      _export("ProxyFactory", ProxyFactory);
    }
  };
});
//# sourceMappingURL=ProxyFactory.js.map