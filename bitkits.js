function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
}

function playSound(e) {
    let num, audio, key = 0;
    let select = e.path[0];

    if(select.nodeName == "KBD" || select.nodeName == "SPAN") {
        num = 1;
    }

    if (event.type == 'keydown') {
        audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
        key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    }
    if (event.type == 'mousedown') {
        try {
            audio = document.querySelector(`audio[data-key="${e.path[num].attributes[0].nodeValue}"]`);
            key = document.querySelector(`div[data-key="${e.path[num].attributes[0].nodeValue}"]`);
        }
        // ignore that users can click on inaudible areas
        catch(error) {
            return;
        }
    }

    if (!audio) return;
    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
}

const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);
window.addEventListener('mousedown', playSound);
