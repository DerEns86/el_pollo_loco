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
    speedY = 0;
    acceleration = 1.5;



    applyGravity() {
        setInterval(() => {
            if (this.isaboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isaboveGround() {
        return this.y < 230;
    }


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
            setInterval(() => {
                this.x -= this.speed;
            }, 1000 / 60);
        }
    }

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}