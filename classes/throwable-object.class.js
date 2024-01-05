/**
* Represents an object that can be thrown and collide with the environment.
*/
class ThrowableObject extends MovableObject {

    isCollided = false;
    IMAGES_ROTATE = bottleImages.IMAGES_ROTATE;
    IMAGES_SPLASH = bottleImages.IMAGES_SPLASH;
    
    sounds = {
    splash_sound: new Audio('audio/bottle-smash.mp3'),
    throw_sound: new Audio('audio/throw.mp3')
    }

    /**
    * Initializes a ThrowableObject instance.
    * @param {number} x - The x-coordinate position.
    * @param {number} y - The y-coordinate position.
    */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATE);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 60;
        this.throw();
        if(!soundsMuted){
        this.sounds.throw_sound.play();
        }
        this.bottleToRemove = 0;
    }

    /**
    * Throws the object and initiates animation and collision detection.
    */
    throw() {
        this.speedY = 20;
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            if (!this.isCollided && this.isBottleAboveGround()) {
                this.x += 10;
                this.playAnimation(this.IMAGES_ROTATE);
            } else {
                this.stopGravity();
                this.isCollided = true;
                this.bottleToRemove++;
                this.splashBottle();
            }
        }, 60);        
    }

    /**
    * Checks if the bottle is above the ground.
    * @returns {boolean} Indicates if the bottle is above the ground.
    */
    isBottleAboveGround() {
        return this.y < 360;
    }

    /**
    * Checks if the bottle is above the ground.
    * @returns {boolean} Indicates if the bottle is above the ground.
    */
    splashBottle() {
        if(this.bottleToRemove == 1){
            if(!soundsMuted) {
        this.sounds.splash_sound.play();
            }
        this.playAnimation(this.IMAGES_SPLASH);
        }
        this.bottleToRemove == 0;
    }
}