class MovableObject {
    x = 200;
    y = 200;
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