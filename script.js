// CONFIGURACIÓN
const totalCanciones = 10; // ¡Cambia esto al número real de canciones!
let indiceActual = 1;

const audio = new Audio();
const playBtn = document.getElementById('playBtn');
const status = document.getElementById('status');
const volumeControl = document.getElementById('volume');

// --- SISTEMA DE AUDIO PROFESIONAL (ESTABILIZADOR) ---
let audioContext, source, gainNode;

function inicializarAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        source = audioContext.createMediaElementSource(audio);
        gainNode = audioContext.createGain();
        
        // Estabilizador: Normalizamos a 0.7 para que nada suene muy fuerte
        gainNode.gain.value = 0.7; 
        
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
    }
}

function reproducirMusica() {
    inicializarAudio();
    if (audioContext.state === 'suspended') audioContext.resume();

    audio.src = `musica/${indiceActual}.mp3`;
    audio.load();
    
    // Mensaje de estado
    status.innerText = "Sintonizando Bendición...";
    
    audio.play().then(() => {
        status.innerText = "Radio El Shaddai: EN VIVO";
    }).catch(err => {
        status.innerText = "Error de conexión";
    });

    // Al terminar, elige una canción al azar
    audio.onended = () => {
        indiceActual = Math.floor(Math.random() * totalCanciones) + 1;
        reproducirMusica();
    };
}

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        // MENSAJE DE BIENVENIDA (Opcional: puedes quitar el alert)
        if (audio.src === "") {
            alert("Bienvenido a Radio El Shaddai. La música comenzará ahora.");
        }
        reproducirMusica();
        playBtn.innerText = "⏸ PAUSAR";
    } else {
        audio.pause();
        playBtn.innerText = "▶ REPRODUCIR";
        status.innerText = "Radio en Pausa";
    }
});

// Control de volumen manual ligado al estabilizador
volumeControl.addEventListener('input', (e) => {
    if (gainNode) {
        gainNode.gain.value = e.target.value;
    }
});
