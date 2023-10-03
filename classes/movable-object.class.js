class MovableObject {
    x = 80;
    y = 200;
    width = 100;
    height = 150;
    img;


    loadImage(path) {
        this.img = new Image() // Image() ist eine vordefenierte Methode von JS ->this.img = document.getElementById('image') <img id= "image" src>
        this.img.src = path;
    }


    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {

    }
}