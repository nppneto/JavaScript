class DateConverter {

    constructor() {
        throw new Error('Esta classe não pode ser instanciada!');
    }

    static paraTexto(data) {

        // return data.getDate()
        // + '/' + (data.getMonth() + 1)
        // + '/' + data.getFullYear();

        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }

    static paraData(texto) {

        if(!/^\d{4}-\d{2}-\d{2}$/.test(texto))
            throw new Error('Deve estar no formato AAAA-mm-dd');
            
        return new Date(texto.split('-'));

    }

}