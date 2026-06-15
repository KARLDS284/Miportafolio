/**
 * =====================================================================
 * MOTOR DE EFECTO MECANOGRAFIADO (TYPEWRITER EFFECT)
 * =====================================================================
 */
const stringsToType = [
    "Futuro Desarrollador Full-stack",
    "Estudiante de Informática en la UNERMB",
    "Nacido en Cabimas, Venezuela"
];

let currentStringIndex = 0;
let currentCharacterIndex = 0;
let isDeletingCharacter = false;

const DELAY_TYPING = 120;
const DELAY_ERASING = 50;
const DELAY_NEW_WORD = 2200;

const typewriterElement = document.getElementById("typewriter");

function handleTypewriterCycle() {
    const currentFullText = stringsToType[currentStringIndex];
    
    if (isDeletingCharacter) {
        typewriterElement.textContent = currentFullText.substring(0, currentCharacterIndex - 1);
        currentCharacterIndex--;
    } else {
        typewriterElement.textContent = currentFullText.substring(0, currentCharacterIndex + 1);
        currentCharacterIndex++;
    }

    let calculatedSpeed = isDeletingCharacter ? DELAY_ERASING : DELAY_TYPING;

    if (!isDeletingCharacter && currentCharacterIndex === currentFullText.length) {
        calculatedSpeed = DELAY_NEW_WORD;
        isDeletingCharacter = true;
    } else if (isDeletingCharacter && currentCharacterIndex === 0) {
        isDeletingCharacter = false;
        currentStringIndex = (currentStringIndex + 1) % stringsToType.length;
        calculatedSpeed = 400;
    }

    setTimeout(handleTypewriterCycle, calculatedSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
    // Iniciar efecto de texto
    if (typewriterElement && stringsToType.length > 0) {
        setTimeout(handleTypewriterCycle, 500);
    }
});