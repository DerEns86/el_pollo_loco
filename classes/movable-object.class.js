class MovableObject {
    x = 80;
    y = 200;
    width = 100;
    height = 150;
    img;
    speed = 0.15;
    imageCache = {};
    currentImage = 0;
    otherDirection = false;


    loadImage(path) {
        this.img = new Image() // Image() ist eine vordefenierte Methode von JS ->this.img = document.getElementById('image') <img id= "image" src>
        this.img.src = path;
    }
    
    loadImages(arr) {
        arr.forEach((path) => {


            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {
        {
            setInterval( () => {
                this.x -= this.speed;
            }, 1000 / 60);
        }
    }
}