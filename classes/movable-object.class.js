class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    offsetY = 0;
    energy = 100;
    lastHit = 0;
    gravityInterval;



    applyGravity() {
      this.gravityInterval = setInterval(() => {
            if (this.isaboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    stopGravity(){
        clearInterval(this.gravityInterval);
    }

    isaboveGround() {
        if (this instanceof ThrowableObject) {  // throwable Object should alway fall
            return true
        } else {
            return this.y < 230;
        }
    }




    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;

    }

    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;

    }

    jump() {
        this.speedY = 20;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //difference in ms
        timepassed = timepassed / 1000;  //difference in seconds
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }



    isColliding(obj) {
        return (this.x + this.width) - this.offset.left >= (obj.x + obj.offset.left) &&
            (this.x + this.offset.left) <= (obj.x + obj.width) &&
            (this.y + this.offset.top + this.height - this.offset.bottom) >= obj.y &&
            (this.y + this.offset.top) <= (obj.y + obj.height)
    }
}
