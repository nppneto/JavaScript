export function debounce(milisegundos = 500) {

    return function (target, key, descriptor) {

        const metodoOriginal = descriptor.value;

        let timer = 0;
        descriptor.value = function(...args) {
            
            if(event) event.preventDefault();
            
            clearTimeout(timer);
            // aqui entra a implementação do nosso método
            // que substituirá o original
            time = setTimeout(() => metodoOriginal.apply(this, args), milisegundos);
        }
        return descriptor;
    }
}