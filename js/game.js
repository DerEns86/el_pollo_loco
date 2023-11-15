let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
  
    console.log('My Character is', world.character);
    document.getElementById('canvasDiv').classList.remove('d-none');
    document.getElementById('startScreen').classList.add('d-none');
    
    addMobileBtn();
}

function startGame(){
   
    initGame();
    init();
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }



document.addEventListener('keydown' , (event) => {
    // console.log(event);

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

document.addEventListener('keyup' , (event) => {
    // console.log(event);

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

function addMobileBtn(){

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
    // keyboard.RIGHT = true;
});

document.getElementById('btnJump').addEventListener('touchend', (event) => {
    event.preventDefault();
    keyboard.UP = false;
    // keyboard.RIGHT = false;
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