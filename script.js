/**
 * =====================================================================
 * MOTOR DE EFECTO MECANOGRAFIADO (TYPEWRITER EFFECT)
 * =====================================================================
 */
const stringsToType = [
    "Desarrollador Full-stack",
    "Estudiante de Informática en la UNERMB",
    "Desde Cabimas, Venezuela"
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

/**
 * =====================================================================
 * ACTUALIZACIÓN: INTERACTIVIDAD DE IMAGEN (CLIC Y BRILLO)
 * =====================================================================
 */
document.addEventListener("DOMContentLoaded", () => {
    // Iniciar efecto de texto
    if (typewriterElement && stringsToType.length > 0) {
        setTimeout(handleTypewriterCycle, 500);
    }

    // Lógica para la imagen de perfil
    const profileImg = document.querySelector('.profile-image');

    if (profileImg) {
        // Efecto de pulso al hacer clic
        profileImg.addEventListener('mousedown', () => {
            profileImg.style.transform = 'translateX(-40%) scale(0.98)';
            profileImg.style.transition = 'all 0.1s ease';
        });

        profileImg.addEventListener('mouseup', () => {
            profileImg.style.transform = 'translateX(-40%) scale(1)';
        });

        // Cambiar color del brillo dinámicamente
        profileImg.addEventListener('mouseenter', () => {
            const colors = ['#b5ff00', '#00ffcc', '#ff00ff', '#ffcc00'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            profileImg.style.setProperty('--dynamic-accent', randomColor);
        });

        profileImg.addEventListener('mouseleave', () => {
            profileImg.style.setProperty('--dynamic-accent', '#b5ff00');
        });
    }
});