let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
  
    console.log('My Character is', world.character);
}



document.addEventListener('keydown' , (event) => {
    console.log(event);

    if (event.keyCode == 38) {
        console.log('UP');
        keyboard.UP = true;
    }
    if (event.keyCode == 40) {
        console.log('Down');
        keyboard.DOWN = true;
    }
    if (event.keyCode == 37) {
        console.log('Left');
        keyboard.LEFT = true;
    }
    if (event.keyCode == 39) {
        console.log('Right');
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 32) {
        console.log('Space');
        keyboard.SPACE = true;
    }
});

document.addEventListener('keyup' , (event) => {
    console.log(event);

    if (event.keyCode == 38) {
        console.log('UP');
        keyboard.UP = false;
    }
    if (event.keyCode == 40) {
        console.log('Down');
        keyboard.DOWN = false;
    }
    if (event.keyCode == 37) {
        console.log('Left');
        keyboard.LEFT = false;
    }
    if (event.keyCode == 39) {
        console.log('Right');
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 32) {
        console.log('Space');
        keyboard.SPACE = false;
    }
});