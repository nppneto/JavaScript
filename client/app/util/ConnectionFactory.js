const stores = ['negociacoes'];

class ConnectionFactory {

    constructor() {

        throw new Error('Não é possível criar instâncias da classe.');
    }

    static getConnection() {

        return new Promise((resolve, reject) => {

            const openRequest = indexedDB.open('jscangaceiro', 2);

            openRequest.onupgradeneeded = e => {

                ConnectionFactory._createStores(e.target.result);

            };

            openRequest.onsuccess = e => {
                // passa o resultado (conexão) para a Promise
                resolve(e.target.result);
            };

            openRequest.onerror = e => {
                // passa o erro para o reject da Promise
                console.log(e.target.result);
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

}

