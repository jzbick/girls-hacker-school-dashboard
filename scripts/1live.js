const toggle1LivePlay = () => {
    const button = document.getElementById('widget-1live__play');
    button.classList.toggle('fa-play');
    button.classList.toggle('fa-pause');
    const player = document.getElementById('widget-1live__player');
    if (player.paused) {
        player.load();
        player.play();
    } else {
        player.pause();
    }
}

const toggle1LiveVolume = () => {
    const button = document.getElementById('widget-1live__volume');
    button.classList.toggle('fa-volume-high');
    button.classList.toggle('fa-volume-xmark');
    const player = document.getElementById('widget-1live__player');
    player.muted = !player.muted;
}
