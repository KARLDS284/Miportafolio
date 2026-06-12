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
    if (!typewriterElement) return;

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
 * ACTUALIZACIÓN: INTERACTIVIDAD DE IMAGEN (CLIC, BRILLO Y RESPONSIVIDAD)
 * =====================================================================
 */
document.addEventListener("DOMContentLoaded", () => {
    // 1. Iniciar efecto de texto
    if (typewriterElement && stringsToType.length > 0) {
        setTimeout(handleTypewriterCycle, 500);
    }
    // Agrega esto dentro de tu DOMContentLoaded
 window.addEventListener('resize', () => {
    const profileImg = document.querySelector('.profile-image');
    if (profileImg) {
        // Al redimensionar, eliminamos el estilo inline para que CSS tome el control nuevamente
        profileImg.style.transform = ''; 
    }
 });

    // 2. Lógica para la imagen de perfil
    const profileImg = document.querySelector('.profile-image');

    if (profileImg) {
        // Función auxiliar para saber si estamos en modo móvil
        const isMobile = () => window.innerWidth <= 992;
        const getTransform = (scale) => {
            const xPos = isMobile() ? '-50%' : '-40%';
            return `translateX(${xPos}) scale(${scale})`;
        };

        // Efecto de pulso al hacer clic
        profileImg.addEventListener('mousedown', () => {
            profileImg.style.transition = 'all 0.1s ease';
            profileImg.style.transform = getTransform(0.95);
        });
         profileImg.addEventListener('mouseup', () => {
         // Restauramos la transición original después del clic
         profileImg.style.transition = 'var(--transition-smooth)';
        profileImg.style.transform = getTransform(1.05); // Mantener el hover
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