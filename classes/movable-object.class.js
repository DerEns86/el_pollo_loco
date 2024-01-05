/**
 * Represents a movable object extending the functionality of a drawable object.
 */
class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    offsetY = 0;
    energy = 100;
    lastHit = 0;
    gravityInterval;

    /**
    * Applies gravity effect to the movable object.
    */
    applyGravity() {
      this.gravityInterval = setInterval(() => {
            if (this.isaboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else if (!this.isaboveGround()) {
                this.speedY = 0;
                this.y = 230;
            }
        }, 1000 / 25);
    }

    /**
    * Stops the gravity effect applied to the movable object.
    */
    stopGravity(){
        clearInterval(this.gravityInterval);
    }

    /**
    * Checks if the object is positioned above the ground level.
    * @returns {boolean} True if the object is above the ground, false otherwise.
    */
    isaboveGround() {
        if (this instanceof ThrowableObject) {
            return true
        } else {
            return this.y < 230;
        }
    }

    /**
    * Mutes all sounds associated with the object.
    */
    muteSounds() {
        const soundKeys = Object.keys(this.sounds);
    
        for (const key of soundKeys) {
            const sound = this.sounds[key];
            sound.muted = true;
            sound.pause();
        }
    }

    /**
    * Unmutes all previously muted sounds associated with the object.
    */
    unmuteSounds() {
        const soundKeys = Object.keys(this.sounds);
    
        for (const key of soundKeys) {
            const sound = this.sounds[key];
            sound.muted = false;
        }
    }

    /**
    * Moves the object to the right based on its speed.
    */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
    * Moves the object to the left based on its speed.
    */
    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    /**
    * Initiates a jump action by modifying the vertical speed of the object.
    */
    jump() {
        this.speedY = 20;
    }

    /**
    * Handles a hit on the object, reducing its energy.
    */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
    * Checks if the object was recently hurt based on the time passed since the last hit.
    * @returns {boolean} True if the object was hurt in the last second, otherwise false.
    */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //difference in ms
        timepassed = timepassed / 1000;  //difference in seconds
        return timepassed < 1;
    }

    /**
    * Checks if the object has depleted energy, indicating it is dead.
    * @returns {boolean} True if the object's energy is zero, indicating it is dead, otherwise false.
    */
    isDead() {
        return this.energy == 0;
    }

    /**
    * Plays animation frames by updating the object's image.
    * @param {string[]} images - Array of image paths representing animation frames.
    */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
    * Checks if the object is colliding with another object based on their positions and dimensions.
    * @param {DrawableObject} obj - The other object to check collision against.
    * @returns {boolean} True if there is a collision, otherwise false.
    */
    isColliding(obj) {
        return (this.x + this.width) - this.offset.left >= (obj.x + obj.offset.left) &&
            (this.x + this.offset.left) <= (obj.x + obj.width) &&
            (this.y + this.offset.top + this.height - this.offset.bottom) >= obj.y &&
            (this.y + this.offset.top) <= (obj.y + obj.height - obj.offset.bottom)
    }
}
