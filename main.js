let escritura__input = "Holao MundoLatinooooo!";
console.log(escritura__input);
// Lista de letras que se modifican
let letras = ["a", "e", "i", "o", "u"];
// Lista de las claves de encriptación
let claves = ["enter", "imes", "ai", "ober", "ufat"];
// Función para encriptar el texto
function encriptar(texto) {
    let resultado = "";
    for (let i = 0; i < texto.length; i++) {
        let caracter = texto[i];
        if (letras.includes(caracter)) {
            // Si el caracter es una vocal
            caracter = claves[letras.indexOf(caracter)];
        }
        resultado += caracter;
    }
    return resultado;
}
console.log(encriptar(escritura__input));

// Función para desencriptar el texto
function desencriptar(texto) {
    let resultado = "";
    let lista_palabras = texto.split(" ");
    let palabra = "";
    let indice_clave = []; // indice de la clave en la palabra inicio, fin
    // Recorrer la lista de palabras
    for (let i = 0; i < lista_palabras.length; i++) {
        palabra = lista_palabras[i];
        // Evaluar si la palabra contiene una clave
        for (let j = 0; j < claves.length; j++) {
            indice_clave[0] = palabra.indexOf(claves[j]);
            // Evaluar si la palabra contiene una clave 0 o más veces
            while (indice_clave[0] !== -1) {
                indice_clave[1] = indice_clave[0] + claves[j].length;
                palabra =
                    palabra.substring(0, indice_clave[0]) +
                    letras[j] +
                    palabra.substring(indice_clave[1]);
                indice_clave[0] = palabra.indexOf(claves[j]);
            }
        }
        resultado += palabra + " ";
    }
    // Eliminar el último espacio
    resultado = resultado.substring(0, resultado.length - 1);

    return resultado;
}
console.log(desencriptar(encriptar(escritura__input)));
