/**
 * =====================================================================
 * MOTOR DE EFECTO MECANOGRAFIADO (TYPEWRITER EFFECT)
 * =====================================================================
 */

// Aquí es donde defines exactamente qué quieres que escriba la máquina
const stringsToType = [
    "Desarrollador Full-stack",
    "Estudiante de Informática en la UNERMB",
    "Desde Cabimas, Venezuela"
];

let currentStringIndex = 0;
let currentCharacterIndex = 0;
let isDeletingCharacter = false;

// Velocidades de la animación (en milisegundos)
const DELAY_TYPING = 120;    // Velocidad al escribir
const DELAY_ERASING = 50;    // Velocidad al borrar
const DELAY_NEW_WORD = 2200; // Tiempo de pausa cuando termina de escribir una frase

const typewriterElement = document.getElementById("typewriter");

function handleTypewriterCycle() {
    const currentFullText = stringsToType[currentStringIndex];
    
    // Lógica para borrar o escribir letras
    if (isDeletingCharacter) {
        typewriterElement.textContent = currentFullText.substring(0, currentCharacterIndex - 1);
        currentCharacterIndex--;
    } else {
        typewriterElement.textContent = currentFullText.substring(0, currentCharacterIndex + 1);
        currentCharacterIndex++;
    }

    // Determinar la velocidad actual dependiendo de si está borrando o escribiendo
    let calculatedSpeed = isDeletingCharacter ? DELAY_ERASING : DELAY_TYPING;

    // Cambios de estado: Si terminó de escribir o si terminó de borrar
    if (!isDeletingCharacter && currentCharacterIndex === currentFullText.length) {
        // Terminó de escribir, hace una pausa antes de empezar a borrar
        calculatedSpeed = DELAY_NEW_WORD;
        isDeletingCharacter = true;
    } else if (isDeletingCharacter && currentCharacterIndex === 0) {
        // Terminó de borrar, pasa a la siguiente palabra
        isDeletingCharacter = false;
        currentStringIndex = (currentStringIndex + 1) % stringsToType.length;
        calculatedSpeed = 400; // Breve pausa antes de escribir la nueva palabra
    }

    // Ciclo infinito
    setTimeout(handleTypewriterCycle, calculatedSpeed);
}

// Iniciar el efecto una vez que la página carga
document.addEventListener("DOMContentLoaded", () => {
    if (stringsToType.length > 0) {
        setTimeout(handleTypewriterCycle, 500); // Retraso inicial de medio segundo
    }
});