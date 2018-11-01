const ConnectionFactory = (() => {

    const stores = ['negociacoes'];

    let connection = null;

    let close = null;

    export class ConnectionFactory {

        constructor() {

            throw new Error('Não é possível criar instâncias da classe.');
        }

        static getConnection() {

            return new Promise((resolve, reject) => {

                // se a conexão já foi criada, passa para resolve e conecta
                if(connection) return resolve(connection);

                const openRequest = indexedDB.open('jscangaceiro', 2);

                openRequest.onupgradeneeded = e => {

                    ConnectionFactory._createStores(e.target.result);

                };

                openRequest.onsuccess = e => {
                    // só será executado na primeira vez em que a conexão for criada
                    connection = e.target.result;

                    // guardando função original
                    close = connection.close.bind(connection);
                    // lançando a mensagem de erro caso o programador tente finalizar a conexão diretamente
                    connection.close = () => {
                        throw new Error('Você não pode fechar diretamente a conexão.');
                    };
                    // passa o resultado (conexão) para a Promise
                    resolve(connection);
                };

                openRequest.onerror = e => {
                    console.log(e.target.result);
                    // passa o erro para o reject da Promise
                    reject(e.target.error.name);
                };
            });
        }

        static _createStores(connection) {
            
            stores.forEach(store => {

                if(connection.objectStoreNames.contains(store))
                    connection.deleteObjectStore(store);

                connection.createObjectStore(store, { autoIncrement: true });
            });
        }

        static closeConnection() {

            // se houver conexão...
            if(connection)
                // chamando close original
                close();
        }

    }

})();