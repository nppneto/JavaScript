export function debounce(fn, milisegundos) {

    let timer = 0;

    return () => {

        // Para o último timer definido
        clearTimeout(timer);

        // A variável timer ganha o ID de um novo temporizador
        // Afeta a variável no escopo da função Debounce
        timer = setTimeout(() => fn(), milisegundos);
    }
}