const streamUrl = "TU_URL_DE_STREAMING_AQUI"; // Lee el paso 3
const audio = new Audio(streamUrl);
const playBtn = document.getElementById('playBtn');

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerText = "⏸";
    } else {
        audio.pause();
        playBtn.innerText = "▶";
    }
});

document.getElementById('volume').addEventListener('input', (e) => {
    audio.volume = e.target.value;
});
