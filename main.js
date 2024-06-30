// Lista de letras que se modifican
const letras = ["a", "e", "i", "o", "u"];
// Lista de las claves de encriptación
const claves = ["enter", "imes", "ai", "ober", "ufat"];

// Función para validación del texto permitido
function validarTexto(texto) {
    // [^...] Se hace negación/prohibición de los caracteres enmarcads
    // [^A-ZÁÉÍÓÚáéíóúÑñ] Conjunto de caracteres NO permitidos
    const regex = /^[^A-ZÀ-ÿ]*$/;
    return regex.test(texto);
  }

// Función para obtener el texto de entrada
function obtenerTexto() {
    let escritura__input = document.getElementById("texto_input").value;
    if (!validarTexto(escritura__input)){
        //Si el texto contiene caracteres prohibidos
        alert("Solo letras minúsculas y sin acentos")
        return "";
    }
        
    // console.log(escritura__input);
    return escritura__input;
}

// Función para setear el texto de salida
function mostrarResultado(texto) {
    let resultado_sin_texto = document.getElementById("resultado_sin_texto");
    let texto_output = document.getElementById("texto_output");
    let boton_copiar = document.getElementById("boton_copiar");
    if (texto === "") {
        // Quitar clase hidden de resultado_sin_texto
        resultado_sin_texto.classList.remove("hidden");
        texto_output.classList.add("hidden");
        boton_copiar.classList.add("hidden");
    } else {
        // Agregar clase hidden a resultado_sin_texto
        resultado_sin_texto.classList.add("hidden");
        texto_output.classList.remove("hidden");
        boton_copiar.classList.remove("hidden");
        texto_output.textContent = texto;
    }
    return;
}

// Función para encriptar el texto
function encriptar() {
    let texto = obtenerTexto();
    let resultado = "";
    for (let i = 0; i < texto.length; i++) {
        let caracter = texto[i];
        if (letras.includes(caracter)) {
            // Si el caracter es una vocal
            caracter = claves[letras.indexOf(caracter)];
        }
        resultado += caracter;
    }
    // Mostrar el resultado
    mostrarResultado(resultado);

    return;
}

// Función para desencriptar el texto
function desencriptar() {
    let texto = obtenerTexto();
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

    // Mostrar el resultado
    mostrarResultado(resultado);
    return;
}

// Función para copiar el texto de salida
function copiarTexto() {
    let boton_copiar = document.getElementById("boton_copiar");
    let texto_boton = document.getElementById("texto_boton_copiar");
    // Almacenar el texto de salida
    let texto_output = document.getElementById("texto_output").textContent;
    // Copiar el texto al portapapeles
    navigator.clipboard.writeText(texto_output);
    // Cambiar el texto del botón y el color
    texto_boton.textContent = "Copiado!";
    boton_copiar.classList.remove("boton_light");
    boton_copiar.classList.add("copiado");
    setTimeout(() => {
        texto_boton.textContent = "Copiar";
        boton_copiar.classList.remove("copiado");
        boton_copiar.classList.add("boton_light");
    }, 1000);

    return;
}
