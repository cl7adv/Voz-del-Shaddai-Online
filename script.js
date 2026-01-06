const totalCanciones = 10; // Ajusta según tus archivos
let indiceActual = 1;

const audio = new Audio();
const playBtn = document.getElementById('playBtn');
const status = document.getElementById('status');

// --- SISTEMA DE ESTABILIZACIÓN (WEB AUDIO API) ---
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const source = audioContext.createMediaElementSource(audio);
const gainNode = audioContext.createGain();

// Aquí fijamos el "techo" de volumen (0.7 es un nivel seguro y uniforme)
gainNode.gain.value = 0.7; 

source.connect(gainNode);
gainNode.connect(audioContext.destination);
// ------------------------------------------------

function reproducirSiguiente() {
    // Para que el audio funcione en navegadores modernos
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    audio.src = `musica/${indiceActual}.mp3`;
    audio.load();
    audio.play().catch(e => console.log("Clic para iniciar"));
    
    status.innerText = `Sintonizando: Alabanza #${indiceActual}`;

    audio.onended = () => {
        // Elegir la siguiente canción (Orden Aleatorio para que sea real)
        indiceActual = Math.floor(Math.random() * totalCanciones) + 1;
        reproducirSiguiente();
    };
}

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        reproducirSiguiente();
        playBtn.innerText = "⏸ PAUSAR";
    } else {
        audio.pause();
        playBtn.innerText = "▶ REPRODUCIR";
        status.innerText = "Radio El Shaddai en Pausa";
    }
});

// Control de volumen manual que respeta el estabilizador
document.getElementById('volume').addEventListener('input', (e) => {
    gainNode.gain.value = e.target.value;
});
