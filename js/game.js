let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let soundsMuted = false;

/**
* Initializes the game by setting up the canvas, creating the world instance, and initializing the game interface.
*/
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, soundsMuted);

    document.getElementById('canvasDiv').classList.remove('d-none');
    document.getElementById('startScreen').classList.add('d-none');

    addMobileBtn();
}

/**
* Starts the game by initializing the game and setting up the environment.
*/
function startGame() {
    initGame();
    init();
}

/**
* Toggles the mute state of all sounds in the game and updates the mute button image.
*/
function toggleMuteAllSounds() {
    const muteBtn = document.getElementById('muteBtn');
    if (soundsMuted) {
        muteBtn.src = 'img/icons/icon_mute.png';
    } else {
        muteBtn.src = 'img/icons/icon_sound.png';
    }
    soundsMuted = !soundsMuted;
    if (world) {
        world.toggleSoundMute();
    }
}

/**
* Toggles the visibility of settings by toggling the 'hidden' class on the 'controls' element.
*/
function toggleSettings() {
    let controls = document.getElementById('controls');
    controls.classList.toggle('hidden');
}

/**
* Reloads the current page to restart the game.
*/
function restartGame() {
    location.reload();
}

/**
* Clears all intervals running in the window context.
*/
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
* Event listener for keydown events.
* Updates the keyboard object based on the pressed key.
* @param {KeyboardEvent} event - The keyboard event object.
*/
document.addEventListener('keydown', (event) => {

    if (event.keyCode == 38) {
        keyboard.UP = true;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (event.keyCode == 66) {
        keyboard.B = true;
    }
});

/**
* Event listener for keyup events.
* Updates the keyboard object based on the pressed key.
* @param {KeyboardEvent} event - The keyboard event object.
*/
document.addEventListener('keyup', (event) => {

    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (event.keyCode == 66) {
        keyboard.B = false;
    }
});

/**
* implements the touch function to control in mobile view
*/
function addMobileBtn() {

    document.getElementById('btnLeft').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('btnLeft').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('btnRight').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('btnRight').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('btnJump').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.UP = true;
    });

    document.getElementById('btnJump').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.UP = false;
    });

    document.getElementById('btnBottle').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.B = true;
    });

    document.getElementById('btnBottle').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.B = false;
    });

}